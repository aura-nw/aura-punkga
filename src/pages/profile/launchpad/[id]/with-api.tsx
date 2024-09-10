import getConfig from 'next/config'
import { privateAxios } from 'src/context'

export const getLaunchpad = async (id: string) => {
  try {
    const { data } = await privateAxios.get(`${getConfig().REST_API_URL}/ip-launchpad/owned/${id}`)
    return data.data.ip_launchpad_by_pk
  } catch (error) {
    return false
  }
}

const preDeploy = async (id: string) => {
  try {
    const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/ip-launchpad/${id}/pre-deploy`)
    return data
  } catch (error) {
    return false
  }
}

const postDeploy = async (id: string, txHash: string ) => {
  try {
    const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/ip-launchpad/${id}/post-deploy`, { txHash: txHash })
    return data
  } catch (error) {
    return false
  }
}

const publish = async (id: string) => {
  try {
    const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/ip-launchpad/${id}/publish`)
    return data
  } catch (error) {
    return false
  }
}

const unpublish = async (id: string) => {
  try {
    const { data } = await privateAxios.post(`${getConfig().REST_API_URL}/ip-launchpad/${id}/unpublish`)
    return data
  } catch (error) {
    return false
  }
}

const deleteLaunchpad = async (id: string) => {
  try {
    const { data } = await privateAxios.delete(`${getConfig().API_URL}/api/rest/users/launchpad/${id}`)
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
      deleteLaunchpad={deleteLaunchpad}
    />
  )
}

export default withApi
