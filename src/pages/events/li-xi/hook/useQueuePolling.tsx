import { useState, useEffect, useCallback } from "react";
import { eventService } from "src/services/eventService";

interface QueueStatus {
  status: "CREATED" | "SUCCEEDED" | "FAILED" | "PENDING";
  result?: any;
  errors?: any;
}

interface UseQueuePollingProps {
  requestId?: string;
  pollingInterval?: number;
  maxAttempts?: number;
}

const useQueuePolling = ({
  requestId,
  pollingInterval = 5000,
  maxAttempts = 30,
}: UseQueuePollingProps) => {
  const [status, setStatus] = useState<QueueStatus>({ status: "CREATED" });
  const [attempts, setAttempts] = useState(0);
  const [isPolling, setIsPolling] = useState(true);

  const checkStatus = useCallback(async () => {
    if (!requestId) return;
    try {
      const data = await eventService.liXi.getRequestLog(requestId);
      setStatus(data);
      if (data?.status === "SUCCEEDED" || data?.status === "FAILED") {
        setIsPolling(false);
      }

      setAttempts((prev) => prev + 1);
    } catch (error) {
      console.log("error", error);
      setStatus({
        status: "FAILED",
        errors: "Failed to check queue status",
      });
      setIsPolling(false);
    }
  }, [requestId]);

  useEffect(() => {
    if (!isPolling || attempts >= maxAttempts) {
      setIsPolling(false);
      return;
    }

    const pollInterval = setInterval(() => {
      checkStatus();
    }, pollingInterval);

    checkStatus();

    return () => {
      clearInterval(pollInterval);
    };
  }, [checkStatus, isPolling, attempts, maxAttempts, pollingInterval]);

  const retry = useCallback(() => {
    setAttempts(0);
    setStatus({ status: "CREATED" });
    setIsPolling(true);
  }, []);

  return {
    status: status.status,
    result: status.result,
    error: status.errors,
    isTimeout: attempts >= maxAttempts,
    retry,
  };
};

export default useQueuePolling;
