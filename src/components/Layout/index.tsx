import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <div className='min-h-[40vh] bg-[#F4F3F7]'>{children}</div>
      <Footer />
    </>
  )
}
