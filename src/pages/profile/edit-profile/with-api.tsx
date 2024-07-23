import getConfig from 'next/config'
import { useContext } from 'react'
import { Context, privateAxios } from 'src/context'
const withApi = (Component: React.FC<any>) => (props: any) => {
  const { account } = useContext(Context)
  const config = getConfig()

  const updateProfile = async (data) => {
    try {
      return await privateAxios.put(`${config.REST_API_URL}/user/update-profile`, data)
    } catch (error) {
      console.error('Error in updateProfile:', error);
      throw error; // Re-throw the error so it can be caught in the component
    }
  }

  return (
    <Component
      {...props}
      updateProfile={updateProfile}
    />
  )
}

export default withApi
