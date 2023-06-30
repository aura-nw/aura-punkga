import Avatar from "assets/images/avatar.png"
import EN from "assets/images/en.png"
import VN from "assets/images/vn.png"
import Logo from "assets/images/header-logo.svg"
import SearchIcon from "assets/images/icons/search.svg"
import Button from "components/Button"
import FilledButton from "components/Button/FilledButton"
import SubFilledButton from "components/Button/FilledButton/SubFilledButton"
import Dropdown, { DropdownMenu, DropdownToggle } from "components/Dropdown"
import TextField from "components/Input/TextField"
import c98 from "images/c98.png"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    keplr: any
    getOfflineSigner: any
  }
}

export default function Header({}) {
  const { t } = useTranslation()
  const router = useRouter()
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { pathname, asPath, query, locale } = router
  const switchLanguage = () => {
    const newLanguage = locale === "en" ? "vn" : "en"
    router.push({ pathname, query }, asPath, { locale: newLanguage })
  }
  return (
    <>
      <div
        className={` fixed inset-0 transition-opacity duration-500 bg-[#000] ${
          isSearchFocused ? "z-20 opacity-40" : "-z-20 opacity-0"
        }`}></div>
      <header className="bg-white border-b-2 border-light-gray border-solid">
        <nav className="pk-container flex items-center justify-between pt-[10px] pb-[8px]" aria-label="Global">
          <div>
            <Link href="/" className="flex">
              <span className="sr-only">Your Company</span>
              <Image src={Logo} alt="header logo" />
            </Link>
          </div>
          <div className={`${isSearchFocused ? "z-30" : ""} w-full max-w-[500px]`}>
            <TextField
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`bg-light-gray transition-[width] duration-500 ${isSearchFocused ? "!w-[160%]" : ""}`}
              size="lg"
              placeholder="Search by title"
              leadingComponent={<Image src={SearchIcon} alt="" />}
            />
          </div>
          <div className="flex gap-[40px] lg:justify-end min-w-[430px]">
            <Button size="lg" onClick={() => router.push("/sample")}>
              {t("aboutUs")}
            </Button>
            <div className="flex gap-[20px] items-center cursor-pointer">
              <div className="flex gap-[4px] font-bold">
                {locale == "en" ? (
                  <Image className="w-[24px] h-[24px]" src={EN} alt="" />
                ) : (
                  <Image className="w-[24px] h-[24px]" src={VN} alt="" />
                )}
                <button onClick={switchLanguage}>{t("switchLanguage")}</button>
              </div>
              <Dropdown>
                <DropdownToggle>
                  <FilledButton size="lg">
                    <div className="flex items-center whitespace-nowrap w-max gap-[10px] h-[25px]">
                      <Image src={Avatar} alt="" />
                      Sunday
                    </div>
                  </FilledButton>
                </DropdownToggle>
                <DropdownMenu customClass="right-[50%] translate-x-[50%]">
                  <div className="p-5 flex flex-col gap-5">
                    <div className="flex justify-center items-center">
                      <Image src={c98} alt="c98" />
                      <div className="ml-[10px] font-[500]">Connected with coin 98</div>
                    </div>
                    <div className="flex">
                      <div className="flex-auto w-[60%]"></div>
                      <div className="flex-auto w-[10%]"></div>
                      <div className="flex-auto w-[30%]"></div>
                    </div>
                    <SubFilledButton fullWidth size="lg">
                      Disconnect Wallet
                    </SubFilledButton>
                    <div className="mt-[10px]">
                      <div>
                        <strong>My profile</strong>
                      </div>
                      <span className="w-full block my-[10px] border-[1px] border-solid border-light-medium-gray "></span>
                      <div>
                        <strong>Log out</strong>
                      </div>
                    </div>
                  </div>
                </DropdownMenu>
              </Dropdown>

              {/* <FilledButton size="lg">Connect Wallet</FilledButton> */}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
