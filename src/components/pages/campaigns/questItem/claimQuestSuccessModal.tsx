import Button from 'components/core/Button'
import Modal from 'components/core/Modal'
import KPImage from 'components/pages/campaigns/assets/ic_Kp.svg'
import XPImage from 'components/pages/campaigns/assets/illus.svg'
import NFTPackage from 'components/pages/campaigns/assets/nft-package.png'
import SFImage from 'components/pages/campaigns/assets/sf.png'
import XPPackage from 'components/pages/campaigns/assets/xp-package.png'
import NoImage from 'images/no_img.png'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import Decor from '../assets/decor.svg'
export default function ClamQuestSuccessModal({ quest, openClaimSuccessModal, setClaimSuccessModalOpen }) {
  const xpImageSrc = quest.pointText == 'KP' ? KPImage : quest.pointText == 'SF' ? SFImage : XPImage
  const xpText = quest.pointText
  const { t } = useTranslation()

  return (
    <Modal
      open={openClaimSuccessModal}
      setOpen={() => setClaimSuccessModalOpen(false)}
      className='[&_.static]:!overflow-visible'>
      <div className='w-[547px] hidden lg:block relative'>
        {quest?.reward.nft?.nft_name ? (
          <>
            <div className='absolute -top-[38%] -left-[13%] -bottom-[25%] '>
              <div className='w-[215px] h-[280px] absolute top-1/2 left-1/2 -translate-x-[51%] -translate-y-1/2 -rotate-[7deg] overflow-hidden rounded-lg'>
                <Image
                  src={quest?.reward.nft.img_url || NoImage}
                  width={240}
                  height={240}
                  alt=''
                  className='w-full aspect-square object-cover'
                />
                <div className='w-full h-[65px] bg-black grid place-items-center py-2 text-3xl font-jaro truncate px-4'>
                  {quest?.reward.nft?.nft_name}
                </div>
              </div>
              <Image src={NFTPackage} alt='' className='h-full w-auto relative' />
            </div>
            <div className='absolute -left-[15%] -rotate-12 w-[120px] -bottom-[10%] '>
              <Image
                src={xpImageSrc}
                width={240}
                height={240}
                alt=''
                className='w-[75px] absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-1/2 -rotate-12'
              />
              <Image src={XPPackage} alt='' className='h-full w-auto relative' />
              <div className='font-jaro text-[14px] absolute bottom-[14%] text-center w-[46px] origin-bottom-left -rotate-[14deg] left-[30%] text-black'>{`x${quest?.reward.xp}`}</div>
            </div>
            <div>
              <div className='pl-[45%]'>
                <div className='leading-[26px] font-semibold mt-12 text-lg'>{t('Congratulation')}!</div>
                <div className='text-sm text-text-quatenary'>{t('You have received quest reward')}</div>
                <div className='mt-4'>
                  {quest?.reward.nft?.nft_name && (
                    <div className='text-sm font-semibold leading-5'>{quest?.reward.nft?.nft_name}</div>
                  )}
                  <div className='text-text-brand-hover font-semibold text-xl'>{`+ ${quest?.reward.xp} ${xpText}`}</div>
                </div>
              </div>
              <div
                className='mt-8 py-7 pr-6 pl-[45%] bg-neutral-950 bg-no-repeat bg-[length:auto_100%] rounded-b-2xl'
                style={{
                  backgroundImage: `url(${Decor.src})`,
                }}>
                <Button className='w-full' onClick={() => setClaimSuccessModalOpen(false)}>
                  {t('Done')}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='absolute -top-[35%] -left-[5%] -bottom-[25%] '>
              <Image
                src={xpImageSrc}
                width={240}
                height={240}
                alt=''
                className='w-[175px] absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-1/2 -rotate-12'
              />
              <Image src={XPPackage} alt='' className='h-full w-auto relative' />
              <div className='font-jaro text-[28px] absolute bottom-[14.5%] text-center w-[100px] origin-bottom-left -rotate-[14deg] left-[30%] text-black'>{`x${quest?.reward.xp}`}</div>
            </div>
            <div>
              <div className='pl-[45%]'>
                <div className='leading-[26px] font-semibold mt-12 text-lg'>{t('Congratulation')}!</div>
                <div className='text-sm text-text-quatenary'>{t('You have received quest reward')}</div>
                <div className='mt-4'>
                  {quest?.reward.nft?.nft_name && (
                    <div className='text-sm font-semibold leading-5'>{quest?.reward.nft?.nft_name}</div>
                  )}
                  <div className='text-text-brand-hover font-semibold text-xl'>{`+ ${quest?.reward.xp} ${xpText}`}</div>
                </div>
              </div>
              <div
                className='mt-8 py-7 pr-6 pl-[45%] bg-neutral-950 bg-no-repeat bg-[length:auto_100%] rounded-b-2xl'
                style={{
                  backgroundImage: `url(${Decor.src})`,
                }}>
                <Button className='w-full' onClick={() => setClaimSuccessModalOpen(false)}>
                  {t('Done')}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={`w-[320px] lg:hidden px-10 pb-5 pt-7 flex flex-col items-center`}>
        <div className='leading-[26px] font-semibold text-center text-lg'>{t('Congratulation')}!</div>
        <div className='text-sm mt-2'>{t('You have received quest reward')}</div>
        {quest?.reward.nft?.nft_name ? (
          <div className='flex flex-col items-center mt-8'>
            <div className='relative w-[240px] h-[280px] rotate-12'>
              <div className='absolute inset-0 translate-x-[15%]'>
                <div className='w-[60%] aspect-[4/6] absolute top-1/2 left-1/2 -translate-x-[53%] -translate-y-1/2 -rotate-[7deg] overflow-hidden rounded-lg'>
                  <Image
                    src={quest?.reward.nft.img_url || NoImage}
                    width={240}
                    height={240}
                    alt=''
                    className='w-full aspect-square object-cover'
                  />
                  <div className='w-full h-[65px] bg-black grid place-items-center py-2 text-xl font-jaro truncate px-4'>
                    {quest?.reward.nft?.nft_name}
                  </div>
                </div>
                <Image src={NFTPackage} alt='' className='h-full w-auto relative' />
              </div>
              <div className='absolute -left-[0%] -rotate-12 w-[100px] -bottom-[5%] '>
                <Image
                  src={xpImageSrc}
                  width={240}
                  height={240}
                  alt=''
                  className='w-[55px] absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-1/2 -rotate-12'
                />
                <Image src={XPPackage} alt='' className='h-full w-auto relative' />
                <div className='font-jaro text-[14px] absolute bottom-[12%] text-center w-[36px] origin-bottom-left -rotate-[14deg] left-[30%] text-black'>{`x${quest?.reward.xp}`}</div>
              </div>
            </div>
            <div className='text-sm font-semibold w-[240px] whitespace-nowrap text-center truncate mt-4'>
              {quest?.reward.nft?.nft_name}
            </div>
            <div className='font-bold text-second-color text-xl text-text-brand-defaul text-center mt-4'>
              {`+ ${quest?.reward.xp} ${xpText}`}
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center mt-8 relative w-[250px] h-[360px] '>
            <div className='absolute inset-0 '>
              <Image
                src={xpImageSrc}
                width={240}
                height={240}
                alt=''
                className='w-[60%] absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-1/2 -rotate-12'
              />
              <Image src={XPPackage} alt='' className='h-full w-auto relative' />
              <div className='font-jaro text-[28px] absolute bottom-[14.5%] text-center w-[100px] origin-bottom-left -rotate-[14deg] left-[30%] text-black'>{`x${quest?.reward.xp}`}</div>
            </div>
          </div>
        )}
        <Button size='sm' className='w-full mt-5' onClick={() => setClaimSuccessModalOpen(false)}>
          {t('Done')}
        </Button>
      </div>
    </Modal>
  )
}
