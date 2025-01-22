import Layout from "components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArtworkListContext } from "src/context/artworkList";
import { contentService } from "src/services/contentService";
import { useWindowSize } from "usehooks-ts";
export default function Page(props) {
  if (props.justHead) {
    return <></>;
  }
  return <PageContent />;
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const LIMIT = 20;
function PageContent() {
  const { width } = useWindowSize();
  const router = useRouter();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { data, setData } = useContext(ArtworkListContext);
  const fetchArtwork = async (isRefresh?: boolean) => {
    const artworkData = await contentService.artwork.getArtworkList(LIMIT, isRefresh ? 0 : data.offset);
    const artworks = artworkData?.data?.story_artwork;
    if (artworks?.length) {
      if (isRefresh) {
        setData({
          list: [...artworks],
          offset: artworks?.length,
          remaining: true,
        });
      } else {
        setData({
          list: [...data.list, ...artworks],
          offset: data.offset + artworks?.length,
          remaining: true,
        });
      }
    } else {
      if (isRefresh) {
        setData({
          list: [],
          offset: 0,
          remaining: false,
        });
      } else {
        setData({
          offset: data.offset,
          remaining: false,
        });
      }
    }
  };
  useEffect(() => {
    if (data.list.length == 0 && isFirstLoad) {
      fetchArtwork();
      setIsFirstLoad(false);
    }
  }, []);
  return (
    <div className="bg-background min-h-screen text-white space-y-4">
      <div className="md:container md:mx-auto">
        {width < 758 ? (
          <div onClick={() => router.back()} className="flex sticky top-14 p-4 bg-background z-10 items-center gap-3 text-xl font-medium ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 17L10 12L15 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Artwork
          </div>
        ) : (
          <div className="flex sticky top-[75px] p-4 bg-background z-10 items-center gap-3 text-xl font-medium ">Artwork</div>
        )}
        <InfiniteScroll
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 px-4"
          dataLength={data.list.length}
          next={fetchArtwork}
          hasMore={data.remaining}
          loader={<h4 className="w-full text-center font-medium text-sm">Loading...</h4>}
        >
          {data.list?.map((artwork, index) => (
            <Link href={`/artworks/${artwork.id}`} key={index} className="w-full aspect-square">
              <Image src={artwork.display_url} alt="" width={300} height={300} className="w-full h-full object-cover" />
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
