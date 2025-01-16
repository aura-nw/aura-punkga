import HeadComponent from "components/Head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "components/Layout";
import KaiaIsland from "./page";

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />;
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <KaiaIsland />
    </>
  );
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = async (context) => {
  const props = {
    image:
      context.locale == "vn"
        ? "/assets/images/kaia-island-thumb-vn.png"
        : "/assets/images/kaia-island-thumb.png",
    title: context.locale == "vn" ? `Lì Xì` : `Li Xi`,
    description:
      context.locale == "vn"
        ? `Li Xi - Sự kiện đặc biệt dành cho cộng đồng PunkgaMe!`
        : `Li Xi - Sự kiện đặc biệt dành cho cộng đồng PunkgaMe!`,
  };
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ["common"])),
    },
  };
};
