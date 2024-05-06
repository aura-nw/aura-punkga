import DummyComicDetail from 'components/DummyComponent/comicDetail';
import Header from 'components/Header';
import LazyImage from 'components/Image';
import ComicDetail from 'components/pages/chapter/comicDetail';
import CommentSection from 'components/pages/chapter/commentSection';
import HeaderBar from 'components/pages/chapter/headerBar';
import ReadingSection from 'components/pages/chapter/readingSection';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { CHAPTER_TYPE } from 'src/constants/chapter.constant';
import { LanguageType } from 'src/constants/global.types';
import { Context } from 'src/context';
import { ModalContext } from 'src/context/modals';
import { IChapter } from 'src/models/chapter';
import { IComicDetail } from 'src/models/comic';
import { IComment } from 'src/models/comment';
import { readChapter } from 'src/services';
import { getItem, setItem } from 'src/utils/localStorage';
const Chapter: React.FC = ({
  comicDetails,
  chapterDetails,
  chapterComments,
  postComment,
  like,
  unlike,
}: {
  comicDetails: {
    data: IComicDetail;
    loading: boolean;
  };
  chapterDetails: {
    data: IChapter;
    loading: boolean;
  };
  chapterComments: {
    data: IComment[];
    loading: boolean;
    callApi: (skipLoading: boolean) => void;
  };
  postComment: (content: string) => void;
  like: () => void;
  unlike: () => void;
}) => {
  const [openComments, setOpenComments] = useState(false);
  const [mode, setMode] = useState<'minscreen' | 'fullscreen'>('minscreen');
  const [isSubscribe, setIsSubscribe] = useState(false);
  const { locale } = useRouter();
  const [language, setLanguage] = useState<LanguageType>(
    locale as LanguageType,
  );
  const commentIntervalId = useRef<any>();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const { account } = useContext(Context);
  const [comicLikes, setComicLikes] = useState(0);
  const [chapterLikes, setChapterLikes] = useState(0);
  const [subscriptions, setSubscriptions] = useState(0);
  const { t } = useTranslation();
  const timerRef = useRef<any>();
  const { setSignInOpen } = useContext(ModalContext)
  useEffect(() => {
    if (chapterDetails.data?.id) {
      setChapterLikes(chapterDetails.data?.likes);
      timerRef.current = _.delay(
        () => readChapter(chapterDetails.data?.id),
        10000,
      );
    }
  }, [chapterDetails?.data?.id]);

  useEffect(() => {
    return () => (timerRef.current ? clearTimeout(timerRef.current) : null);
  }, []);

  useEffect(() => {
    setLanguage(locale as LanguageType);
  }, [locale]);

  useEffect(() => {
    if (comicDetails?.data) {
      setIsSubscribe(comicDetails?.data?.isSubscribe);
      setComicLikes(comicDetails?.data?.likes);
    }
  }, [comicDetails?.data]);

  useEffect(() => {
    if (comicDetails?.data) {
      setSubscriptions(comicDetails?.data?.subscriptions);
    }
  }, [chapterDetails?.data]);

  useEffect(() => {
    setIsLiked(chapterDetails.data?.isLiked);
  }, [chapterDetails.data?.isLiked]);

  useEffect(() => {
    if (openComments) {
      commentIntervalId.current = setInterval(
        () => chapterComments.callApi(true),
        5000,
      );
    } else {
      if (commentIntervalId.current) clearInterval(commentIntervalId.current);
    }
    return () => clearInterval(commentIntervalId.current);
  }, [openComments]);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.which == 27) {
        setMode('minscreen');
      }
    });
  }, []);
  useEffect(() => {
    if (comicDetails?.data?.id && account) {
      const currentReading = getItem('current_reading_manga');
      if (currentReading) {
        const currentReadingManga = JSON.parse(currentReading);
        const newData = [
          comicDetails.data.id,
          ...currentReadingManga.filter((id) => id != comicDetails.data.id),
        ];
        setItem('current_reading_manga', JSON.stringify(newData));
      } else {
        setItem(
          'current_reading_manga',
          JSON.stringify([comicDetails.data.id]),
        );
      }
    }
  }, [comicDetails?.data?.id, account]);

  if (comicDetails.loading || chapterDetails.loading) return <></>;

  if (
    (!comicDetails.data && !comicDetails.loading) ||
    (!chapterDetails.data && !chapterDetails.loading)
  ) {
    return (
      <div className="h-[100vh]">
        <Header />
        <div className="flex justify-center items-center">
          {t('Error while fetching data')}!
        </div>
      </div>
    );
  }

  const currentChapIndex = comicDetails?.data?.chapters.findIndex(
    (chap) => chap.id == chapterDetails.data.id,
  );
  const mainLanguage = comicDetails.data?.languages?.find(
    (l) => l.isMainLanguage,
  ).shortLang;
  const chapterLocale = chapterDetails.data?.[language]
    ? language
    : mainLanguage;
  const goToChap = (direction: 'Prev' | 'Next') => {
    if (direction == 'Prev') {
      const prevChap = comicDetails.data.chapters[currentChapIndex + 1];
      router.push(
        `/comic/${comicDetails.data.slug}/chapter/${prevChap?.number}`,
      );
    } else {
      const nextChap = comicDetails.data.chapters[currentChapIndex - 1];
      router.push(
        `/comic/${comicDetails.data.slug}/chapter/${nextChap?.number}`,
      );
    }
  };
  const likeHandler = (isLike: boolean) => {
    if (account?.verified && account?.name) {
      if (isLike) {
        like();
        setChapterLikes((prev) => prev + 1);
        setComicLikes((prev) => prev + 1);
      } else {
        unlike();
        setChapterLikes((prev) => prev - 1);
        setComicLikes((prev) => prev - 1);
      }
      setIsLiked(isLike);
    } else {
      setSignInOpen(true)
    }
  };

  const commentLength = chapterComments.data
    ? chapterComments.data.reduce((total, current) => {
      return total + 1 + current.replies.length;
    }, 0)
    : 0;
  return (
    <>
      <div className="xl:hidden min-h-[100dvh] h-full flex flex-col">
        <Header className="!relative" />
        <HeaderBar
          openComments={openComments}
          setOpenComments={setOpenComments}
          currentChapIndex={currentChapIndex}
          comicDetails={comicDetails}
          goToChap={goToChap}
          chapterDetails={chapterDetails}
          likeHandler={likeHandler}
          isLiked={isLiked}
          chapterComments={chapterComments}
          postComment={postComment}
        />
        <div className="relative w-[100vw] h-full flex-1">
          {!account && chapterDetails.data.type == CHAPTER_TYPE.ACCOUNT_ONLY ? (
            <div className="h-[50vh] w-full flex justify-center items-center text-center p-5">
              <div>
                <p className="italic text-subtle-dark ">
                  {t('This is account only chapter')}. {t('Please')}{' '}
                  <a
                    className="text-second-color underline font-semibold cursor-pointer"
                    onClick={() =>
                      setSignInOpen(true)
                    }
                  >
                    {t('sign in')}
                  </a>{' '}
                  {t('to countinue reading')}!
                </p>
              </div>
            </div>
          ) : (
            <div>
              {chapterDetails.data[chapterLocale]?.map((page, index) =>
                isMobile ? (
                  <LazyImage
                    src={page}
                    key={index}
                    alt=""
                    width={400}
                    height={700}
                    className="mx-auto"
                  />
                ) : null,
              )}
            </div>
          )}
        </div>
      </div>
      <div className="hidden xl:block">
        {mode == 'minscreen' && <Header />}
        <div className="flex h-[calc(100vh-80px)] relative">
          <div className="flex-auto w-full h-full z-[5]">
            {!chapterDetails || chapterDetails.loading ? (
              <div className="w-full h-full pt-5">
                <div className="w-[70%] mx-auto mb-[60px] h-full bg-light-medium-gray animate-pulse"></div>
              </div>
            ) : (
              <ReadingSection
                commentNumber={commentLength}
                data={comicDetails.data}
                chapterData={chapterDetails.data}
                setOpenComments={setOpenComments}
                openComments={openComments}
                language={language}
                mode={mode}
                setMode={setMode}
                isSubscribe={isSubscribe}
                setIsSubscribe={setIsSubscribe}
                likeHandler={likeHandler}
                goToChap={goToChap}
                isLiked={isLiked}
                chapterLikes={chapterLikes}
              />
            )}
          </div>
          <div className="flex-auto w-1/3 h-full">
            {!openComments ? (
              !comicDetails || comicDetails.loading ? (
                <DummyComicDetail />
              ) : (
                <ComicDetail
                  data={comicDetails.data}
                  language={language}
                  setLanguage={setLanguage}
                  isSubscribe={isSubscribe}
                  setIsSubscribe={setIsSubscribe}
                  like={like}
                  unlike={unlike}
                  chapterId={chapterDetails.data.id}
                  comicLikes={comicLikes}
                  likeHandler={likeHandler}
                  chapterLikes={chapterLikes}
                  chapterIsLiked={isLiked}
                  setComicLikes={setComicLikes}
                  subscriptions={subscriptions}
                />
              )
            ) : !chapterDetails ? (
              <></>
            ) : window.innerWidth >= 1280 && mode == 'minscreen' ? (
              <CommentSection
                reload={() => chapterComments.callApi(true)}
                postComment={postComment}
                comments={chapterComments.data}
                chapterId={chapterDetails.data.id}
                mode={mode}
                setOpenComments={setOpenComments}
                openComments={openComments}
              />
            ) : (
              <></>
            )}
          </div>
          {mode == 'fullscreen' && (
            <CommentSection
              reload={() => chapterComments.callApi(true)}
              postComment={postComment}
              comments={chapterComments.data}
              chapterId={chapterDetails.data.id}
              mode={mode}
              setOpenComments={setOpenComments}
              openComments={openComments}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default function Page(props) {
  if (props.justHead) {
    return <></>;
  }
  return <Chapter {...props} />;
}
