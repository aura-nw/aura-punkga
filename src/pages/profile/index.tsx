import { compose } from "ramda"
import Profile from "./profile"
import withApi from "./with-api"
const ComposedProfile = compose(withApi)(Profile)

export default ComposedProfile

