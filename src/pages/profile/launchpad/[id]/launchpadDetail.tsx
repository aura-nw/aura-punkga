import { Tooltip } from '@mui/material'
import Divider from '@mui/material/Divider'
import BigNumber from 'bignumber.js'
import Button from 'components/core/Button/Button'
import { abi } from 'components/pages/launchpad/abi'
import UploadImage from 'components/pages/launchpad/uploadImage'
import CopySvg from 'images/icons/copy.svg'
import _ from 'lodash'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import ic_question_circle from 'src/assets/images/icons/ic_question_circle.svg'
import ic_trash from 'src/assets/images/icons/ic_trash.svg'
import { currencyAddress, launchpadContractAddress, usdtAddress } from 'src/constants/address'
import { useStory } from 'src/context/story'
import { zeroAddress } from 'viem'
import { useAccount, useConnect, useReadContract, useWriteContract } from 'wagmi'
import Footer from '../../../../components/Footer'
import Header from '../../../../components/Header'
import Modal from '../../../../components/Modal'
import { LaunchpadStatus } from '../../../../constants/constants'
import useApi from '../../../../hooks/useApi'
import { shorten } from '../../../../utils'
import { getLaunchpad } from './with-api'

export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <LaunchpadDetail {...props} />
}

export function getFileNameFromURL(url: string) {
  let parts = url.split('/')
  let fileName = parts[parts.length - 1]
  fileName = fileName.replace(/%20/g, ' ')
  if (fileName.startsWith('nft_images-')) {
    fileName = fileName.substring('nft_images-'.length)
  }
  return fileName
}

