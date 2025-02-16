import NoImg from "images/avatar.svg";
import CopySvg from "images/icons/copy.svg";
import Info from "images/icons/info.svg";
import EditProfile from "components/pages/profile/assets/edit-profile-2.svg";
import ArrowAccordion from "assets/images/icons/arrow-accordion.svg";
import ChangePassword from "components/pages/profile/assets/change-password.svg";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "src/context";
import { LinearProgress, Popover, styled, linearProgressClasses } from "@mui/material";
import _ from "lodash";
import { levelToXp } from "src/utils";
import SettingPasswordModal from "./settingPasswordModal";
import ChangingPasswordModal from "./changingPasswordModal";
import { useRouter } from "next/router";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#E7E7E7",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
    backgroundColor: "#1FAB5E",
  },
}));

function formatDate(dateString) {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("/");
  return `${day}/${month}/${year}`;
}

export default function NewInfo() {
  const router = useRouter();
  const { account, getProfile } = useContext(Context);
  const { t } = useTranslation();
  const [preview, setPreview] = useState();
  const [isCopied, setIsCopied] = useState(false);
  const [isBioCollapsed, setIsBioCollapsed] = useState(false);
  const [birthdate, setBirthdate] = useState(null);
  const [gender, setGender] = useState<{ key: string | number; value: string }>(null);
  const [bio, setBio] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [settingPasswordModalOpen, setSettingPasswordModalOpen] = useState(false);
  const [changingPasswordModalOpen, setChangingPasswordModalOpen] = useState(false);
  const [KP, setKP] = useState(0);
  const [XP, setXP] = useState(0);
  const [SF, setSF] = useState(0);
  const [userLevel, setUserLevel] = useState(0);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile) as any;
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (account) {
      setGender(account.gender == "Undisclosed" ? { key: "Other", value: t("Other") } : { key: account.gender, value: t(account.gender) });
      setKP(account.levels.find((level) => level.chain == "KP")?.xp || 0);
      setSF(account.levels.find((level) => level.chain == "SF")?.xp || 0);
      setXP(account.levels.find((level) => level.chain == "XP")?.xp || 0);
      setBirthdate(account.birthdate ? new Date(account.birthdate).getTime() : undefined);
      setBio(account.bio);
      setUserLevel(account.levels.find((level) => level.chain == "XP")?.level || 0);
    }
  }, [account]);
  const copyAddress = async () => {
    navigator.clipboard.writeText(account?.activeWalletAddress);
    setIsCopied(true);
    _.debounce(() => {
      _.delay(() => setIsCopied(false), 3000);
    }, 1000)();
  };

  const [anchorElEditProfile, setAnchorElEditProfile] = React.useState<HTMLElement | null>(null);
  const [anchorElChangePassword, setAnchorElChangePassword] = React.useState<HTMLElement | null>(null);

  const handlePopoverEditProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElEditProfile(event.currentTarget);
  };
  const handlePopoverChangePasswordOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElChangePassword(event.currentTarget);
  };

  const handlePopoverEditProfileClose = () => {
    setAnchorElEditProfile(null);
  };
  const handlePopoverChangePasswordClose = () => {
    setAnchorElChangePassword(null);
  };
  const handleEditProfile = () => {
    router.push("/profile/edit-profile");
  };
  const [anchorElXP, setAnchorElXP] = React.useState<HTMLElement | null>(null);
  const [anchorElKP, setAnchorElKP] = React.useState<HTMLElement | null>(null);
  const [anchorElSF, setAnchorElSF] = React.useState<HTMLElement | null>(null);

  const handlePopoverXPOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElXP(event.currentTarget);
  };

  const handlePopoverXPClose = () => {
    setAnchorElXP(null);
  };

  const handlePopoverKPOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElKP(event.currentTarget);
  };

  const handlePopoverKPClose = () => {
    setAnchorElKP(null);
  };

  const handlePopoverSFOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElKP(event.currentTarget);
  };

  const handlePopoverSFClose = () => {
    setAnchorElSF(null);
  };

  const openPopoverXP = Boolean(anchorElXP);
  const openPopoverKP = Boolean(anchorElKP);
  const openPopoverSF = Boolean(anchorElSF);

  const openPopoverEditProfile = Boolean(anchorElEditProfile);
  const openPopoverChangePassword = Boolean(anchorElChangePassword);
  return (
    <>
      <div className="w-full p-8 rounded-[10px] relative">
        <div className="absolute top-8 left-[17px]">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center cursor-pointer" onClick={handleEditProfile} onMouseEnter={handlePopoverEditProfileOpen} onMouseLeave={handlePopoverEditProfileClose}>
              <Image src={EditProfile} alt="edit profile" width={20} height={20} />
              <div className="font-bold text-[#B0B0B0] text-sm">Edit</div>
            </div>
            <Image
              className="cursor-pointer"
              onClick={() => (account?.signupMethods?.includes("basic_auth") ? setChangingPasswordModalOpen(true) : setSettingPasswordModalOpen(true))}
              src={ChangePassword}
              alt="change password"
              width={20}
              height={20}
              onMouseEnter={handlePopoverChangePasswordOpen}
              onMouseLeave={handlePopoverChangePasswordClose}
            />
            <Popover
              className=""
              sx={{
                pointerEvents: "none",
              }}
              open={openPopoverEditProfile}
              anchorEl={anchorElEditProfile}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              onClose={handlePopoverEditProfileClose}
              disableRestoreFocus
            >
              <div className="bg-[#323339B2] rounded-[4px] py-2 px-4 text-[#FDFDFD] text-xs"> {t("Edit profile")}</div>
            </Popover>
            <Popover
              className=""
              sx={{
                pointerEvents: "none",
              }}
              open={openPopoverChangePassword}
              anchorEl={anchorElChangePassword}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              onClose={handlePopoverChangePasswordClose}
              disableRestoreFocus
            >
              <div className="bg-[#323339B2] rounded-[4px] py-2 px-4 text-[#FDFDFD] text-xs">{t(account?.signupMethods?.includes("basic_auth") ? "Change password" : "Set password")}</div>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="w-[146px] shrink-0 h-[146px] rounded-[19.5px] border-[2.43px] border-black">
            <Image src={preview || account.image || NoImg.src} alt="" width={140} height={140} className="w-full h-full rounded-[19.5px] border-[2.43px] border-[#454545] bg-cover" />
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <div className="text-white text-xl font-semibold leading-7 text-center">{account.name}</div>
            {/* <div className='flex justify-center items-center w-full text-sm gap-1.5 leading-5'>
              <div className='text-text-teriary'>Referral code: </div>
              <div className='text-text-brand-defaul'>{account.name}</div>
              <div onClick={copyAddress} className='cursor-pointer'>
                <Image width={18} height={18} src={CopySvg} alt='' />
              </div>
            </div> */}
            <div className="flex justify-center items-center w-full gap-2 font-medium text-white leading-5">
              <div>{t(account.gender)}</div>
              <div className="text-[#B0B0B0]">{account.gender ? "•" : ""}</div>
              <div>{account?.birthdate ? formatDate(account.birthdate.replace(/-/g, "/")) : ""}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3 w-full p-3 mt-8 rounded-[10px] bg-black">
            <div className="w-full flex justify-between items-center cursor-pointer" onClick={() => setIsBioCollapsed(!isBioCollapsed)}>
            <div className="text-white text-base font-semibold">Introduction</div>
            <Image
              src={ArrowAccordion}
              alt={""}
              width={24}
              height={24}
              style={{ transform: isBioCollapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
            />
            </div>
            {!isBioCollapsed && (
            <div
              className="w-full text-sm leading-5 text-white text-left"
              style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              whiteSpace: "normal",
              }}
            >
              {account.bio}
            </div>
            )}
        </div>
        <div className="flex flex-col justify-center gap-4 w-full p-3 mt-8 rounded-[10px] bg-black">
          <div>
            <div className="flex items-center justify-between">
              <div className="text-md font-semibold leading-6 text-white">Lv. {userLevel}</div>
              <div className="text-xs leading-[15px] text-white">{`${Math.round(levelToXp(userLevel + 1) - levelToXp(userLevel) - (XP - levelToXp(userLevel)))} ${t("XP to level")} ${
                userLevel + 1
              }`}</div>
            </div>
            <div className="mt-2">
              <BorderLinearProgress variant="determinate" value={((XP - levelToXp(userLevel)) / (levelToXp(userLevel + 1) - levelToXp(userLevel))) * 100} />
            </div>
          </div>
          <div className="rounded-[10px] p-3 bg-black">
            <div className="flex flex-col py-2 border-b-[1px] border-light-medium-grey gap-3">
              <div className="flex items-center justify-between">
                <div className="flex text-sm font-medium leading-5 text-white">
                  {t("XP")}
                  <Image className="ml-[3px]" src={Info} alt="info" width={10.5} height={10.5} onMouseEnter={handlePopoverXPOpen} onMouseLeave={handlePopoverXPClose} />
                </div>
                <div className="text-sm font-semibold leading-5 text-white">{XP}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex text-sm font-medium leading-5 text-white">
                  {t("KP")}
                  <Image className="ml-[3px]" src={Info} alt="info" width={10.5} height={10.5} onMouseEnter={handlePopoverKPOpen} onMouseLeave={handlePopoverKPClose} />
                </div>
                <div className="text-sm font-semibold leading-5 text-white">{KP}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex text-sm font-medium leading-5 text-white">
                  {t("SF")}
                  <Image className="ml-[3px]" src={Info} alt="info" width={10.5} height={10.5} onMouseEnter={handlePopoverSFOpen} onMouseLeave={handlePopoverSFClose} />
                </div>
                <div className="text-sm font-semibold leading-5 text-white">{SF}</div>
              </div>
            </div>
            <Popover
              sx={{
                pointerEvents: "none",
              }}
              open={openPopoverXP}
              anchorEl={anchorElXP}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              onClose={handlePopoverXPClose}
              disableRestoreFocus
            >
              <div className="bg-[#323339B2] rounded-[4px] py-2 px-4 text-[#FDFDFD] text-xs">{t("The core experience points that contribute to your level on PunkgaMe")}</div>
            </Popover>

            <Popover
              sx={{
                pointerEvents: "none",
              }}
              open={openPopoverKP}
              anchorEl={anchorElKP}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              onClose={handlePopoverKPClose}
              disableRestoreFocus
            >
              <div className="bg-[#323339B2] rounded-[4px] py-2 px-4 text-[#FDFDFD] text-xs">{t("Reward points earned from Klaytn network quests")}</div>
            </Popover>
            <Popover
              sx={{
                pointerEvents: "none",
              }}
              open={openPopoverSF}
              anchorEl={anchorElSF}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              onClose={handlePopoverSFClose}
              disableRestoreFocus
            >
              <div className="bg-[#323339B2] rounded-[4px] py-2 px-4 text-[#FDFDFD] text-xs">{t("Reward points earned from Story network quests")}</div>
            </Popover>
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm font-medium leading-5 text-white">{t("Completed quests")}</div>
              <div className="text-sm font-semibold leading-5 text-white">{account.completedQuests.length}</div>
            </div>
          </div>
        </div>
      </div>
      <SettingPasswordModal open={settingPasswordModalOpen} setOpen={setSettingPasswordModalOpen} profile={account} />
      <ChangingPasswordModal open={changingPasswordModalOpen} setOpen={setChangingPasswordModalOpen} />
    </>
  );
}
