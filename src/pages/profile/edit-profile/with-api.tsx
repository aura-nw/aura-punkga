import axios from 'axios'
import getConfig from 'next/config'
import { useContext } from 'react'
import { Context, privateAxios } from 'src/context'
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { account } = useContext(Context)
  const config = getConfig()

  const updateProfile = async (data) => {
    await privateAxios.put(`${config.REST_API_URL}/user/update-profile`, data)
  }

  return (
    <Component
      {...props}
      updateProfile={updateProfile}
    />
  )
}

export default withApi
