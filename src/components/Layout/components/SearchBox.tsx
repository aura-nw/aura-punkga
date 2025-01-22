import SearchIcon from 'assets/images/icons/search.svg'
import TextField from 'components/Input/TextField'
import Spinner from 'components/Spinner'
import NoImage from 'images/no_img.png'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import useApi from 'src/hooks/useApi'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { search } from 'src/services'
export default function SearchBox() {
  const { t } = useTranslation()
  const router = useRouter()
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const searchComic = useApi<any[]>(async () => await search(searchValue), !!searchValue, [searchValue])
  const ref = useRef<any>()
  const divRef = useRef<any>()
  const mref = useRef<any>()
  const mdivRef = useRef<any>()
  useClickOutside(divRef, () => {
    if (window.innerWidth > 768) {
      setIsSearchFocused(false)
    }
  })
  useClickOutside(mdivRef, () => {
    if (window.innerWidth <= 768) {
      setIsSearchFocused(false)
    }
  })
  useEffect(() => {
    ;(window as any).isSearchFocused = isSearchFocused
  }, [isSearchFocused])
  useEffect(() => {
    ref.current?.addEventListener(
      'keypress',
      _.debounce(
        (e: KeyboardEvent) => {
          if (e.which == 13) {
            setIsSearchFocused(false)
            ref.current.blur()
            router.push(`/search?keyword=${ref.current.value}`)
          }
        },
        1000,
        { leading: true, trailing: false }
      )
    )
    mref.current?.addEventListener(
      'keypress',
      _.debounce(
        (e: KeyboardEvent) => {
          if (e.which == 13) {
            mref.current.blur()
            setIsSearchFocused(false)
            router.push(`/search?keyword=${mref.current.value}`)
          }
        },
        1000,
        { leading: true, trailing: false }
      )
    )
  }, [])
  return (
    <>
      <div
        className={` fixed inset-0 transition-opacity duration-500 bg-[#000] ${
          isSearchFocused ? 'z-20 opacity-25' : '-z-20 opacity-0 pointer-events-none'
        }`}></div>
      <div ref={divRef} className={`${isSearchFocused ? 'z-30' : ''} w-96  relative`}>
        <TextField
          inputref={ref}
          onChange={_.debounce(setSearchValue, 500)}
          onFocus={() => setIsSearchFocused(true)}
          className={`text-white bg-neutral-950 border-none w-full duration-500`}
          placeholder={t('Search by title')}
          trailingComponent={
            searchComic.loading ? (
              <div>
                <Spinner size={20} className='w-5 h-5' color='white' />
              </div>
            ) : (
              <Image
                width={20}
                height={20}
                src={SearchIcon}
                alt=''
                onClick={() => {
                  if (ref.current.value) {
                    setIsSearchFocused(false)
                    router.push(`/search?keyword=${ref.current.value}`)
                  }
                }}
              />
            )
          }
        />
        {!!searchComic.data?.length && (
          <div
            className={`absolute bg-neutral-950 text-white transition-all -bottom-4 translate-y-full duration-500 rounded-lg max-h-[40vh] overflow-hidden ${
              isSearchFocused ? 'opacity-100' : 'pointer-events-none opacity-0 w-full'
            }`}>
            <div className={`max-h-[40vh] overflow-auto  flex flex-col gap-7  p-5`}>
              {searchComic.data?.map((manga, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${
                    manga.status.text == 'Upcoming' && '[&_a:not(.author)]:pointer-events-none'
                  }`}
                  onClick={() => router.push(`/comic/${manga.slug}/chapter/1`)}>
                  <Image
                    src={manga.image || NoImage}
                    width={48}
                    height={64}
                    className='w-12 h-16 bg-medium-gray rounded-md object-cover'
                    alt=''
                  />
                  <div className='flex flex-col justify-between'>
                    <div>
                      <p className='text-brand-default text-base font-bold cursor-pointer'>{manga.en.title}</p>
                      <div className='text-xs'>
                        {manga.authors.map((author, index) => (
                          <Fragment key={index}>
                            <span className='text-brand-default font-[600] first:hidden'>, </span>
                            <span className='text-brand-default font-[600]'>
                              {author.slug ? (
                                <Link className='author' href={`/artist/${author.slug}`}>
                                  {t(author.name)}
                                </Link>
                              ) : (
                                t(author.name)
                              )}
                            </span>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                    {!!manga.latestChap.number && (
                      <p className='text-xs'>
                        {t('Latest chap')}:{' '}
                        <span
                          className='text-brand-default font-semibold cursor-pointer'
                          onClick={(e) => {
                            router.push(`/comic/${manga.slug}/chapter/${manga.latestChap.number}`)
                            e.preventDefault()
                          }}>
                          {manga.latestChap.number}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
