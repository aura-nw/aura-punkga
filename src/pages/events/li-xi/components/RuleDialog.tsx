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

import VND from "../assets/svg/vnd.svg";
import AURA from "../assets/svg/aura.svg";
import DP from "../assets/svg/dp.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    background: "#FFF8D5;",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    background: "#FFF8D5;",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SectionTitle = styled("div")(({ theme }) => ({
  color: "#292929",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "32px",
}));

export default function RuleDialogs() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div
        className="text-[#FEF368] cursor-pointer text-sm font-bold text-center pt-4"
        onClick={handleClickOpen}
      >
        {t("View Rule")}
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          className="flex flex-col items-center"
        >
          <div className="text-center text-[#9F1515] text-2xl font-black-han-sans">
            The Year of Snake’s Li Xi
          </div>
          <div className="text-[#292929] font-roboto font-bold text-base">
            Prizes & Rules
          </div>
        </DialogTitle>
        <IconButton
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
        </IconButton>
        <DialogContent>
          <div className="mb-8">
            <SectionTitle>Prizes</SectionTitle>
            <div className="flex gap-6">
              <Image src={VND} className="w-10 h-10" alt="" />
              <Image src={AURA} className="w-10 h-10" alt="" />
              <Image src={DP} className="w-10 h-10" alt="" />
            </div>
          </div>
          <div>
            <SectionTitle>Rules</SectionTitle>
            <div className="text-sm font-normal mb-8">
              {`Li Xi (red envelope/lucky money) is popular in the SEA/East Asia
              region as a way to send good wishes during Lunar New Year. For
              this occasion, we invite you to participate in our LNY campaign to
              send digital lucks to your friends, family and community through
              AURA tech with AURA, DP and VND.`}
            </div>
            <div className="text-sm font-normal">
              {`Once logged in, a set of 5 Fortune Number will be generated. If all numbers are used up, a new set of numbers will be automatically issued. For every successfully referred account, you and your friend will receive 1 Blue Li Xi each.`}
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
