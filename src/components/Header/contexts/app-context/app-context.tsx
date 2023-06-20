import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import { useRouter } from "next/router";
import { saveLoginData, getWalletAddress, clearLoginData, checkIsLoggedIn } from "../../../../utils";
import { DefaultFcProps } from "../../../../utils/common";
  
  export interface IAppContext {
    isWaiting: boolean,
    setIsWaiting: Dispatch<SetStateAction<boolean>>,
  
    userAddress: string | undefined,
    loggedIn: boolean | undefined,
    signIn: (address: string, tokenData: {
      accessToken: string,
      refreshToken: string,
    }) => void,
    signOut: (redirectToHomePage?: boolean) => void,
  }
  
  export const AppContext = createContext<IAppContext | undefined>(undefined);
  
  export const AppProvider = ({
    children
  }: DefaultFcProps) => {
    const router = useRouter()
    const [isWaiting, setIsWaiting] = useState(false)
    const [loggedIn, setLoggedIn] = useState(checkIsLoggedIn)
    const userAddress = useMemo(() => loggedIn ? getWalletAddress() : '', [loggedIn])
  
    return (
      <AppContext.Provider value={{
        isWaiting,
        setIsWaiting,
  
        userAddress,
        loggedIn,
        signIn: (address: string, tokenData: {
          accessToken: string,
          refreshToken: string,
        }) => {
          saveLoginData({
            walletAddress: address,
            access_token: tokenData.accessToken,
            refresh_token: tokenData.refreshToken,
            expired: -1
          })
          setLoggedIn(true)
        },
        signOut: (redirectToHomePage = true) => {
          clearLoginData()
  
          setLoggedIn(false)
          setIsWaiting(false)
  
          if (redirectToHomePage === true)
            router.push('/');
        },
      }}>
        {children}
      </AppContext.Provider>
    )
  }
  
  export const withAppProvider = (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) => {
    return (
      <AppProvider>
        <Component {...props} />
      </AppProvider>
    )
  }
  
  export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error(
        'useAppContext must be used within a AppContext',
      );
    }
    return context;
  }