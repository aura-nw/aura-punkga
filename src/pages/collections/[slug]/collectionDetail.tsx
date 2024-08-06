import Chip from 'components/core/Chip'
import GallerySwiper from 'components/pages/launchpad/GallerySwiper'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Launchpad } from 'src/models/launchpad'
import { getLaunchPadDetail, mintNfts } from 'src/services'
import { useAccount, useBalance, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import useSWR from 'swr'
import { abi } from 'src/services/abi/launchpad'
import moment from 'moment'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Button from 'components/core/Button/Button'
import Modal from 'components/Modal'
import Image from 'next/image'
import Loader from 'assets/images/loader.png'
import { Context } from 'src/context'
import { toast } from 'react-toastify'
import { ModalContext } from 'src/context/modals'
import _ from 'lodash'
import { isMobile } from 'react-device-detect'
import { parseEther } from 'viem'

export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <CollectionDetail {...props} />
}
function CollectionDetail() {
  const { query, locale } = useRouter()
  const { account } = useContext(Context)
  const { writeContractAsync } = useWriteContract()
  const [hash, setHash] = useState<string | undefined>(undefined)
  const result = useWaitForTransactionReceipt({
    hash: hash as any,
  })
  const { isConnected } = useAccount()
  const { setSignInOpen, setWalletConnectOpen } = useContext(ModalContext)
  const walletBalance = useBalance({
    address: account?.activeWalletAddress as any,
  })
  const balance = +walletBalance?.data?.formatted || 0
  const [showSeeMore, setShowSeeMore] = useState(true)
  const [seeMore, setSeeMore] = useState(false)
  const [amount, setAmount] = useState(1)
  const { t } = useTranslation()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [insufficientBalanceOpen, setInsufficientBalanceOpen] = useState(false)
  const [processingText, setProcessingText] = useState('')
  const slug = query.slug as string
  const { data, isLoading } = useSWR<Launchpad>({ key: 'fecth-launchpad-detail', slug }, ({ slug }) =>
    getLaunchPadDetail(slug)
  )

  const { data: onChainData, refetch }: { data: any; refetch: any } = useReadContract({
    abi,
    address: data?.contract_address as any,
    functionName: 'saleDetails',
  })

  useEffect(() => {
    const height = document.querySelector('.desciption')?.getBoundingClientRect().height
    if (height > (isMobile ? 100 : 40)) {
      setShowSeeMore(true)
    } else {
      setShowSeeMore(false)
    }
  }, [locale])

  useEffect(() => {
    console.log('hash result',result)
    if (result.data && hash) {
      if (result.data?.status == 'success') {
        setSuccessOpen(true)
      } else {
        toast(t('Failed to collect NFT. Please try again or contact us.'), {
          type: 'error',
        })
      }
      refetch()
      setProcessingText('')
    }
  }, [result, hash])

  if (!data || !onChainData) {
    return null
  }
  const startTime = moment.unix(+BigInt(onChainData.publicSaleStart).toString())
  const endTime = moment.unix(+BigInt(onChainData.publicSaleEnd).toString())
  const isUpcoming = moment().isBefore(startTime)
  const isLive = moment().isAfter(startTime) && moment().isBefore(endTime)
  const getChip = () => {
    if (isUpcoming) {
      return <Chip color='process'>{t('Upcoming')}</Chip>
    }
    if (isLive) {
      return <Chip color='success'>{t('Live')}</Chip>
    }
    return <Chip color='error'>{t('Ended')}</Chip>
  }
  const copyAddress = async () => {
    navigator.clipboard.writeText(account?.activeWalletAddress)
    setIsCopied(true)
    _.debounce(() => {
      _.delay(() => setIsCopied(false), 3000)
    }, 1000)()
  }
  const mintHandler = async () => {
    try {
      setConfirmOpen(false)
      if (account.noncustodialWalletAddress) {
        setProcessingText(t('Please confirm the transaction in your wallet'))
        const res = await writeContractAsync({
          abi,
          address: data?.contract_address as any,
          functionName: 'purchase',
          args: [BigInt(amount)],
          value: parseEther(
            ((BigInt(onChainData.publicSalePrice) / BigInt(10) ** BigInt(18)) * BigInt(amount)).toString()
          ),
        })
        console.log(res)
        setHash(res)
      } else {
        setProcessingText(t('Processing'))
        const response = await mintNfts(data.id as string, amount)
        if (response?.hash) {
          setHash(response?.hash)
          console.log(response?.hash)
        } else {
          throw new Error('Failed to mint NFT. Please try again or contact us.')
        }
      }
    } catch (error) {
      setProcessingText('')
      console.error(error)
      toast(t(error.message || 'Something went wrong'), {
        type: 'error',
      })
    }
  }

  return (
    <>
      <div className='py-8 px-4 pk-container lg:flex lg:gap-8 lg:bg-white lg:rounded-md lg:p-4 lg:mt-8'>
        <div className='lg:max-w-[446px]'>
          <GallerySwiper images={data?.featured_images} />
        </div>
        <div className='mt-8 lg:mt-0 lg:w-full'>
          <div className='flex gap-2.5'>
            {getChip()} {onChainData.maxSupply <= onChainData.totalMinted && <Chip color='error'>{t('Sold out')}</Chip>}
          </div>
          <div className='mt-4'>
            <div className='font-medium'>{data[locale].name}</div>
            <div className='mt-0.5 text-xs font-medium'>
              {t('by')}{' '}
              <Link href={`/artist/${data.launchpad_creator.slug}`} className='text-text-brand-defaul'>
                {data.launchpad_creator.pen_name}
              </Link>
            </div>
            <div className={`mt-4 text-sm desciption ${seeMore ? '' : 'line-clamp-5 lg:line-clamp-2'}`}>
              {ReactHtmlParser(data[locale].description)}
            </div>
            {showSeeMore && (
              <div
                className='mt-1.5 text-text-info-primary text-sm font-semibold cursor-pointer'
                onClick={() => setSeeMore(!seeMore)}>
                {seeMore ? t('See less') : t('See more')}
              </div>
            )}
            <div className='lg:flex lg:gap-4 lg:items-center'>
              {isUpcoming ? (
                <div className='mt-4 text-sm font-medium'>
                  {t('Starts at:')}{' '}
                  <span className='capitalize'>
                    {locale == 'en'
                      ? startTime.format('HH:mm DD MMMM YYYY')
                      : startTime.locale('vi').format('HH:mm DD MMMM YYYY')}
                  </span>
                </div>
              ) : (
                <div className='mt-4 text-sm font-medium'>
                  {t('Ends at:')}{' '}
                  <span className='capitalize'>
                    {locale == 'en'
                      ? endTime.format('HH:mm DD MMMM YYYY')
                      : endTime.locale('vi').format('HH:mm DD MMMM YYYY')}
                  </span>
                </div>
              )}
              <div className='hidden lg:block w-[1px] h-4 bg-neutral-100 mt-4'></div>
              <div className='mt-4 text-sm font-medium'>
                {onChainData.maxSalePurchasePerAddress == 0
                  ? t('Unlimited')
                  : locale == 'en'
                  ? `Max ${onChainData.maxSalePurchasePerAddress} per wallet`
                  : `Tối đa ${onChainData.maxSalePurchasePerAddress} NFT mỗi ví`}
              </div>
            </div>
            <div className='my-8 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4'>
              <div className='py-2 px-3 border border-border-secondary rounded-md bg-neutral-50'>
                <div className='text-text-teriary text-sm font-medium'>{t('Total')}</div>
                <div className='mt-1.5 font-semibold'>{`${onChainData.maxSupply} NFTs`}</div>
              </div>
              {!isUpcoming && (
                <div className='py-2 px-3 border border-border-secondary rounded-md bg-neutral-50'>
                  <div className='text-text-teriary text-sm font-medium'>{t('Collected')}</div>
                  <div className='mt-1.5 font-semibold'>{`${onChainData.totalMinted} NFTs`}</div>
                </div>
              )}
              <div className='py-2 px-3 border border-border-secondary rounded-md bg-neutral-50'>
                <div className='text-text-teriary text-sm font-medium'>{t('Value')}</div>
                <div className='mt-1.5 font-semibold'>{`${
                  BigInt(onChainData.publicSalePrice) / BigInt(10) ** BigInt(18)
                } AURA`}</div>
              </div>
            </div>
            {isLive && (
              <>
                <div className='mt-4 flex gap-4'>
                  <div className='min-w-[132px]'>
                    <div className='text-sm font-semibold text-text-teriary'>{t('Estimated')}</div>
                    <div className='mt-0.5 font-semibold'>{`${(
                      (BigInt(onChainData.publicSalePrice) / BigInt(10) ** BigInt(18)) *
                      BigInt(amount)
                    ).toString()} AURA`}</div>
                  </div>
                  <div className='flex min-h-10 font-semibold'>
                    <div
                      className='grid place-content-center w-14 text-center border border-border-secondary rounded-l-md cursor-pointer'
                      onClick={() => setAmount((amount) => (amount > 2 ? amount - 1 : 1))}>
                      -
                    </div>
                    <div className='min-w-[62px] text-center border-y border-border-secondary grid place-content-center'>
                      {amount}
                    </div>
                    <div
                      className='grid place-content-center w-14 text-center border border-border-secondary rounded-r-md cursor-pointer'
                      onClick={() =>
                        setAmount((amount) =>
                          amount <
                          (onChainData.maxSalePurchasePerAddress || onChainData.maxSupply - onChainData.totalMinted)
                            ? amount + 1
                            : amount
                        )
                      }>
                      +
                    </div>
                  </div>
                </div>
                <div className='mt-4'>
                  <Button
                    color='dark'
                    className='w-full lg:max-w-[328px]'
                    size='lg'
                    onClick={() => {
                      if (!account) {
                        setSignInOpen(true)
                        return
                      }
                      if (account.noncustodialWalletAddress && !isConnected) {
                        setWalletConnectOpen(true)
                        return
                      }
                      if (
                        balance >
                        +((BigInt(onChainData.publicSalePrice) / BigInt(10) ** BigInt(18)) * BigInt(amount)).toString()
                      ) {
                        setConfirmOpen(true)
                      } else {
                        setInsufficientBalanceOpen(true)
                      }
                    }}>
                    {t('Collect')}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal open={confirmOpen} setOpen={setConfirmOpen}>
        <div className='bg-white py-8 px-4 max-w-[343px] w-[90vw] md:max-w-[547px]'>
          <div className='text-lg font-semibold mt-2.5 text-center w-full'>{t('Mint NFT Confirmation')}</div>
          <div className='mt-8 space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <Image
                src={data?.featured_images[0]}
                alt=''
                className='w-full aspect-square rounded-mlg'
                width={300}
                height={300}
              />
              <div>
                <div className='text-sm font-semibold'>{data[locale].name}</div>
                <div className='mt-0.5 text-xs font-medium'>
                  {t('by')}{' '}
                  <Link href={`/artist/${data.launchpad_creator.slug}`} className='text-text-brand-defaul'>
                    {data.launchpad_creator.pen_name}
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className='text-sm font-medium text-text-teriary'>{t('Item value')}</div>
              <div className='mt-2 border border-border-secondary rounded-lg py-2 px-3 text-sm font-medium'>{`${(
                (BigInt(onChainData.publicSalePrice) / BigInt(10) ** BigInt(18)) *
                BigInt(amount)
              ).toString()} AURA`}</div>
            </div>
            <div className='text-sm text-text-info-primary text-center'>
              {t(
                amount == 1
                  ? t('You will receive a random item from the collection')
                  : locale == 'en'
                  ? `You will receive ${amount} random items from the collection`
                  : `Bạn sẽ nhận được ${amount} NFT ngẫu nhiên từ bộ sưu tập`
              )}
            </div>
            <Button className='w-full' size='sm' onClick={mintHandler}>
              {t('Collect')}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={successOpen}
        setOpen={(open) => {
          if (!open) setHash(undefined)
          setSuccessOpen(open)
        }}>
        <div className='bg-white py-8 px-4 max-w-[343px] w-[90vw] md:max-w-[547px]'>
          <div className='text-lg font-semibold mt-2.5 text-center w-full'>{t('You have owned an NFT')}</div>
          <div className='mt-8 space-y-4'>
            <div className='flex justify-center'>
              <Image
                src={data?.featured_images[0]}
                alt=''
                className='w-[146px] aspect-square rounded-mlg'
                width={300}
                height={300}
              />
            </div>
            <div className='text-sm font-semibold text-center'>{data[locale].name}</div>
            <div className='text-sm text-center'>{t('Thank you for supporting our artist')}</div>

            <Button className='w-full' size='sm'>
              <Link href='/profile' target='_blank'>
                {t('View NFT')}
              </Link>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal open={!!processingText} setOpen={() => setProcessingText('')} hideClose>
        {processingText ? (
          <div className='p-8 bg-white flex flex-col items-center gap-8 min-w-[300px] w-[90vw] md:max-w-[547px]'>
            <Image src={Loader} alt='' className='w-20 h-20 animate-spin' />
            <div className='text-sm font-medium text-center'>{t(processingText)}</div>
          </div>
        ) : (
          <></>
        )}
      </Modal>
      <Modal open={insufficientBalanceOpen} setOpen={setInsufficientBalanceOpen}>
        <div className='bg-white py-8 px-4 max-w-[343px] w-[90vw] md:max-w-[547px]'>
          <div className='rounded-mlg p-3 flex gap-1 bg-feedback-error-50'>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path
                d='M17.542 15.5891L10.8845 3.22578C10.4127 2.34922 9.15564 2.34922 8.68337 3.22578L2.02634 15.5891C1.92388 15.7794 1.87252 15.993 1.87725 16.209C1.88199 16.4251 1.94267 16.6363 2.05336 16.8219C2.16406 17.0075 2.32099 17.1613 2.50884 17.2681C2.69669 17.375 2.90904 17.4313 3.12517 17.4316H16.4412C16.6575 17.4317 16.8701 17.3756 17.0582 17.2688C17.2463 17.1621 17.4035 17.0084 17.5144 16.8227C17.6254 16.637 17.6862 16.4258 17.691 16.2095C17.6959 15.9933 17.6445 15.7795 17.542 15.5891ZM9.78415 15.5176C9.62963 15.5176 9.47859 15.4718 9.35011 15.3859C9.22164 15.3001 9.1215 15.1781 9.06237 15.0353C9.00324 14.8925 8.98777 14.7355 9.01791 14.5839C9.04806 14.4324 9.12246 14.2932 9.23172 14.1839C9.34098 14.0746 9.48019 14.0002 9.63174 13.9701C9.78328 13.9399 9.94037 13.9554 10.0831 14.0145C10.2259 14.0737 10.3479 14.1738 10.4337 14.3023C10.5196 14.4308 10.5654 14.5818 10.5654 14.7363C10.5654 14.9435 10.4831 15.1422 10.3366 15.2888C10.1901 15.4353 9.99135 15.5176 9.78415 15.5176ZM10.6326 7.66016L10.4084 12.4258C10.4084 12.5915 10.3425 12.7505 10.2253 12.8677C10.1081 12.9849 9.94913 13.0508 9.78337 13.0508C9.61761 13.0508 9.45864 12.9849 9.34143 12.8677C9.22422 12.7505 9.15837 12.5915 9.15837 12.4258L8.93415 7.66211C8.92911 7.54828 8.94704 7.4346 8.98688 7.32784C9.02671 7.22109 9.08763 7.12344 9.166 7.04073C9.24437 6.95802 9.33859 6.89194 9.44305 6.84642C9.5475 6.8009 9.66006 6.77688 9.774 6.77578H9.7822C9.89691 6.77572 10.0105 6.79891 10.116 6.84393C10.2215 6.88896 10.3168 6.95489 10.3961 7.03776C10.4754 7.12063 10.5371 7.21871 10.5775 7.32608C10.6179 7.43346 10.6361 7.5479 10.631 7.6625L10.6326 7.66016Z'
                fill='#F73B3B'
              />
            </svg>
            <div className='text-text-error-primary-3 text-sm'>
              {t('You don’t have enough AURA to collect this NFT')}
            </div>
          </div>
          <div className='mt-8 text-sm font-medium text-text-teriary'>{t('Please send AURA to your address')}</div>
          <div
            className='mt-2 rounded-lg py-2 px-3 flex items-center gap-1.5 cursor-pointer w-full border border-border-secondary justify-between'
            onClick={copyAddress}>
            <div className='text-sm font-medium break-words whitespace-pre-line w-[calc(100%-36px)]'>
              {account?.activeWalletAddress}
            </div>
            {isCopied ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                className='shrink-0'>
                <path
                  d='M16.8 8.3999L9.6405 15.5999L7.20001 13.1456'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                className='shrink-0'>
                <path
                  d='M8.98537 5.24993V7.27493C8.98537 7.64772 9.28758 7.94993 9.66037 7.94993H11.6854M13.0354 2.54993H8.31021C7.56463 2.54993 6.96021 3.15434 6.96021 3.89992V5.24993M13.0354 2.54993H13.4119C13.602 2.54993 13.783 2.62999 13.9139 2.76777C14.1107 2.97483 14.4225 3.29363 14.7229 3.56243C14.9583 3.77309 15.3282 4.15117 15.5497 4.38094C15.6695 4.5052 15.7354 4.67111 15.7354 4.84371L15.7354 5.24993M13.0354 2.54993V4.57493C13.0354 4.94772 13.3376 5.24993 13.7104 5.24993H15.7354M15.7354 5.24993L15.7352 12C15.7352 12.7455 15.1308 13.3499 14.3852 13.3499H11.6852M10.6729 6.26243C10.3725 5.99363 10.0607 5.67483 9.86391 5.46777C9.73295 5.32999 9.55201 5.24993 9.36192 5.24993H4.26021C3.51463 5.24993 2.91021 5.85434 2.91021 6.59992L2.91016 14.6999C2.91015 15.4455 3.51457 16.0499 4.26015 16.0499L10.3352 16.0499C11.0808 16.0499 11.6852 15.4455 11.6852 14.7L11.6854 7.54371C11.6854 7.37111 11.6195 7.2052 11.4997 7.08094C11.2782 6.85117 10.9083 6.47309 10.6729 6.26243Z'
                  stroke='#6D6D6D'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
