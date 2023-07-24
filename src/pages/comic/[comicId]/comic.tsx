import Header from 'components/Header'
import Tag from 'components/Label/Tag'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import mockAvar from 'src/assets/images/mockup4.png'
import { LanguageType } from 'src/constants/global.types'

export default function Comic({ comicDetails }) {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [language, setLanguage] = useState<LanguageType>(locale as LanguageType)

  if (comicDetails.loading) {
    return null
  }
  if (!comicDetails.data) return null
  console.log(comicDetails.data)

  const selectedLanguage =
    comicDetails.data.languages.find((l) => l.shortLang == language) ||
    comicDetails.data.languages.find((l) => l.isMainLanguage)

  return (
    <>
      <Header />
      <div className=''>
        <div className='h-[350px] w-full relative'>
          <div className='absolute inset-0 '>
            <Image
              src={comicDetails.data.image || mockAvar}
              height={320}
              width={240}
              className='h-full w-full object-cover'
              alt=''
            />
          </div>
          <div className='w-full bg-gradient-to-r from-[#000000cc] to-[#00000034] h-full z-10 relative px-5 py-3 flex flex-col justify-between'>
            <div className='flex gap-2 flex-wrap'>
              {comicDetails.data.languages.map((language, index) => {
                return (
                  <Tag
                    selected={selectedLanguage.id == language.id}
                    key={index}
                    onClick={() => setLanguage(language.shortLang)}>
                    {t(language.shortLang)}
                  </Tag>
                )
              })}
            </div>
            <div>
              <div></div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}
