import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <div className='min-h-[40vh] text-text-primary bg-gray-50'>{children}</div>
      <Footer />
    </>
  )
}
