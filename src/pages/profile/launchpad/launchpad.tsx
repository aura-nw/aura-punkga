import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@mui/material'
import Mascot from 'assets/images/mascot.png'
import Footer from 'components/Footer'
import Header from 'components/Header'
import _ from 'lodash'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MainButton from '../../../components/Button/MainButton'
import TextField from '../../../components/Input/TextField'
import FilledSelect from '../../../components/Select/FilledSelect'
import { LaunchpadStatus } from '../../../constants/constants'
import { Context } from '../../../context'
import useApi from '../../../hooks/useApi'
import { LaunchpadType, getListLaunchpads } from './with-api'
import SearchIcon from 'assets/images/icons/search.svg'

export default function Page(props) {
    if (props.justHead) {
        return <></>
    }
    return <Launchpad {...props} />
}

function Launchpad() {
    const { account } = useContext(Context)
    const listLaunchpads = useApi<any>(getListLaunchpads, true, [])
    const [listLaunchpadData, setListLaunchpadData] = useState<LaunchpadType[]>([])
    const { t } = useTranslation()
    const router = useRouter()
    const ref = useRef<any>()
    const [searchValue, setSearchValue] = useState('')
    const [status, setStatus] = useState<{ key: string; value: string }>({
        key: 'All status',
        value: t('All status'),
    })

    useEffect(() => {
        const newData = listLaunchpads?.data?.filter((item) => {
            if (status.key === 'All status') {
                return item.name.toLowerCase().includes(searchValue.toLowerCase())
            } else {
                return item.name.toLowerCase().includes(searchValue.toLowerCase()) && LaunchpadStatus[item.status] === status.value
            }
        }) ?? [];
        setListLaunchpadData(newData);
    }, [searchValue, status]);

    useEffect(() => {
        setListLaunchpadData(listLaunchpads?.data ?? [])
    }, [listLaunchpads?.data]);

    useEffect(() => {
        if (!account) router.push('/')
    }, [account])

    if (!account) return <></>

    return (
        <>
            <Header />
            <div className='pk-container'>
                <div className='flex flex-col'>
                    <div className='sticky top-8 bg-white pt-16 pb-6'>
                        <div className='flex items-center justify-between flex-wrap'>
                            <div className='text-base leading-5 font-bold md:text-2xl md:leading-[18px] md:font-extrabold whitespace-nowrap'>
                                {t('Launchpad')} <span className=''>{` (${listLaunchpads?.data?.length ?? 0})`}</span>
                            </div>

                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <div className='flex justify-between'>
                            <div className='flex gap-3'>
                                <TextField
                                    inputref={ref}
                                    onChange={_.debounce(setSearchValue, 500)}
                                    className="!w-[290px] bg-light-gray"
                                    size='lg'
                                    placeholder={t('Search by launchpad name')}
                                    leadingComponent={
                                        <Image
                                            src={SearchIcon}
                                            className='w-[22px] h-[22px]'
                                            alt=''
                                        />
                                    }
                                />
                                <FilledSelect
                                    label=''
                                    className='text-[#333333] h-full rounded-[20px] min-w-[250px]'
                                    selected={status}
                                    onChange={setStatus}
                                    placeholder={t('Select a gender')}
                                    icon={<ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />}
                                    options={[
                                        {
                                            key: LaunchpadStatus.ALL_STATUS,
                                            value: LaunchpadStatus.ALL_STATUS,
                                        },
                                        {
                                            key: LaunchpadStatus.DRAFT,
                                            value: LaunchpadStatus.DRAFT,
                                        },
                                        {
                                            key: LaunchpadStatus.READY_TO_MINT,
                                            value: LaunchpadStatus.READY_TO_MINT,
                                        },
                                        {
                                            key: LaunchpadStatus.PUBLISHED,
                                            value: LaunchpadStatus.PUBLISHED,
                                        },
                                    ]}
                                    multiple={false}
                                />
                            </div>

                            <MainButton onClick={() => router.push('/profile/launchpad/create')}>{t('New Launchpad')}</MainButton>
                        </div>
                        <div className='bg-[#f0f0f0] rounded-[10px] '>
                            <div className='py-4 px-8 w-full h-full flex flex-col'>
                                <div className='flex px-[18px] py-[11px] border-b-[1px] border-medium-gray text-subtle-dark font-bold text-sm leading-[18px]'>
                                    <div className='w-[56px] mr-14'>No.</div>
                                    <div className='w-[200px] flex-1'>Launchpad</div>
                                    <div className='w-[200px] flex-1'>License ID</div>
                                    <div className='w-[200px] flex-1'>Status</div>
                                    <div className='w-[200px] flex-1'>Start</div>
                                    <div className='w-[200px] flex-1'>End</div>
                                    <div className='flex-1 text-end'>Last Update</div>
                                </div>
                                {listLaunchpadData?.length > 0 ? (
                                    <div className='flex flex-col gap-3 mt-3'>
                                        {
                                            listLaunchpadData?.map((launchpad: LaunchpadType, idx: number) => {
                                                return (
                                                    <div key={idx} className='flex items-center px-[18px] py-[11px] text-subtle-dark text-sm leading-[18px] bg-white rounded-[10px]'>
                                                        <div className='w-[56px] mr-14'>{idx + 1}</div>
                                                        <div className='w-[200px] flex-1'>
                                                            <Tooltip title={launchpad.name} placement="top-start">
                                                                <Link href={`/profile/launchpad/${launchpad.id}`} className='pr-1 overflow-hidden text-ellipsis whitespace-nowrap'>
                                                                    {launchpad.name}
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        <div className='w-[200px] flex-1'>{launchpad.license_token_id}</div>
                                                        <div className='w-[200px] flex-1'>{LaunchpadStatus[launchpad.status]}</div>
                                                        <div className='w-[200px] flex-1'>{moment(launchpad.start_date).format('HH:mm yyyy-MM-DD')}</div>
                                                        <div className='w-[200px] flex-1'>{moment(launchpad.end_date).format('HH:mm yyyy-MM-DD')}</div>
                                                        <div className='flex-1 text-end'>{moment(launchpad.updated_at).format('HH:mm yyyy-MM-DD')}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ) : (
                                    <div className='flex justify-center p-4'>
                                        <div className='flex flex-col gap-10'>
                                            <Image src={Mascot} alt='mascot' />
                                            <div className='flex flex-col gap-2 items-center'>
                                                <span className='text-[#414141] text-[20px] font-bold leading-[25px]'>Have not lauchpad now</span>
                                                <MainButton onClick={() => router.push('/profile')}>{t('Create new Launchpad')}</MainButton>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
