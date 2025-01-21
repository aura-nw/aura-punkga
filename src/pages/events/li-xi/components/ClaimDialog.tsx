import * as React from "react";
import Button from "@mui/material/Button";
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
import TextField from "components/Input/TextField";
import { Box } from "@mui/material";
import { eventService } from "src/services/eventService";
import { toast } from "react-toastify";
import useQueuePolling from "../hook/useQueuePolling";
import loadingSVG from "../assets/svg/loading.svg";
import VND from "../assets/svg/vnd.svg";
import { Context } from "src/context";

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

export default function ClaimDialogs() {
  const [open, setOpen] = React.useState(false);
  const { account } = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [requestId, setRequestId] = React.useState();
  const [address, setAddress] = React.useState("");
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClaimPrize = async () => {
    setLoading(true);
    try {
      const { data } = await eventService.liXi.claimedPrize(address);
      if (data?.insert_request_log) {
        const requestId = data.insert_request_log.returning[0].id;
        requestId && setRequestId(requestId);
        return;
      }
      toast(data?.message || "Unexpected errors. Please contact Admin", {
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      });
    } catch (error) {
      toast(error?.message || "Unexpected errors. Please contact Admin", {
        type: "error",
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  const { status, result, error, isTimeout, retry } = useQueuePolling({
    requestId: requestId,
    pollingInterval: 2000,
    maxAttempts: 30,
  });

  const handleClose = () => {
    setOpen(false);
    retry();
  };

  return (
    <React.Fragment>
      <EventButton className="w-20" onClick={handleClickOpen}>
        {t("Claim")}
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
          <div className="text-center text-[#9F1515] text-2xl font-black-han-sans">
            {status === "SUCCEEDED"
              ? t("All prizes claimed!")
              : t("Claim all prizes")}
          </div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          {!loading && !requestId ? (
            <div className="flex flex-col items-center gap-4 mb-4 w-[300px]">
              <div className="text-center">
                Please make sure your wallet address is correct. This progess is
                irreversible
              </div>
              <TextField
                onChange={setAddress}
                value={address}
                size="md"
                placeholder={t("Enter your wallet address")}
              />
            </div>
          ) : (
            <>
              {status === "CREATED" && (
                <div className="flex flex-col items-center gap-4 mb-4 w-[300px]">
                  <div className="text-[#067537] text-center text-base font-medium">
                    {account.name}
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
                  <Image src={VND} className="w-[150px] h-[120px]" alt="" />
                </div>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <EventButton onClick={handleClaimPrize} className="w-20 z-10">
            {t("Confirm")}
          </EventButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
