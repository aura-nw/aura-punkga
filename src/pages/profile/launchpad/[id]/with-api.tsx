import getConfig from 'next/config'
import { privateAxios } from 'src/context'

export const getLaunchpad = async (id: string) => {
  try {
    const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/launchpad/owned/${id}`)
    return data.data.launchpad_by_pk
  } catch (error) {
    return false
  }
}

const preDeploy = async (id: string) => {
  try {
    const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/launchpad/${id}/pre-deploy`)
    return data
  } catch (error) {
    return false
  }
}

const postDeploy = async (id: string, txHash: string ) => {
  try {
    const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/launchpad/${id}/post-deploy`, { txHash: txHash })
    return data
  } catch (error) {
    return false
  }
}

const publish = async (id: string) => {
  try {
    const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/launchpad/${id}/publish`)
    return data
  } catch (error) {
    return false
  }
}

const unpublish = async (id: string) => {
  try {
    const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/launchpad/${id}/unpublish`)
    return data
  } catch (error) {
    return false
  }
}

const withApi = (Component: React.FC<any>) => (props: any) => {

  return (
    <Component
      {...props}
      preDeploy={preDeploy}
      postDeploy={postDeploy}
      publish={publish}
      unpublish={unpublish}
    />
  )
}

export default withApi
