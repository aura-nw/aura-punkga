import { useRouter } from 'next/router';
import useApi from '../../../../../hooks/useApi';
import { getLaunchpad } from '../with-api';
import LaunchpadForm from 'components/pages/launchpad/launchpadForm';

type UpdateLaunchpadType = {
    updateLaunchpadDraft: (launchpad: any) => any;
    updateLaunchpadUnpublish: (launchpad: any) => any
}

export default function Page(props) {
    if (props.justHead) {
        return <></>;
    }
    return <EditLaunchpad {...props} />;
}

function EditLaunchpad({ updateLaunchpadDraft, updateLaunchpadUnpublish }: UpdateLaunchpadType) {
    const router = useRouter()
    const { id } = router.query
    const launchpad = useApi<any>(() => getLaunchpad(id as string), true, [])
    return <LaunchpadForm launchpad={launchpad?.data} updateLaunchpadDraft={updateLaunchpadDraft} updateLaunchpadUnpublish={updateLaunchpadUnpublish} />

}