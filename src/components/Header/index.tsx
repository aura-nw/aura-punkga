import Avatar from "assets/images/avatar.png"
import EN from "assets/images/en.png"
import Logo from "assets/images/header-logo.svg"
import SearchIcon from "assets/images/icons/search.svg"
import VN from "assets/images/vn.png"
import Button from "components/Button"
import FilledButton from "components/Button/FilledButton"
import SubFilledButton from "components/Button/FilledButton/SubFilledButton"
import Dropdown, { DropdownMenu, DropdownToggle } from "components/Dropdown"
import TextField from "components/Input/TextField"
import Modal from "components/Modal"
import c98 from "images/c98.png"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment, useCallback, useContext, useEffect, useState } from "react"
import { Context } from "src/context"
import SignInModal from "./SignInModal"
import ConnectWalletModal from "./ConnectWalletModal"
import SignUpModal from "./SignUpModal"
import ForgotPasswordModal from "./ForgotPasswordModal"
import SignUpSuccessModal from "./SignUpSuccessModal"
import { search } from "src/services"
import _ from "lodash"
import useApi from "src/hooks/useApi"
import Spinner from "components/Spinner"
import NoImage from "images/no_img.png"

export default function Header({}) {
  const { t } = useTranslation()
  const router = useRouter()
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { pathname, asPath, query, locale } = router
  const switchLanguage = () => {
    const newLanguage = locale === "en" ? "vn" : "en"
    router.push({ pathname, query }, asPath, { locale: newLanguage })
  }

  const [signInOpen, setSignInOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [signUpSuccessOpen, setSignUpSuccessOpen] = useState(false)
  const [connectWalletOpen, setConnectWalletOpen] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [searchData, setSearchData] = useState([])
  const { account, wallet, logout, unlinkWallet } = useContext(Context)

  const searchComic = useApi<any[]>(async () => await search(searchValue), !!searchValue, [searchValue])
  console.log(searchComic)
  return (
    <>
      <div
        className={` fixed inset-0 transition-opacity duration-500 bg-[#000] ${
          isSearchFocused ? "z-20 opacity-25" : "-z-20 opacity-0"
        }`}></div>
      <header className="bg-white border-b-2 border-light-gray border-solid">
        <nav className="pk-container flex items-center justify-between pt-[10px] pb-[8px]" aria-label="Global">
          <div>
            <Link href="/" className="flex">
              <span className="sr-only">Your Company</span>
              <Image src={Logo} alt="header logo" />
            </Link>
          </div>
          <div className={`${isSearchFocused ? "z-30" : ""} w-full max-w-[500px] relative`}>
            <TextField
              onChange={_.debounce(setSearchValue, 500)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`transition-[width] bg-light-gray duration-500 ${isSearchFocused ? "!w-[160%]" : ""}`}
              size="lg"
              placeholder="Search by title"
              leadingComponent={<Image src={SearchIcon} alt="" />}
              trailingComponent={searchComic.loading ? <Spinner className="w-6 h-6" /> : null}
            />
            <div
              className={`absolute bg-light-gray transition-all -bottom-4 translate-y-full duration-500 p-5 rounded-[20px] flex flex-col gap-7 max-h-[40vh] overflow-auto ${
                isSearchFocused ? "z-20 opacity-100 w-[160%]" : "-z-20 opacity-0 w-full"
              }`}>
              {searchComic.data?.map((manga, index) => (
                <div key={index} className="flex gap-2">
                  <Image
                    src={manga.image || NoImage}
                    width={48}
                    height={64}
                    className="w-12 h-16 bg-medium-gray rounded-xl object-cover"
                    alt=""
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <p
                        className="text-second-color text-base font-bold cursor-pointer"
                        onClick={() => router.push(`/comic/${manga.id}/chapter/1`)}>
                        {manga[locale].title}
                      </p>
                      <div className="text-xs">
                        {manga.authors.map((author, index) => (
                          <Fragment key={index}>
                            <span className="text-second-color font-[600] first:hidden">, </span>
                            <span className="text-second-color font-[600]">{author}</span>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                    {!!manga.latestChap.number && (
                      <p className="text-xs">
                        Latest chap:{" "}
                        <span
                          className="text-second-color font-semibold cursor-pointer"
                          onClick={() => router.push(`/comic/${manga.id}/chapter/${manga.latestChap.number}`)}>
                          {manga.latestChap.number}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
              {account?.verified && account?.name ? (
                <Dropdown>
                  <DropdownToggle>
                    <FilledButton size="lg">
                      <div className="flex items-center whitespace-nowrap w-max gap-[10px] h-[25px]">
                        <Image
                          src={account.image || Avatar}
                          alt=""
                          width={36}
                          height={36}
                          className="rounded-full object-cover h-full w-[25px]"
                        />
                        <span className="max-w-[150px] text-ellipsis overflow-hidden">{account.name}</span>
                      </div>
                    </FilledButton>
                  </DropdownToggle>
                  {wallet ? (
                    <DropdownMenu customClass="right-[50%] translate-x-[50%] min-w-[400px]">
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
                        <SubFilledButton fullWidth size="lg" onClick={unlinkWallet}>
                          Disconnect Wallet
                        </SubFilledButton>
                        <div className="mt-[10px]">
                          <div onClick={() => router.push("/profile")}>
                            <strong>My profile</strong>
                          </div>
                          <span className="w-full block my-[10px] border-[1px] border-solid border-light-medium-gray "></span>
                          <div onClick={logout}>
                            <strong>Log out</strong>
                          </div>
                        </div>
                      </div>
                    </DropdownMenu>
                  ) : (
                    <DropdownMenu customClass="right-[50%] translate-x-[50%]">
                      <div className="p-5 flex flex-col gap-5">
                        <div className="mt-[10px]">
                          <div onClick={() => router.push("/profile")}>
                            <strong>My profile</strong>
                          </div>
                          <span className="w-full block my-[10px] border-[1px] border-solid border-light-medium-gray "></span>
                          <div onClick={() => setConnectWalletOpen(true)}>
                            <strong>Link Wallet</strong>
                          </div>
                          <span className="w-full block my-[10px] border-[1px] border-solid border-light-medium-gray "></span>
                          <div onClick={logout}>
                            <strong>Log out</strong>
                          </div>
                        </div>
                      </div>
                    </DropdownMenu>
                  )}
                </Dropdown>
              ) : (
                <FilledButton id="open-sign-in-btn" size="lg" onClick={() => setSignInOpen(true)}>
                  Sign in
                </FilledButton>
              )}
            </div>
          </div>
        </nav>
      </header>
      <Modal
        open={signInOpen || signUpOpen}
        setOpen={() => {
          setSignInOpen(false)
          setSignUpOpen(false)
        }}>
        <div className="relative min-h-[40vh]">
          <SignInModal
            show={signInOpen}
            openSignUpModal={() => {
              setSignUpOpen(true)
              setSignInOpen(false)
            }}
            setSignInOpen={setSignInOpen}
            setForgotPasswordOpen={setForgotPasswordOpen}
          />
          <SignUpModal
            show={signUpOpen}
            openSignInModal={() => {
              setSignInOpen(true)
              setSignUpOpen(false)
            }}
            setSignUpOpen={setSignUpOpen}
            setSignUpSuccessOpen={setSignUpSuccessOpen}
          />
        </div>
      </Modal>
      <Modal open={connectWalletOpen} setOpen={setConnectWalletOpen}>
        <ConnectWalletModal onClose={() => setConnectWalletOpen(false)} />
      </Modal>
      <Modal open={forgotPasswordOpen} setOpen={setForgotPasswordOpen}>
        <ForgotPasswordModal onClose={() => setForgotPasswordOpen(false)} />
      </Modal>
      <Modal open={signUpSuccessOpen} setOpen={setSignUpSuccessOpen}>
        <SignUpSuccessModal />
      </Modal>
    </>
  )
}
