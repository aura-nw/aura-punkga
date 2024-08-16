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
        ? 'https://punkga.me/assets/images/kaia-island-thumb-vn.png'
        : 'https://punkga.me/assets/images/kaia-island-thumb.png',
    title:
      context.locale == 'vn' ? `Cuộc Thi Vẽ Tranh Về Truyền Thuyết Đảo Kaia` : `Kaia Island Mythology Drawing Contest`,
    description:
      context.locale == 'vn'
        ? `Khám phá đảo Kaia kỳ bí, thể hiện tài năng hội họa và giành giải thưởng 50 triệu tại cuộc thi "Ghi Chép Về Truyền Thuyết Đảo Kaia" cùng PunkgaMe nào!`
        : `Explore the mysterious Kaia Island, showcase your artistic talent, and win a 2000 USD prize in the "Kaia's Island Mythology Record" contest with PunkgaMe!`,
  }
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ['common'])),
    },
  }
}
