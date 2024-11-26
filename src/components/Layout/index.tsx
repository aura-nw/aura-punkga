import Footer from 'components/Footer'
import Header from 'components/Header'
import { Roboto_Condensed } from 'next/font/google'
const roboto = Roboto_Condensed({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '300', '700'],
  variable: '--font-roboto',
})
export default function Layout({ children }: any) {
  return (
    <main className={`bg-gray-50 ${roboto.variable}`}>
      <Header />
      <div className='min-h-[40vh] text-text-primary'>{children}</div>
      <Footer />
    </main>
  )
}
