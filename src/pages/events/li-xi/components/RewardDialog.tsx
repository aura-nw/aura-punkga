import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import duoi from "../assets/duoi.png";
import nap from "../assets/nap.png";
import EventButton from "./EventButton";
import VND from "../assets/svg/vnd.svg";
import AURA from "../assets/svg/aura.svg";
import DP from "../assets/svg/dp.svg";
import loadingSVG from "../assets/svg/loading.svg";

import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { selectedLixi } from "../page";
import useSWR from "swr";
import { eventService } from "src/services/eventService";
import { toast } from "react-toastify";
import useQueuePolling from "src/hooks/useQueuePolling";
import { Context } from "src/context";
import sample from "./sample.json";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {},
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
  },
}));

export default function RewardDialogs({
  selectedLixi,
  rewardCallback,
}: {
  selectedLixi: selectedLixi;
  rewardCallback?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { account } = useContext(Context);
  const [prize, setPrize] = useState([]);
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState();

  const randomWish = sample[Math.floor(Math.random() * sample.length)];
  const handleOpenLixi = async () => {
    setOpen(true);
    try {
      const { data } = await eventService.liXi.openLixi(selectedLixi.id);
      if (data?.insert_request_log) {
        const requestId = data.insert_request_log.returning[0].id;
        requestId && setRequestId(requestId);
        return;
      }
      toast("Can not open this lixi. Please contact Admin", {
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      });
    } catch (error) {
      toast("Upexpected Error. Please contact Admin", {
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      });
      return;
    }
  };

  const { status, result, error, isTimeout, retry } = useQueuePolling({
    requestId: requestId,
    pollingInterval: 2000,
    maxAttempts: 30,
  });

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") return;
    setOpen(false);
    retry();
    rewardCallback();
    console.log(isTimeout, "isTimeout");
  };
  useEffect(() => {
    if (error) {
      toast(error.message || "Upexpected Error. Please contact Admin", {
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      });
      handleClose(undefined, undefined);
      return;
    }
    if (isTimeout) {
      toast("Request timeout. Please contact Admin", {
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      });
      handleClose(undefined, undefined);

      return;
    }
  }, [error, isTimeout]);

  useEffect(() => {
    if (!requestId) return;
    switch (status) {
      case "CREATED":
        setOpen(true);
        break;

      case "SUCCEEDED":
        setOpen(true);
        if (result) {
          setPrize(result.filter((item) => item.amount));
          setRequestId(undefined);
        }
        break;
      case "FAILED":
        setOpen(false);
        toast("Upexpected Error. Please contact Admin", {
          type: "error",
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          autoClose: 3000,
        });
        setRequestId(undefined);
        break;

      default:
        break;
    }
  }, [status, requestId, result]);

  return (
    <React.Fragment>
      <EventButton className="w-20" onClick={handleOpenLixi}>
        {t("OPEN")}
      </EventButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xs"
        PaperProps={{
          sx: {
            overflow: "visible",
            position: "relative",
            background: "#FFF8D5;",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-160px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "180px",
            backgroundImage: `url(${nap.src})`,
            backgroundSize: "100% 100%",
            zIndex: "10",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "420px",
            height: "200px",
            backgroundImage: `url(${duoi.src})`,
            backgroundSize: "100% 100%",
          }}
        />
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          className="flex flex-col items-center"
        >
          {status !== "CREATED" && (
            <div className="text-center text-[#9F1515] text-2xl font-black-han-sans">
              {t("Congratulations!")}
            </div>
          )}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose as any}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: "-150px",
            color: theme.palette.grey[500],
            zIndex: 100,
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {status === "CREATED" && (
            <div className="flex flex-col items-center gap-4 mb-4 w-[300px]">
              <div className="text-[#067537] text-center text-base font-medium">
                {account?.name}
              </div>
              <Image
                src={loadingSVG}
                className="w-[100px] animate-spin"
                alt=""
              />
              <div className="text-center">Loading ...</div>
            </div>
          )}
          {status === "SUCCEEDED" && (
            <div className="flex flex-col items-center gap-4 mb-4 w-[300px]">
              <div className="text-[#067537] text-center text-base font-medium">
                {account?.name}
              </div>

              {prize && prize.length ? (
                <div className="flex gap-2">
                  {prize.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 text-[#3A3A3A] font-roboto text-sm font-semibold"
                    >
                      <div className="text-center">
                        You have received a prize. Don’t forget to claim it in
                        inventory
                      </div>
                      {item?.lixi_reward_type?.reward_type === "DP" && (
                        <Image src={DP} className="w-[70px] h-[70px]" alt="" />
                      )}{" "}
                      {item?.lixi_reward_type?.reward_type === "AURA" && (
                        <Image
                          src={AURA}
                          className="w-[70px] h-[70px]"
                          alt=""
                        />
                      )}{" "}
                      {item?.lixi_reward_type?.reward_type === "VND" && (
                        <Image src={VND} className="w-[70px] h-[70px]" alt="" />
                      )}
                      <div className="text-sm font-bold">
                        {item.amount} {item?.lixi_reward_type?.reward_type}{" "}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">{randomWish}</div>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {status === "SUCCEEDED" && prize.length ? (
            <EventButton
              onClick={() => router.push("/events/li-xi/my-prize")}
              className="w-[200px] z-10"
            >
              {t("Go to My inventory")}
            </EventButton>
          ) : (
            <div className="h-8" />
          )}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
