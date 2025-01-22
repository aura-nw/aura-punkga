import Footer from 'components/Footer'
import Header from './Header'
import { IBM_Plex_Sans, Roboto_Condensed } from 'next/font/google'
import BottomNavigation from './BottomNavigation'
import { useWindowSize } from 'usehooks-ts'
import NHeader from './Header'
const roboto = Roboto_Condensed({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '300', '700'],
  variable: '--font-roboto',
})
const ibmplex = IBM_Plex_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibmplex',
})

export default function Layout({ children }: any) {
  const { width } = useWindowSize()
  return (
    <main className={`bg-gray-50 max-w-screen ${roboto.variable} ${ibmplex.variable}`}>
      <Header />
      <div className='min-h-[70vh] text-text-primary relative pb-20 xl:pb-0 z-10'>{children}</div>
      {width < 1280 ? <BottomNavigation /> : (location.pathname == '/' ? null :<Footer />}
    </main>
  )
}
