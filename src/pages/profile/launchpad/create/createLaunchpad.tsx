import LaunchpadForm from '../../../../components/pages/launchpad/launchpadForm';

type CreateLaunchpadType = {
    createLaunchpad: (launchpad: any) => any
}

export default function Page(props) {
    if (props.justHead) {
        return <></>;
    }
    return <CreateLaunchpad {...props} />;
}

function CreateLaunchpad({ createLaunchpad }: CreateLaunchpadType) {
    return <LaunchpadForm createLaunchpad={createLaunchpad} />

}