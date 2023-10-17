import Footer from 'components/Footer'
import Header from 'components/Header'
import Campain from 'components/pages/campains/campain'
import LeaderBoard from 'components/pages/campains/leaderboard'
import TaskSlider from 'components/pages/campains/taskSlider'

export default function Campains() {
  return (
    <>
      <Header />
      <div className='pk-container py-[80px]'>
        <div className='flex gap-6'>
          <TaskSlider />
          <LeaderBoard />
        </div>
        <div className='my-20'>
          <Campain />
        </div>
      </div>
      <Footer />
    </>
  )
}
