import { compose } from "ramda"
import Profile from "./profile"
import withApi from "./with-api"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
const ComposedProfile = compose(withApi)(Profile)

export default ComposedProfile


export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
})
