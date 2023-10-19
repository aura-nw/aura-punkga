import Footer from 'components/Footer'
import Header from 'components/Header'
import Campaign from 'components/pages/campaigns/campaign'
import LeaderBoard from 'components/pages/campaigns/leaderboard'
import TaskSlider from 'components/pages/campaigns/taskSlider'
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
      <div className='pk-container py-[80px]'>
        <div className='flex gap-6'>
          <TaskSlider />
          <LeaderBoard />
        </div>
        <div className='my-20'>
          <Campaign />
        </div>
      </div>
      <Footer />
    </>
  )
}
