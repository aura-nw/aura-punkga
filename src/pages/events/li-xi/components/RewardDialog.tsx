import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import duoi from "../assets/duoi.png";
import nap from "../assets/nap.png";
import EventButton from "./EventButton";
import VND from "../assets/svg/vnd.svg";
import AURA from "../assets/svg/aura.svg";
import DP from "../assets/svg/dp.svg";

import { Box } from "@mui/material";
import { useRouter } from "next/router";

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

export default function RewardDialogs() {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const { t } = useTranslation();
  const router = useRouter();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <EventButton className="w-20" onClick={handleClickOpen}>
        {t("OPEN")}
      </EventButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xs"
        // fullWidth
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
            {t("Congratulations!")}
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
          <div className="flex flex-col items-center gap-4 mb-4 w-[300px]">
            <div className="text-[#067537] text-center text-base font-medium">
              Punkgame username account
            </div>
            <div className="text-center">
              You have received a prize. Don’t forget to claim it in inventory
            </div>
            <Image src={DP} className="w-[100px] " alt="" />
          </div>
        </DialogContent>
        <DialogActions>
          <EventButton
            onClick={() => router.push("/events/li-xi/my-prize")}
            className="w-[200px] z-10"
          >
            {t("Go to My inventory")}
          </EventButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
