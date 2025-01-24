import UploadUpIcon from "assets/images/icons/upload-up.svg";
import CheckboxDropdown from "components/CheckBox/CheckBoxDropDown";
import Button from "components/core/Button";
import TextField from "components/Input/TextField";
import Character from "components/pages/characters/Character";
import CharacterDetail from "components/pages/characters/CharacterDetail";
import Modal from "components/pages/characters/Modal";
import { t } from "i18next";
import { debounce } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { Context } from "src/context";
import { ListContext } from "src/context/characterList";
import useApi from "src/hooks/useApi";
import { IComic } from "src/models/comic";
import { getAllTags, getLatestComic, getTrendingComic } from "src/services";
import { eventService } from "src/services/eventService";
import { useWindowSize } from "usehooks-ts";
import Manga from "components/pages/homepage/manga";
import Image from "next/image";
import MangaHeadingIcon from "images/icons/manga-heading-title.svg";
import bannerLiterature from "components/pages/event/assets/banner-literatur-infinity.png";
import bannerLixi from "components/pages/event/assets/banner-lixi.png";
import TrendingComic from "components/pages/homepage/trendingComic";
import { ComicListContext } from "src/context/comicList";
import { contentService } from "src/services/contentService";
import useSWR from "swr";

export default function LatestManga(props) {
  if (props.justHead) {
    return <></>;
  }
  return <PageContentDesktop {...props} />;
}
function PageContentDesktop() {
  const allTags = useApi<any[]>(getAllTags, true, []);
  const useableTags = allTags?.data;
  const { locale } = useRouter();
  const { t } = useTranslation();
  const trendingComic = useApi<IComic[]>(getTrendingComic, true, []);
  const { data: tags } = useSWR("get-all-tag", contentService.getTagList);
  const [genreFilter, setGenreFilter] = useState([
    {
      key: "All genres",
      value: t("All genres"),
    },
  ]);
  const [statusFilter, setStatusFilter] = useState([
    {
      key: "All status",
      value: t("All status"),
    },
  ]);
  const LIMIT = 20;
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { latestData, setLatestData } = useContext(ComicListContext);
  const fetchLatestManga = async (isRefresh?: boolean) => {
    const selectedTags = latestData.selectedTags.filter((tag) => tag.key != 0).map((tag) => tag.key) || undefined;
    const status = latestData.selectedStatus.filter((status) => status.key != "All status").map((status) => status.key) || undefined;
    const data = await contentService.comic.getLatestComic(
      LIMIT,
      isRefresh ? 0 : latestData.offset,
      selectedTags.length == tags?.length ? undefined : selectedTags,
      status.length == 3 ? undefined : status,
    );
    if (data?.length) {
      if (isRefresh) {
        setLatestData({
          list: [...data],
          offset: data?.length,
          remaining: true,
        });
      } else {
        setLatestData({
          list: [...latestData.list, ...data],
          offset: latestData.offset + data?.length,
          remaining: true,
        });
      }
    } else {
      if (isRefresh) {
        setLatestData({
          list: [],
          offset: 0,
          remaining: false,
        });
      } else {
        setLatestData({
          offset: latestData.offset,
          remaining: false,
        });
      }
    }
  };
  useEffect(() => {
    if (latestData.list.length == 0 && isFirstLoad) {
      fetchLatestManga();
      setIsFirstLoad(false);
    }
  }, []);
  useEffect(() => {
    if (!isFirstLoad) {
      fetchLatestManga(true);
    }
  }, [latestData.selectedTags.length, latestData.selectedStatus.length]);

  return (
    <div className="p-4 bg-background min-h-screen text-white lg:px-[84px] xl:pt-10">
      <div className="container mx-auto flex gap-8 mt-4 md:mt-8 ">
        <div>
          <div className="flex flex-row justify-between gap-5 bg-[#0A0A0A] py-[10px] px-7">
            <div className="text-2xl leading-[26px] md:leading-7 md:text-xl font-medium text-[#F6F6F6] flex gap-2 items-baseline">
              <Image src={MangaHeadingIcon} alt={""} width={30} height={21}></Image>
              {t("Latest update")}
            </div>
            <div className="md:flex hidden gap-[20px] items-center">
              <CheckboxDropdown
                allKey={"All genres"}
                selected={genreFilter}
                onChange={setGenreFilter}
                optionClassName="text-[#00E160]"
                arrowClassName="text-[#00E160]"
                options={
                  useableTags
                    ? [
                        {
                          key: "All genres",
                          value: t("All genres"),
                        },
                        ...useableTags?.map((tag) => ({
                          key: tag.en,
                          value: tag[locale],
                        })),
                      ]
                    : [
                        {
                          key: "All genres",
                          value: t("All genres"),
                        },
                      ]
                }
              />
              <div className="w-[1px] h-4 bg-[#E0E0E0]" />
              <CheckboxDropdown
                allKey={"All status"}
                selected={statusFilter}
                onChange={setStatusFilter}
                options={[
                  {
                    key: "All status",
                    value: t("All status"),
                  },
                  {
                    key: "Finished",
                    value: t("Finished"),
                  },
                  {
                    key: "Ongoing",
                    value: t("Ongoing"),
                  },
                  {
                    key: "Upcoming",
                    value: t("Upcoming"),
                  },
                ]}
              />
            </div>
          </div>
          <div className="bg-[#1D1F1E] px-7 py-4">
            <InfiniteScroll
              className="grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4"
              dataLength={latestData.list.length}
              next={fetchLatestManga}
              hasMore={latestData.remaining}
              loader={<h4 className="w-full text-center font-medium text-sm">Loading...</h4>}
            >
              {latestData.list?.map((comic, index) => (
                <Manga key={index} {...comic} />
              ))}
            </InfiniteScroll>
          </div>
          {/* <div className="grid grid-cols-4 gap-2.5 mt-4 md:pb-7">
            {latestComic.loading
              ? Array.apply(null, Array(20)).map((d, index) => {
                  return (
                    <div className="md:flex gap-[20px] animate-pulse bg-light-gray rounded-s p-1" key={index}>
                      <div className="flex-auto md:w-1/3">
                        <div className="rounded-s w-full aspect-[16/23] bg-light-medium-gray" />
                      </div>
                    </div>
                  );
                })
              : latestComic.data?.length
              ? latestComic.data
                  .filter((data) => (statusFilter.length && !statusFilter.some((s) => s.key == "All status") ? statusFilter.some((filter) => data.status.text == filter?.key) : true))
                  .filter((data) => (genreFilter.length && !genreFilter.some((s) => s.key == "All genres") ? genreFilter.some((filter) => data.tags?.some((tag) => tag[locale] == filter.key)) : true))
                  .map((data, index) => {
                    return <Manga key={index} {...data} />;
                  })
              : null}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div> */}
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 w-[406px]">
            <Link href="/events/literature-infinity" target="_blank">
              <Image src={bannerLiterature} alt="" className="rounded-2xl w-full aspect-[40/15] object-cover" />
            </Link>
            <Link href="/events/li-xi" target="_blank">
              <Image src={bannerLixi} alt="" className="rounded-2xl w-full aspect-[40/15] object-cover" />
            </Link>
          </div>
          <div className="flex flex-col bg-[#1D1F1E] rounded-[10px] lg:mt-8">
            <div className="flex gap-2 items-baseline md:text-xl text-2xl leading-[28px] font-medium text-[#F6F6F6] bg-[#0A0A0A] rounded-tl-md rounded-tR-md py-[10px] px-7">
              <Image src={MangaHeadingIcon} alt={""} width={30} height={21}></Image>
              {t("Trending")}
            </div>
            <div className="flex flex-col gap-4 p-7">
              {trendingComic.loading
                ? Array.apply(null, Array(5)).map((d, index) => {
                    return (
                      <div className="md:flex gap-[20px] animate-pulse bg-light-gray rounded-s p-1" key={index}>
                        <div className="flex-auto md:w-1/3">
                          <div className="rounded-s w-full h-[90px] bg-light-medium-gray" />
                        </div>
                      </div>
                    );
                  })
                : trendingComic.data.slice(0, 8).map((data, index) => {
                    return <TrendingComic TrendingComicProps={{ comic: data, index: index }} key={index} />;
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
