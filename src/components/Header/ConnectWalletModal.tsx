import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import FilledButton from "components/Button/FilledButton"
import SubFilledButton from "components/Button/FilledButton/SubFilledButton"
import C98 from "images/c98.png"
import Keplr from "images/keplr.png"
import Image from "next/image"
import { useContext, useState } from "react"
import { Context } from "src/context"
export default function ConnectWalletModal({onClose}) {
  const [step, setStep] = useState(1)
  const [wallet, setWallet] = useState()
  const { getWallet, connectWallet } = useContext(Context)
  const connectWalletHandler = async (provider) => {
    const w = await getWallet(provider)
    setWallet(w)
    setStep(2)
  }

  return (
    <div
      className={`flex flex-col p-5 gap-5 transition-all duration-300 overflow-hidden justify-start ${
        step == 1 ? "h-[256px]" : "h-[384px]"
      }`}>
      <p className="text-[32px] leading-[56px] font-semibold text-center ">Link wallet</p>
      <div className="relative">
        <div
          className={`top-0 w-full flex flex-col gap-5 transition-all duration-300 absolute ${
            step == 1 ? "opacity-100 z-10 " : "opacity-0 -z-10"
          }`}>
          <div
            className="flex items-center justify-between bg-light-medium-gray text-gray-600 p-[10px] rounded-xl cursor-pointer"
            onClick={() => connectWalletHandler("Coin98")}>
            <span className="text-base leading-10 font-medium">Coin98</span>
            <Image src={C98} alt="" />
          </div>
          <div
            className="flex items-center justify-between bg-light-medium-gray text-gray-600 p-[10px] rounded-xl cursor-pointer"
            onClick={() => connectWalletHandler("Keplr")}>
            <span className="text-base leading-10 font-medium">Keplr</span>
            <Image src={Keplr} alt="" />
          </div>
        </div>
        <div
          className={`top-0 absolute w-full flex flex-col gap-5 transition-all overflow-hidden duration-300 ${
            step == 2 ? "opacity-100 z-10 " : "opacity-0 -z-10 h-0"
          }`}>
          <div className="font-semibold text-xl leading-6 text-center">Connect to this wallet address?</div>
          <div className="p-[10px] rounded-xl bg-light-medium-gray text-gray-600 font-medium">{wallet}</div>
          <div className="flex p-[10px] rounded-xl bg-light-yellow gap-[10px]">
            <ExclamationTriangleIcon className="text-medium-yellow w-6 h-6" />
            <p className="text-gray-600 font-medium max-w-[350px]">
              Each account can only be linked to one wallet address that cannot be changed later. Please keep your
              wallet secured.
            </p>
          </div>
          <div className="flex gap-[10px]">
            <SubFilledButton fullWidth size="lg" onClick={() => setStep(1)}>
              Change Wallet
            </SubFilledButton>
            <FilledButton fullWidth size="lg" onClick={() => connectWallet(onClose)}>
              Link Wallet
            </FilledButton>
          </div>
        </div>
      </div>
      <div className="p-[10px] rounded-xl bg-light-medium-gray text-gray-600 font-medium invisible h-0">
        aura18ngffsqgeg899csv2le8gk60gch08ksgc3eeeu
      </div>
    </div>
  )
}
