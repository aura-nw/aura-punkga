import { AuthorizerProvider } from "@authorizerdev/authorizer-react"
import axios from "axios"
import FilledButton from "components/Button/FilledButton"
import OutlineTextField from "components/Input/TextField/Outline"
import Modal from "components/Modal"
import { appWithTranslation } from "next-i18next"
import { AppProps } from "next/app"
import getConfig, { setConfig } from "next/config"
import { useContext, useEffect, useState } from "react"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import ContextProvider, { Context } from "src/context"
import "src/styles/globals.scss"
function MyApp(props: AppProps) {
  const [isSetting, setIsSetting] = useState(true)
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const { data: config } = await axios.get("/config.json")
    setConfig(config)
    setIsSetting(false)
  }
  const config = getConfig()
  if (isSetting) return <></>
  return (
    <AuthorizerProvider
      config={{
        authorizerURL: config.AUTHORIZER_URL,
        redirectURL: config.REDIRECT_URL,
        clientID: config.AUTHORIZER_CLIENT_ID,
      }}>
      <ContextProvider>
        <App {...props} />
      </ContextProvider>
    </AuthorizerProvider>
  )
}
const App = ({ Component, pageProps }: AppProps) => {
  const { isSettingUp, account, updateProfile } = useContext(Context)
  const [errorMsg, setErrorMsg] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setErrorMsg("")
  }, [name])

  if (isSettingUp) {
    return <></>
  }

  const setUName = async () => {
    try {
      setLoading(true)
      const res = await updateProfile({
        nickname: name,
      })
      setLoading(false)
    } catch (error) {
      setErrorMsg("Name already taken")
      setLoading(false)
    }
  }

  return (
    <>
      {account?.email ? (
        account?.name ? (
          <></>
        ) : (
          <>
            <Modal open={true} setOpen={() => {}}>
              <div className="p-6 flex flex-col w-[322px]">
                <div className="gap-2 flex flex-col">
                  <div className="text-xl font-semibold leading-6 text-center">Set a username</div>

                  <OutlineTextField label="Username" errorMsg={errorMsg} value={name} onChange={setName} />
                  <OutlineTextField label="Email" value={account.email} disabled={true} />
                </div>
                <p className="text-xs mt-[6px]">
                  This email will also be used to receive updates of new chapter when you subscribe a manga.
                </p>
                <div className="mt-3 mx-auto">
                  <FilledButton size="lg" disabled={!name} loading={loading} onClick={setUName}>
                    Continue
                  </FilledButton>
                </div>
                <p className="text-xs mt-2 font-medium text-center">
                  Or <a className="text-second-color font-bold">sign in</a> with another account
                </p>
              </div>
            </Modal>
          </>
        )
      ) : (
        <></>
      )}
      <Component {...pageProps} />
    </>
  )
}
export default appWithTranslation(MyApp)