function LaunchpadDetail({
  preDeploy,
  postDeploy,
  publish,
  unpublish,
  deleteLaunchpad,
}: {
  preDeploy: (id: string) => any
  postDeploy: (id: string, txHash: string) => any
  publish: (id: string) => any
  unpublish: (id: string) => any
  deleteLaunchpad: (id: string) => any
}) {
  const router = useRouter()
  const idRef = useRef<any>()
  const { id } = router.query
  const { isConnected, address } = useAccount()
  const { connectors, connectAsync } = useConnect()
  const launchpad = useApi<any>(() => getLaunchpad(id as string), true, [])
  const { client } = useStory()
  const { t } = useTranslation()
  const { writeContractAsync } = useWriteContract()
  const [isPending, setIsPending] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [openDeploy, setOpenDeploy] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openPublish, setOpenPublish] = useState(false)
  const [openUnpublish, setOpenUnpublish] = useState(false)
  const handlePreDeploy = async () => {
    if (!isConnected) {
      await connectAsync({ connector: connectors.find((c) => c.id == 'io.metamask') })
    }
    setOpenDeploy(true)
  }

  const handleDeploy = async (id: string) => {
    if (moment(launchpad.data?.start_date).isBefore()) {
      toast('Start time is in the past.', { type: 'error' })
      return
    }
    setIsPending(true)
    const data = await preDeploy(id)
    try {
      idRef.current && clearTimeout(idRef.current)
      idRef.current = setTimeout(() => handleDeploy(id), 100000)
      // Register PIL term
      let registerTermResponse
      switch (launchpad.data?.license_info?.termId) {
        case '1':
          const commercialUseParams = {
            currency: currencyAddress,
            mintingFee: '0',
          }
          registerTermResponse = await client.license.registerCommercialUsePIL({
            ...commercialUseParams,
            txOptions: { waitForTransaction: true },
          })
          console.log(
            `PIL Terms registered at transaction hash ${registerTermResponse.txHash}, License Terms ID: ${registerTermResponse.licenseTermsId}`
          )
          break
        case '2':
          registerTermResponse = await client.license.registerNonComSocialRemixingPIL({
            txOptions: { waitForTransaction: true },
          })
          console.log(
            `PIL Terms registered at transaction hash ${registerTermResponse.txHash}, License Terms ID: ${registerTermResponse.licenseTermsId}`
          )
          break
        case '3':
          const commercialRemixParams = {
            currency: currencyAddress,
            mintingFee: '0',
            commercialRevShare: launchpad.data?.license_info?.termId,
          }
          registerTermResponse = await client.license.registerCommercialRemixPIL({
            ...commercialRemixParams,
            txOptions: { waitForTransaction: true },
          })
          console.log(
            `PIL Terms registered at transaction hash ${registerTermResponse.txHash}, License Terms ID: ${registerTermResponse.licenseTermsId}`
          )
          break
      }

      if (registerTermResponse.licenseTermsId) {
        console.log('Attach License Terms to IP')
        try {
          const attachLicenseresponse = await client.license.attachLicenseTerms({
            licenseTermsId: registerTermResponse.licenseTermsId,
            licenseTemplate: '0x260B6CB6284c89dbE660c0004233f7bB99B5edE7',

            ipId: launchpad.data.ip_asset_id,
            txOptions: { waitForTransaction: true },
          })
          console.log(`Attached License Terms to IP at tx hash ${attachLicenseresponse.txHash}`)
        } catch (error) {
          console.log(`Attached License Terms to IP`)
          console.log(error)
        }
      }

      // Mint License
      idRef.current && clearTimeout(idRef.current)
      console.log('mint license')
      await client.license.mintLicenseTokens({
        licensorIpId: launchpad.data.ip_asset_id,
        licenseTermsId: registerTermResponse.licenseTermsId,
        amount: launchpad.data.max_supply,
        receiver: address,
      })
      console.log(`License minted`)
      const hash = await writeContractAsync({
        abi: abi,
        address: launchpadContractAddress,
        functionName: 'createLaunchpad',
        args: [
          [
            address,
            launchpad.data?.ip_asset_id,
            launchpad.data?.name,
            moment(launchpad.data?.start_date).unix().toString(),
            moment(launchpad.data?.end_date).unix().toString(),
            launchpad.data?.max_supply,
            launchpad.data?.max_mint_per_address,
          ],
          [
            zeroAddress,
            usdtAddress, // usdt address
            launchpad.data?.mint_price,
            `${data?.metadataContractURI}/`,
            `${data?.metadataURIBase}/`,
            '0',
            address,
          ],
        ],
      })

      if (hash) {
        await postDeploy(id, hash)
        setOpenDeploy(false)
        toast('Deployed', { type: 'success' })
        router.push('/profile/launchpad')
      }
      setIsPending(false)
    } catch (error) {
      setIsPending(false)
      console.error(error)
      idRef.current && clearTimeout(idRef.current)
      toast(
        error?.message?.includes('last nft sale should be end')
          ? 'This license is being used for an ongoing launchpad'
          : 'Something went wrong',
        { type: 'error' }
      )
    }
  }

  const handlePublish = async (id: string) => {
    const res = await publish(id)
    if (res) {
      setOpenPublish(false)
      toast('Published', { type: 'success' })
      router.push('/profile/launchpad')
    }
  }

  const handleUnpublish = async (id: string) => {
    const res = await unpublish(id)
    if (res) {
      setOpenUnpublish(false)
      toast('Unpublished', { type: 'success' })
      router.push('/profile/launchpad')
    }
  }

  const handleDelete = async (id: string) => {
    const res = await deleteLaunchpad(id)
    if (res) {
      setOpenDelete(false)
      toast('Deleted', { type: 'success' })
      router.push('/profile/launchpad')
    }
  }

  const genButtons = (status: string) => {
    switch (LaunchpadStatus[status]) {
      case LaunchpadStatus.DRAFT:
        return (
          <>
            <Button
              size='sm'
              color='dark'
              className='flex-1'
              onClick={() => {
                handlePreDeploy()
              }}>
              {t('Deploy')}
            </Button>
            <Button
              size='sm'
              color='dark'
              className='flex-1'
              onClick={() => router.push(`/profile/launchpad/${launchpad.data?.id}/edit`)}>
              {t('Edit')}
            </Button>
            <Button
              variant='outlined'
              size='sm'
              color='dark'
              className='flex-1 px-0'
              onClick={() => setOpenDelete(true)}>
              <Image src={ic_trash} alt={'ic_trash'} />
            </Button>
            <Modal open={openDeploy} setOpen={() => setOpenDeploy(false)}>
              <div className='p-6 flex flex-col items-center gap-6'>
                <p className='text-xl font-bold text-[#414141]'>Deploy launchpad</p>
                <div className='flex flex-col items-center'>
                  <div className='inline-block'>
                    <p className='text-sm font-normal inline'>Please confirm to deploy</p>{' '}
                    <p className='text-[#1FAB5E] inline'>{launchpad.data?.name}.</p>
                  </div>
                  <p className='text-sm font-normal'>After deploying, only the description and images can be edited</p>
                </div>
                <Button
                  size='sm'
                  color='dark'
                  className='px-8'
                  loading={isPending}
                  onClick={() => handleDeploy(id as string)}>
                  {t('Confirm')}
                </Button>
              </div>
            </Modal>
            <Modal open={openDelete} setOpen={() => setOpenDelete(false)}>
              <div className='py-6 px-10 flex flex-col items-center gap-6'>
                <p className='text-xl font-bold text-[#414141]'>Delete launchpad</p>
                <div className='flex flex-col items-center'>
                  <div className='inline-block text-sm font-normal'>
                    <p className='inline'>Are you sure to delete</p>{' '}
                    <p className='text-[#1FAB5E] inline'>{launchpad.data?.name}</p>?
                  </div>
                  <p className='text-sm font-normal'>This process is irreversible.</p>
                </div>
                <Button size='sm' color='dark' className='px-8' onClick={() => handleDelete(id as string)}>
                  {t('Confirm')}
                </Button>
              </div>
            </Modal>
          </>
        )
      case LaunchpadStatus.READY_TO_MINT:
        return (
          <>
            <Button
              size='sm'
              color='dark'
              className='flex-1'
              onClick={() => router.push(`/profile/launchpad/${launchpad.data?.id}/edit`)}>
              {t('Edit')}
            </Button>
            <Button size='sm' color='dark' className='flex-1' onClick={() => setOpenPublish(true)}>
              {t('Publish')}
            </Button>
            <Modal open={openPublish} setOpen={() => setOpenPublish(false)}>
              <div className='p-6 flex flex-col items-center gap-6'>
                <p className='text-xl font-bold text-[#414141]'>Publish launchpad</p>
                <div className='flex flex-col items-center'>
                  <div className='inline-block text-sm font-normal'>
                    <p className='inline'>Sure to publish</p>{' '}
                    <p className='text-[#1FAB5E] inline'>{launchpad.data?.name}</p>?
                  </div>
                  <p className='text-sm font-normal'>This launchpad will be shown on the mainsite once you confirm.</p>
                </div>
                <Button size='sm' color='dark' className='px-8' onClick={() => handlePublish(id as string)}>
                  {t('Confirm')}
                </Button>
              </div>
            </Modal>
          </>
        )
      case LaunchpadStatus.PUBLISHED:
        return (
          <>
            <Button size='sm' color='dark' onClick={() => setOpenUnpublish(true)}>
              {t('Unpublish')}
            </Button>
            <Button size='sm'>
              <Link href={`/launchpad/${launchpad.data?.id}`}>View launchpad</Link>
            </Button>
            <Modal open={openUnpublish} setOpen={() => setOpenUnpublish(false)}>
              <div className='p-6 flex flex-col items-center gap-6'>
                <p className='text-xl font-bold text-[#414141]'>Unpublish launchpad</p>
                <div className='flex flex-col items-center'>
                  <div className='inline-block text-sm font-normal'>
                    <p className='inline'>Sure to unpublish</p>{' '}
                    <p className='text-[#1FAB5E] inline'>{launchpad.data?.name}</p>{' '}
                    <p className='inline'>from Mainsite?</p>
                  </div>
                  <p className='text-sm font-normal'>You can edit the launchpad when it’s unpublished.</p>
                </div>
                <Button size='sm' color='dark' className='px-8' onClick={() => handleUnpublish(id as string)}>
                  {t('Confirm')}
                </Button>
              </div>
            </Modal>
          </>
        )
    }
  }

  const copyAddress = async () => {
    navigator.clipboard.writeText(launchpadContractAddress)
    setIsCopied(true)
    _.debounce(() => {
      _.delay(() => setIsCopied(false), 3000)
    }, 1000)()
  }

  return (
    <>
      <Header />
      <div className='pk-container'>
        <div className='flex flex-col gap-6 bg-white rounded-mlg mt-10 p-6'>
          <div className='flex justify-between'>
            <div className='sticky top-8 pb-5 flex flex-col gap-3'>
              <div className='text-base flex items-center gap-3 leading-5 font-bold md:text-2xl md:leading-[18px] md:font-extrabold whitespace-nowrap'>
                {launchpad.data?.name}
                <span
                  className={`text-sm py-0.5 px-3 rounded-md font-medium ${
                    launchpad.data?.status == 'PUBLISHED'
                      ? 'bg-emerald-200 text-text-success-primary'
                      : 'text-text-info-primary bg-blue-200'
                  }`}>
                  {LaunchpadStatus[launchpad.data?.status]}
                </span>
              </div>
              {launchpad.data?.status !== 'DRAFT' && (
                <div className='flex gap-2'>
                  <p className='text-[#414141] text-sm'>Launchpad contract address:</p>
                  <div
                    className='flex gap-2 cursor-pointer justify-between items-center text-second-color text-sm font-medium  relative'
                    onClick={copyAddress}>
                    <div>{`${shorten(launchpadContractAddress, 8, 8)}`}</div>
                    <span
                      className={`transition-all w-fit mr-2 absolute -top-full right-[20px] text-xs bg-light-gray py-1 px-2 border rounded-md ${
                        isCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}>
                      {t('Copied')}
                    </span>
                    <Image src={CopySvg} alt='' />
                  </div>
                </div>
              )}
            </div>
            <div className='flex gap-6 h-fit'>{genButtons(launchpad.data?.status)}</div>
          </div>
          <div className='border rounded-2xl border-[#DEDEDE] p-6 flex flex-col gap-6'>
            <div className='text-sm text-[#61646B]'>{launchpad.data?.description}</div>
            <Divider />
            <div className='grid grid-cols-7 divide-x'>
              <div className='flex flex-col'>
                <p className='text-xs text-[#61646B]'>{t('Type')}</p>
                <p className='text-sm text-[#414141] font-semibold'>
                  {launchpad?.data?.license_info?.termId == 1
                    ? 'Commercial Use'
                    : launchpad?.data?.license_info?.termId == 2
                    ? 'Non-Commercial Social Remixing'
                    : 'Commercial Remix'}
                </p>
                {launchpad.data?.license_info?.termId == 3 && (
                  <p className='text-xs'>{`${launchpad.data.license_info.commercialRevenueShare}% revenue share`}</p>
                )}
              </div>
              <div className='flex flex-col pl-6'>
                <p className='text-xs text-[#61646B]'>{t('Start')}</p>
                <p className='text-sm text-[#414141] font-semibold'>
                  {moment(launchpad.data?.start_date).format('HH:mm yyyy-MM-DD')}
                </p>
              </div>
              <div className='flex flex-col pl-6'>
                <p className='text-xs text-[#61646B]'>{t('End')}</p>
                <p className='text-sm text-[#414141] font-semibold'>
                  {moment(launchpad.data?.end_date).format('HH:mm yyyy-MM-DD')}
                </p>
              </div>
              <div className='flex flex-col pl-6'>
                <p className='text-xs text-[#61646B]'>{t('Max supply:')}</p>
                <p className='text-sm text-[#414141] font-semibold'>{launchpad.data?.max_supply}</p>
              </div>
              <div className='flex flex-col pl-6'>
                <p className='text-xs text-[#61646B]'>{t('IP Asset ID')}</p>
                <p className='text-sm text-[#414141] font-semibold'>{shorten(launchpad.data?.ip_asset_id)}</p>
              </div>
              <div className='flex flex-col pl-6'>
                <p className='text-xs text-[#61646B]'>{t('Max NFT /address:')}</p>
                <p className='text-sm text-[#414141] font-semibold'>{launchpad.data?.max_mint_per_address}</p>
              </div>
              <div className='flex flex-col pl-6'>
                <p className='text-xs text-[#61646B]'>{t('Price')}:</p>
                <p className='text-sm text-[#414141] font-semibold'>
                  {`${BigNumber(launchpad.data?.mint_price || 0).div(BigNumber(10).pow(18))}`} USDT
                </p>
              </div>
            </div>
          </div>
          <div className='flex gap-20'>
            <div className='border border-light-medium-gray rounded-[16px] p-6 min-w-[400px]'>
              <div className='flex gap-2 items-center border-b border-[#F0F0F0] pb-3'>
                <span className='text-[#1C1C1C] font-semibold text-sm'>NFTs image</span>
                <Tooltip title='The name given to the image file will be the name of the NFT.' placement='top-start'>
                  <Image src={ic_question_circle} alt='ic_question_circle' className='cursor-pointer' />
                </Tooltip>
              </div>
              <div className='py-3 flex flex-col gap-3'>
                <div className='h-[184px] overflow-y-scroll'>
                  <div className='grid grid-cols-1 gap-3 pr-2'>
                    {launchpad.data?.nft_images.map((nftUrl: string, idx: number) => {
                      return (
                        <div
                          key={idx}
                          className='py-2 px-4 bg-[#F2F2F2] rounded-[10px] flex justify-between items-center'>
                          <p className='text-[#61646B] font-normal text-sm'>{getFileNameFromURL(nftUrl)}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex gap-10 flex-1'>
                <div className='flex flex-col gap-2'>
                  <p className='text-[#414141] text-sm font-semibold'>Thumbnail image (4:3)</p>
                  <UploadImage
                    id='thumbnail'
                    height='104px'
                    width='158px'
                    disabled={true}
                    imgUrl={launchpad.data?.thumbnail_url}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-[#414141] text-sm font-semibold'>Featured images (1:1)</p>
                  <div className='flex gap-5'>
                    {launchpad.data?.featured_images.map((imgUrl: string, idx: number) => (
                      <UploadImage key={idx} disabled={true} imgUrl={imgUrl} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
