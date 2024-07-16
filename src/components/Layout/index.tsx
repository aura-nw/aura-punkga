import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Layout({ children }: any) {
  return (
    <main className='bg-gray-50'>
      <Header />
      <div className='min-h-[40vh] text-text-primary'>{children}</div>
      <Footer />
    </main>
  )
}
