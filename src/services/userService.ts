import getConfig from 'next/config'
import { privateAxios } from 'src/context'
export const userService = {
  updateArtistProfile: async (payload) =>
    await privateAxios.post(`${getConfig().REST_API_URL}/user/artist`, payload),
}
