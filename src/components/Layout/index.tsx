import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <div className='min-h-[40vh]'>{children}</div>
      <Footer />
    </>
  )
}
