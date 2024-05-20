import Footer from 'components/Footer'
import Header from 'components/Header'

import useSWR, { useSWRConfig } from 'swr'

export default function Page(props) {
    if (props.justHead) {
        return <></>
    }
    return <IPAssetDetail {...props} />
}
function IPAssetDetail({ }) {

    return (
        <>
            <Header />
            <div className='page-content'>
                <div className='pk-container '>
                    <div className='sticky md:top-12 top-[95px] bg-white pb-10 pt-5 md:pt-16'>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
