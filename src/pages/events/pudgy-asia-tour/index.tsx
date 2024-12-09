import HeadComponent from 'components/Head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/Layout'
import Pubgy from './page'
import localFont from 'next/font/local'

const estedadFont = localFont({
  src: [
    {
      path: '../../../assets/fonts/Estedad/Estedad-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/Estedad/Estedad-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/Estedad/Estedad-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/Estedad/Estedad-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/Estedad/Estedad-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/Estedad/Estedad-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
})
const trailerFont = localFont({
  src: [
    {
      path: '../../../assets/fonts/tt-trailers/TT Trailers Trial Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/tt-trailers/TT Trailers Trial Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/tt-trailers/TT Trailers Trial DemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/tt-trailers/TT Trailers Trial Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/tt-trailers/TT Trailers Trial ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/tt-trailers/TT Trailers Trial Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
})
export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />
  }
  return (
    <>
      <style jsx global>{`
        .trailer-font {
          font-family: ${trailerFont.style.fontFamily};
        }
        .estedad-font {
          font-family: ${estedadFont.style.fontFamily};
        }
      `}</style>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <Pubgy />
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
export const getServerSideProps = async (context) => {
  const props = {
    image:
      context.locale == 'vn'
        ? '/assets/images/pudgy-thumb.png'
        : '/assets/images/pudgy-thumb.png',
    title: context.locale == 'vn' ? `CUỘC THI VẼ PUDGY ASIA ART` : `Pudgy Asia Art Contest`,
    description:
      context.locale == 'vn'
        ? `Những chú chim cánh cụt Pudgy đáng yêu đến từ quốc đảo xa xôi đang háo hức khám phá những điều kỳ diệu của châu Á! Bạn có sẵn sàng trở thành người bạn đồng hành cùng các chú Pudgy tham gia những trải nghiệm du lịch độc đáo và đáng nhớ nhất không?`
        : `The adorable Pudgy penguins from a faraway island are eager to explore the wonders of Asia! Are you ready to become their companion, guiding them through unique and unforgettable travel experiences?`,
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
