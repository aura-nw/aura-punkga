import Button from 'components/core/Button/Button'
import Modal from 'components/core/modal'
import NFTPackage from 'components/pages/campaigns/assets/nft-package.png'
import StoryBadge from 'components/pages/campaigns/assets/story-badge.png'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import Decor from '../assets/decor.svg'
export default function MintBadgeSuccessModal({ hash, setHash }) {
  const { t } = useTranslation()

  return (
    <Modal open={!!hash} setOpen={() => setHash('')} className='[&_.static]:!overflow-visible'>
      <div className='w-[547px] hidden lg:block relative'>
        <div className='absolute -top-[38%] -left-[13%] -bottom-[25%] '>
          <div className='w-[215px] h-[280px] absolute top-1/2 left-1/2 -translate-x-[51%] -translate-y-1/2 -rotate-[7deg] overflow-hidden rounded-lg'>
            <Image src={StoryBadge} width={240} height={240} alt='' className='w-full aspect-square object-cover translate-y-4' />
            <div className='w-full h-[58px] bg-black grid place-items-center text-sm font-jaro line-clamp-2 px-6 text-center'>
              {t('PunkgaMe x Story Odyssey Badge')}
            </div>
          </div>
          <Image src={NFTPackage} alt='' className='h-full w-auto relative' />
        </div>
        <div>
          <div className='pl-[45%]'>
            <div className='leading-[26px] font-semibold mt-12 text-lg'>{t('Congratulation')}!</div>
            <div className='text-sm text-text-quatenary'>{t(`You've minted an NFT!`)}</div>
            <div className='mt-4'>
              <div className='text-sm font-semibold leading-5'>{t('PunkgaMe x Story Odyssey Badge')}</div>
            </div>
          </div>
          <div
            className='mt-8 py-7 pr-6 pl-[45%] bg-neutral-950 bg-no-repeat bg-[length:auto_100%] rounded-b-2xl'
            style={{
              backgroundImage: `url(${Decor.src})`,
            }}>
            <Button
              className='w-full'
              onClick={() => {
                window.open(`https://odyssey-testnet-explorer.storyscan.xyz/tx/${hash}`, '_blank')
                setHash('')
              }}>
              {t('View transaction')}
            </Button>
          </div>
        </div>
      </div>
      <div className={`w-[320px] lg:hidden px-10 pb-5 pt-7 flex flex-col items-center`}>
        <div className='leading-[26px] font-semibold text-center text-lg'>{t('Congratulation')}!</div>
        <div className='text-sm mt-2'>{t(`You've minted an NFT!`)}</div>
        <div className='flex flex-col items-center mt-8'>
          <div className='relative w-[240px] h-[280px] rotate-12'>
            <div className='absolute inset-0'>
              <div className='w-[60%] aspect-[4/6] absolute top-1/2 left-1/2 -translate-x-[53%] -translate-y-1/2 -rotate-[7deg] overflow-hidden rounded-lg'>
                <Image src={StoryBadge} width={240} height={240} alt='' className='w-full aspect-square object-cover translate-y-3' />
                <div className='w-full h-[65px] bg-black grid place-items-center py-2 text-sm text-center font-jaro px-4'>
                  {t('PunkgaMe x Story Odyssey Badge')}
                </div>
              </div>
              <Image src={NFTPackage} alt='' className='h-full w-auto relative' />
            </div>
          </div>
          <div className='text-sm font-semibold w-[240px] whitespace-nowrap text-center truncate mt-4'>
            {t('PunkgaMe x Story Odyssey Badge')}
          </div>
          <Button
            size='sm'
            className='w-full mt-5'
            onClick={() => {
              window.open(`https://odyssey-testnet-explorer.storyscan.xyz/tx/${hash}`, '_blank')
              setHash('')
            }}>
            {t('View transaction')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
