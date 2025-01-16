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
import TextField from "components/Input/TextField";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";
import { Box } from "@mui/material";

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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <EventButton className="w-20" onClick={handleClickOpen}>
        {t("Go to My inventory")}
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
            top: "-230px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "250px",
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
            width: "560px",
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
            {t("Claim all prizes")}
          </div>
        </DialogTitle>
        {/* <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton> */}
        <DialogContent>
          <div className="flex flex-col items-center gap-4 mb-4">
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
        </DialogContent>
        <DialogActions>
          <EventButton onClick={handleClose} className="w-20 z-10">
            {t("Confirm")}
          </EventButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
