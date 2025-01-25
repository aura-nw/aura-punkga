import HeadComponent from "components/Head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "components/Layout";
import Enroll from "./page";

export default function Page(props) {
  if (props.justHead || props.pageProps?.justHead) {
    return <HeadComponent data={props.pageProps?.metadata || props.metadata} />;
  }
  return (
    <>
      <HeadComponent data={props.pageProps?.metadata || props.metadata} />
      <Enroll />
    </>
  );
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = async (context) => {
  const props = {
    image: "/assets/images/poster-li-xi.webp",
    title: context.locale == "vn" ? `Lì Xì` : `Li Xi`,
    description:
      context.locale == "vn"
        ? `Lì Xì - Sự kiện đặc biệt dành cho cộng đồng PunkgaMe!`
        : `Li Xi - Special event for the PunkgaMe community!`,
  };
  return {
    props: {
      metadata: props,
      ...(await serverSideTranslations(context?.locale!, ["common"])),
    },
  };
};
