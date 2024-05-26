import getConfig from 'next/config';
import { privateAxios } from 'src/context';

export type LaunchpadType = {
  id: number;
  created_at: string;
  name: string;
  license_token_id: string;
  status: string;
  start_date: string;
  end_date: string;
  updated_at: string;
  mint_price?: string;
  max_supply?: string
}

export const getListLaunchpads = async () => {
  try {
    const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/launchpad/onwed`)
    return data.data.launchpad
  } catch (error) {
    return false
  }
}

const withApi = (Component: React.FC<any>) => (props: any) => {
  return (
    <Component
      {...props}
    />
  )
}

export default withApi
