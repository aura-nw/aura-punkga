import { useAppContext } from "contexts";
import { useRouter } from "next/router";
import { isNil } from "ramda";
import { useEffect } from "react";


export const useAuth = (requireLogin = true) => {
  const {
    loggedIn
  } = useAppContext()
  const router = useRouter();

  useEffect(() => {
    if (loggedIn === false && requireLogin) {
      router.push("/login")
    }
  }, [loggedIn, requireLogin]);

  return [isNil(loggedIn), loggedIn];
};
