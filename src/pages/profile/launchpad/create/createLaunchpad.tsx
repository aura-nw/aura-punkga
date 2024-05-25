import LaunchpadForm from '../../../../components/pages/launchpad/launchpadForm';

type CreateLaunchpadType = {
    createLaunchpad: (launchpad: any) => any
}

function CreateLaunchpad({ createLaunchpad }: CreateLaunchpadType) {
    return <LaunchpadForm createLaunchpad={createLaunchpad} />

}

export default CreateLaunchpad;