import Footer from 'components/Footer'
import Header from 'components/Header'
import Campaign from 'components/pages/campaigns/campaign'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Campaigns {...props} />
}
function Campaigns() {
  return (
    <>
      <Header />
      <div className='page-content'>
        <Campaign />
      </div>
      <Footer />
    </>
  )
}
