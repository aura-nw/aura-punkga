import getConfig from 'next/config'
import { privateAxios } from 'src/context'

const withApi = (Component: React.FC<any>) => (props: any) => {
  const config = getConfig()
  const updateLaunchpadDraft = async (id: string, launchpad: any) => {
    const { data } = await privateAxios.put(`${config.REST_API_URL}/ip-launchpad/${id}/edit-draft`, launchpad)
    return data
  }

  const updateLaunchpadUnpublish = async (id: string, launchpad: any) => {
    const { data } = await privateAxios.put(`${config.REST_API_URL}/ip-launchpad/${id}/edit-unpublish`, launchpad)
    return data
  }

  return (
    <Component
      {...props}
      updateLaunchpadDraft={updateLaunchpadDraft}
      updateLaunchpadUnpublish={updateLaunchpadUnpublish}
    />
  )
}

export default withApi
