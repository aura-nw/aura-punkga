import BigNumber from 'bignumber.js'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { getLaunchPadDetail, getLicenseTerm } from 'src/services'
import { abi } from 'src/services/abi'
import { abi as usdtAbi } from 'src/services/abi/usdt'
import { shorten } from 'src/utils'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import { useAccount, useBalance, useConnect, useReadContract, useWriteContract } from 'wagmi'
import BackButton from 'src/components/pages/launchpad/assets/back-button.png'
import Backdrop3 from 'src/components/pages/launchpad/assets/backdrop-3.png'
import Backdrop7 from 'src/components/pages/launchpad/assets/backdrop-7.png'
import Backdrop8 from 'src/components/pages/launchpad/assets/backdrop-8.png'
import BlueBlock from 'src/components/pages/launchpad/assets/blue-block.svg'
import ConfirmButton from 'src/components/pages/launchpad/assets/confirm.png'
import EndedChip from 'src/components/pages/launchpad/assets/ended-chip.png'
import GrayBar from 'src/components/pages/launchpad/assets/gray-bar.png'
import GreenBlock from 'src/components/pages/launchpad/assets/green-block.svg'
import LiveChip from 'src/components/pages/launchpad/assets/live-chip.png'
import MintAmount from 'src/components/pages/launchpad/assets/mint-amount.svg'
import MintButton from 'src/components/pages/launchpad/assets/mint-button.svg'
import RedBlock from 'src/components/pages/launchpad/assets/red-block.svg'
import SwiperNav from 'src/components/pages/launchpad/assets/swiper-nav.svg'
import UpcomingChip from 'src/components/pages/launchpad/assets/upcoming-chip.png'
import ViewTransactionButton from 'src/components/pages/launchpad/assets/view-transaction.png'
import YellowBlock from 'src/components/pages/launchpad/assets/yellow-block.svg'
import Layout, { LayoutContext } from 'src/components/pages/launchpad/components/layout'
import Modal from 'src/components/pages/launchpad/components/modal'
import { storyLaunchpadAbi } from 'src/services/abi/storyLaunchpad'
import { PILicenseTemplateAbi } from 'src/services/abi/PILicenseTemplate'
export default function Page(props) {
  if (props.justHead) return <></>
  return <LaunchPadDetail />
}
const LaunchPadDetail = () => {
  const [tab, setTab] = useState(1)
  const [open, setOpen] = useState(false)
  const [hash, setHash] = useState('')
  const { query } = useRouter()
  const { data } = useSWR({ key: 'fetch_launchpad', id: query.id }, ({ id }) => getLaunchPadDetail(id as string), {
    refreshInterval: 60000,
  })
  const { setData } = useContext(LayoutContext)
  const [quantity, setQuantity] = useState(1)
  const { writeContractAsync } = useWriteContract()
  const { connectAsync, connectors } = useConnect()
  const [screen, setScreen] = useState('confirm')
  const { isConnected, address } = useAccount()
  useEffect(() => {
    if (data && setData) {
      setData(
        <>
          <Image
            src={data.thumbnail_url}
            width={360}
            height={270}
            alt=''
            className='w-[360px] h-[270px] object-cover'
          />
          <div
            style={{ backgroundImage: `url(${Backdrop3.src})`, backgroundSize: '100% 100%' }}
            className='px-[13px] py-[14px] w-[360px] h-[104px] flex flex-col gap-1 text-2xl leading-[22px]'>
            <div className='text-primary-color'>{data.name}</div>
            <div className=' flex justify-between'>
              <div>Start:</div>
              <div className='text-primary-color'>{moment(data.start_date).format('DD MMM yyyy')}</div>
            </div>
            <div className=' flex justify-between'>
              <div>End:</div>
              <div className='text-primary-color'>{moment(data.end_date).format('DD MMM yyyy')}</div>
            </div>
          </div>
        </>
      )
    }
  }, [data, setData])
  const usdtBalance = useBalance({
    address,
    token: '0x3C93715FdCd6E0B043BD1ae7e1e437cA6dc391C6',
  })
  const minted = useReadContract({
    abi: storyLaunchpadAbi,
    address: '0x2f6646dad93454f681f7c0edc2df82931473ddb5',
    functionName: 'numberOfNftSold',
    args: [data?.license_token_address, data?.license_token_id, 1],
  })
  const allowance = useReadContract({
    abi: usdtAbi,
    address: '0x3C93715FdCd6E0B043BD1ae7e1e437cA6dc391C6',
    functionName: 'allowance',
    args: [address, '0x2f6646dad93454f681f7c0edc2df82931473ddb5'],
  })
  const licenseSalePhase = useReadContract({
    abi: storyLaunchpadAbi,
    address: '0x2f6646daD93454f681f7C0EdC2Df82931473ddB5',
    functionName: 'licenseSalePhase',
    args: [data?.license_token_address, data?.license_token_id],
  })
  const launchpadInfors = useReadContract({
    abi: storyLaunchpadAbi,
    address: '0x2f6646daD93454f681f7C0EdC2Df82931473ddB5',
    functionName: 'LaunchpadInfors',
    args: [data?.license_token_address, data?.license_token_id, licenseSalePhase?.data],
  })
  const license = useReadContract({
    abi: PILicenseTemplateAbi,
    address: '0x889A7921c302Ebb3fb4E49Dd808bA50838ce574f',
    functionName: 'toJson',
    args: [data?.license?.term_id],
  })
  const licenseData = license?.data
    ? JSON.parse(`[${(license?.data as string)?.substring(0, (license?.data as string).length - 1)}]`)
    : undefined
  const isRemix = licenseData?.find((d) => (d.trait_type = 'Derivatives Reciprocal')).value == 'true'
  const isCommercial = licenseData?.find((d) => (d.trait_type = 'Commercial Use')).value == 'true'

  const mintNFT = async () => {
    try {
      const hash = await writeContractAsync({
        address: '0x2f6646dad93454f681f7c0edc2df82931473ddb5',
        abi,
        functionName: 'mintNFT',
        args: [
          data.license_token_address,
          BigInt(data.license_token_id),
          BigInt(quantity),
          '0x3C93715FdCd6E0B043BD1ae7e1e437cA6dc391C6',
          BigInt(quantity * data.mint_price),
        ],
      })
      setHash(hash)
      setScreen('success')
    } catch (error) {
      setScreen('error')
      console.log(error)
    }
  }
  const mintHandler = async () => {
    try {
      if ((allowance.data as any) < quantity * data.mint_price) {
        await writeContractAsync({
          address: '0x3C93715FdCd6E0B043BD1ae7e1e437cA6dc391C6',
          abi: usdtAbi,
          functionName: 'approve',
          args: [
            '0x2f6646dad93454f681f7c0edc2df82931473ddb5',
            '9999999999999999999999999999999999999999999999999999999999',
          ],
        })
        setTimeout(mintNFT, 5000)
      } else {
        mintNFT()
      }
    } catch (error) {
      setScreen('error')
      console.log(error)
    }
  }
  if (!data) return <></>
  return (
    <>
      <div className='flex flex-col gap-[18px] text-2xl leading-[22px]'>
        <div>
          <div className='flex items-center gap-4'>
            <div className='text-5xl text-primary-color leading-[43px] uppercase'>{data.name}</div>
            {moment().isAfter(data.start_date) && moment().isBefore(data.end_date) ? (
              <Image src={LiveChip} alt='' />
            ) : moment().isBefore(data.start_date) ? (
              <Image src={UpcomingChip} alt='' />
            ) : (
              <Image src={EndedChip} alt='' />
            )}
          </div>
          <div className='flex'>
            <div className='w-[134px] text-2xl'>Creator:</div>
            <div className='w-[134px] text-2xl text-primary-color'>{shorten(data.creator_address)}</div>
          </div>
        </div>
        <div className='flex gap-3'>
          <div
            style={{ backgroundImage: `url(${Backdrop7.src})`, backgroundSize: '100% 100%' }}
            className='w-[667px] h-[214px] pt-3 px-6 pb-[18px] flex flex-col gap-[22px]'>
            <div className='flex flex-col gap-2'>
              {moment().isAfter(data.start_date) && moment().isBefore(data.end_date) ? (
                <div className='flex justify-between'>
                  <div className=''>End in:</div>
                  <div className=''>
                    <Countdown
                      date={new Date(data.end_date)}
                      renderer={({ hours, minutes, seconds, days }) => {
                        return (
                          <span>
                            {days}d - {hours}h : {minutes}m : {seconds}s
                          </span>
                        )
                      }}
                    />
                  </div>
                </div>
              ) : moment().isBefore(data.start_date) ? (
                <div className='flex justify-between'>
                  <div className=''>Start in:</div>
                  <div className=''>
                    <Countdown
                      date={new Date(data.start_date)}
                      renderer={({ hours, minutes, seconds, days }) => {
                        return (
                          <span>
                            {days}d - {hours}h : {minutes}m : {seconds}s
                          </span>
                        )
                      }}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className='flex justify-between'>
                <div className=''>Minted:</div>
                <div className=''>
                  {(minted.data as BigInt)?.toString() || 0} / {data.max_supply}
                </div>
              </div>
              <div className='bg-[#1A2533] py-[3px] px-1 w-[619px] overflow-hidden flex shadow-[1px_1.5px_0px_0px_#FFF]'>
                {Array.apply(
                  null,
                  Array(Math.floor(60 * (minted.data ? +(minted.data as BigInt)?.toString() / +data.max_supply : 0)))
                ).map((d, i) => (
                  <Image
                    src={i < 15 ? RedBlock : i < 30 ? YellowBlock : i < 45 ? GreenBlock : BlueBlock}
                    key={i}
                    alt=''
                  />
                ))}
                <Image src={GrayBar} alt='' className='' />
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
                Item: <span className='text-primary-color'>{data.max_supply}</span>
              </div>
              <div className='w-[1px] h-[22px] bg-white'></div>
              <div>
                Price:{' '}
                <span className='text-primary-color'>
                  {+BigNumber(data.mint_price).div(BigNumber(10).pow(18)).toFixed(8)} UDST
                </span>
              </div>
              <div className='w-[1px] h-[22px] bg-white'></div>
              <div>
                Max <span className='text-primary-color'>{data.max_mint_per_address}</span> per wallet
              </div>
            </div>
            <div
              className={`flex gap-[10px] ${
                moment().isBefore(data.start_date) || moment().isAfter(data.end_date)
                  ? 'pointer-events-none opacity-70'
                  : ''
              }`}>
              <div
                style={{ backgroundImage: `url(${MintAmount.src})`, backgroundSize: '100% 100%' }}
                className='flex text-primary-color w-full'>
                <div
                  className='w-full h-full grid place-items-center pb-1 cursor-pointer'
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <path d='M17.25 8.25H0.75V9.75H17.25V8.25Z' fill='#23FF81' />
                  </svg>
                </div>
                <div className='w-[72px] shrink-0 grid place-items-center pb-[6px]'>{quantity}</div>
                <div
                  className='w-full grid place-items-center pb-1 cursor-pointer'
                  onClick={() =>
                    setQuantity((prev) => (prev < data.max_mint_per_address ? prev + 1 : data.max_mint_per_address))
                  }>
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <g clipPath='url(#clip0_8468_142518)'>
                      <path
                        d='M17.25 8.25V9.75H9.75V17.25H8.25V9.75H0.75V8.25H8.25V0.75H9.75V8.25H17.25Z'
                        fill='#23FF81'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_8468_142518'>
                        <rect width='18' height='18' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div
                style={{ backgroundImage: `url(${MintButton.src})`, backgroundSize: '100% 100%' }}
                className='w-[465px] shrink-0 h-[39px] grid place-items-center uppercase text-primary-color pb-2 cursor-pointer'
                onClick={async () => {
                  if (!isConnected) {
                    await connectAsync({ connector: connectors.find((c) => c.id == 'io.metamask') })
                  }
                  setScreen('confirm')
                  setOpen(true)
                }}>
                Mint
              </div>
            </div>
          </div>
          <div>
            <div className='border border-[#2F639F] rounded overflow-hidden w-[180px] h-[180px]'>
              <Swiper
                slidesPerView={1}
                modules={[Navigation]}
                loop={true}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}>
                {data.featured_images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image src={image} width={180} height={180} alt='' className='w-[180px] h-[180px] object-cover' />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              style={{ backgroundImage: `url(${SwiperNav.src})`, backgroundSize: '100% 100%' }}
              className='w-[180px] h-[38px] flex '>
              <div className='w-1/2 grid place-items-center cursor-pointer swiper-button-prev'>
                <svg width='10' height='16' viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M10 1V3H9V4H8V5H7V6H6V7H5V9H6V10H7V11H8V12H9V13H10V15H9V16H7V15H6V14H5V13H4V12H3V11H2V10H1V9H0V7H1V6H2V5H3V4H4V3H5V2H6V1H7V0H9V1H10Z'
                    fill='#23FF81'
                  />
                </svg>
              </div>
              <div className='w-1/2 grid place-items-center cursor-pointer swiper-button-next'>
                <svg width='10' height='16' viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M0 15V13H1V12H2V11H3V10H4V9H5V7H4V6H3V5H2V4H1V3H0V1H1V0H3V1H4V2H5V3H6V4H7V5H8V6H9V7H10V9H9V10H8V11H7V12H6V13H5V14H4V15H3V16H1V15H0Z'
                    fill='#23FF81'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='leading-[11px] flex border w-fit border-[#2F639F] [&>div]:p-2 [&>div]:cursor-pointer [&>div.active]:text-white [&>div.active]:bg-[linear-gradient(90deg,#243B55_0%,#141E30_100%)] [&>div]:text-[#5E789D]  '>
            <div className={`${tab == 1 ? 'active' : ''}`} onClick={() => setTab(1)}>
              Launchpad
            </div>
            <div className={`${tab == 2 ? 'active' : ''} border-x border-[#2F639F]`} onClick={() => setTab(2)}>
              License Details
            </div>
            <div className={`${tab == 3 ? 'active' : ''}`} onClick={() => setTab(3)}>
              Licensor
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${Backdrop8.src})`, backgroundSize: '100% 100%' }}
            className='h-[110px] w-[856px] px-6 py-3 text-2xl leading-[22px] overflow-hidden'>
            {tab == 1 ? (
              <>
                <div>
                  Launchpad contract: <span className='text-primary-color'>{shorten(launchpadInfors?.data?.[0])}</span>
                </div>
                <div>
                  Creator: <span className='text-primary-color'>{shorten(data?.creator_address)}</span>
                </div>
                <div className='mt-2'>{data?.description}</div>
              </>
            ) : tab == 2 ? (
              <>
                <div>
                  License term:{' '}
                  <span className='text-primary-color'>
                    {isRemix && isCommercial
                      ? 'Commercial remix'
                      : !isRemix && isCommercial
                      ? 'Commercial use'
                      : isRemix && !isCommercial
                      ? 'Non - commercial social remix'
                      : 'Non - commercial social use'}
                  </span>
                </div>
                <div>
                  License token ID: <span className='text-primary-color'>{shorten(data?.license_token_id)}</span>
                </div>
                <div>
                  License contract: <span className='text-primary-color'>{shorten(data?.license_token_address)}</span>
                </div>
              </>
            ) : (
              <>
                <div>
                  IP Licensor: <span className='text-primary-color'>{shorten(data?.license?.ip_asset_id)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        title={
          screen == 'confirm'
            ? 'Mint NFT confirmation'
            : screen == 'success'
            ? 'Mint NFT successfully'
            : 'Mint NFT fail'
        }>
        {screen == 'confirm' ? (
          <>
            <div className='flex gap-4'>
              <Image
                src={data.thumbnail_url}
                alt=''
                width={160}
                height={120}
                className='w-[160px] h-[120px] rounded object-cover'
              />
              <div>
                <div className='text-primary-color text-[32px] leading-[29px]'>{data.name}</div>
                <div className=' text-[24px] leading-[22px]'>
                  Creator: <span className='text-primary-color'>{shorten(data.creator_address, 6, 6)}</span>
                </div>
              </div>
            </div>
            <div className='mt-5 w-[560px] flex flex-col gap-3 bg-[rgba(8,14,29,0.85)]  rounded border border-[#2F639F] p-3 text-[24px] leading-[22px]'>
              <div className='flex justify-between'>
                <div>NFT amount</div>
                <div>{`x${quantity}`}</div>
              </div>
              <div className='flex justify-between'>
                <div>Price</div>
                <div>{+BigNumber(data.mint_price).div(BigNumber(10).pow(18)).toFixed(8)} USDT</div>
              </div>
              <div className='flex justify-between'>
                <div>Total</div>
                <div>
                  {
                    +BigNumber(data.mint_price * quantity)
                      .div(BigNumber(10).pow(18))
                      .toFixed(8)
                  }{' '}
                  USDT
                </div>
              </div>
              <div className='flex justify-between'>
                <div>Your balance</div>
                <div>{`${+(+usdtBalance?.data?.formatted || 0).toFixed(8)}`} USDT</div>
              </div>
            </div>
            {+usdtBalance?.data?.formatted <
            +BigNumber(data.mint_price * quantity)
              .div(BigNumber(10).pow(18))
              .toFixed(8) ? (
              <div className='mt-3'>
                <div className='text-2xl leading-[22px] text-[#F77281]'>Insufficient USDT in your wallet</div>
                <div className='text-2xl leading-[22px]'>
                  Transfer USDT to <span className='text-primary-color'>{address}</span>
                </div>
              </div>
            ) : (
              <Image src={ConfirmButton} alt='' className='mt-3 cursor-pointer' onClick={mintHandler} />
            )}
          </>
        ) : screen == 'success' ? (
          <>
            <div className='flex flex-col justify-center items-center'>
              <div className='text-primary-color text-[32px] leading-[29px]'>{`You have owned ${quantity} NFTs`}</div>
              <Image
                src={data.featured_images[0]}
                alt=''
                width={256}
                height={192}
                className='border-2 border-[#2F639F] w-[256px] h-[192px] object-cover mt-2'
              />
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-col justify-center items-center'>
              <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60' fill='none'>
                <path
                  d='M36 33H39V36H42V39H45V42H48V45H51V48H54V51H57V54H60V57H57V60H54V57H51V54H48V51H45V48H42V45H39V42H36V39H33V36H27V39H24V42H21V45H18V48H15V51H12V54H9V57H6V60H3V57H0V54H3V51H6V48H9V45H12V42H15V39H18V36H21V33H24V27H21V24H18V21H15V18H12V15H9V12H6V9H3V6H0V3H3V0H6V3H9V6H12V9H15V12H18V15H21V18H24V21H27V24H33V21H36V18H39V15H42V12H45V9H48V6H51V3H54V0H57V3H60V6H57V9H54V12H51V15H48V18H45V21H42V24H39V27H36V33Z'
                  fill='#EC524A'
                />
              </svg>
              <div className='text-[36px] mt-2 text-[#EC524A]'>Transaction Failed!</div>
            </div>
          </>
        )}

        {screen == 'success' ? (
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer flex gap-2'>
            <Image src={BackButton} alt='' onClick={() => setOpen(false)} />
            <Link target='_blank' href={`https://sepolia.etherscan.io/tx/${hash}`}>
              <Image src={ViewTransactionButton} alt='' />
            </Link>
          </div>
        ) : (
          <Image
            src={BackButton}
            alt=''
            className='absolute bottom-4 left-1/2 -translate-x-[63%] cursor-pointer'
            onClick={() => setOpen(false)}
          />
        )}
      </Modal>
    </>
  )
}
Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
