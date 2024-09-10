import getConfig from 'next/config';
import { useContext } from 'react';
import { Context, privateAxios } from 'src/context';

const withApi = (Component: React.FC<any>) => (props: any) => {
  const { account } = useContext(Context)
  const config = getConfig()

  const createLaunchpad = async (launchpad: any) => {
    const { data } = await privateAxios.post(`${config.REST_API_URL}/ip-launchpad`, launchpad)
    return data
  }

  return (
    <Component
      {...props}
      createLaunchpad={createLaunchpad}
    />
  )
}

export default withApi
