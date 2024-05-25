import { useRouter } from 'next/router';
import LaunchpadForm from '../../../../../components/pages/launchpad/launchpadForm';
import useApi from '../../../../../hooks/useApi';
import { getLaunchpad } from '../with-api';

type UpdateLaunchpadType = {
    updateLaunchpadDraft: (launchpad: any) => any;
    updateLaunchpadUnpublish: (launchpad: any) => any
}

function EditLaunchpad({ updateLaunchpadDraft, updateLaunchpadUnpublish }: UpdateLaunchpadType) {
    const router = useRouter()
    const { id } = router.query
    const launchpad = useApi<any>(() => getLaunchpad(id as string), true, [])
    return <LaunchpadForm launchpad={launchpad?.data} updateLaunchpadDraft={updateLaunchpadDraft} updateLaunchpadUnpublish={updateLaunchpadUnpublish} />

}

export default EditLaunchpad;