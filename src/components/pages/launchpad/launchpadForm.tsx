import { FormControl, FormHelperText, Tooltip } from '@mui/material';
import BigNumber from 'bignumber.js';
import { isBefore } from "date-fns";
import vi from 'date-fns/locale/vi';
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, forwardRef, useEffect, useRef, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import ic_close from "src/assets/images/icons/ic_close.svg";
import ic_calendar from "src/assets/images/icons/ic_gray_calendar.svg";
import ic_question_circle from "src/assets/images/icons/ic_question_circle.svg";
import { useAccount } from 'wagmi';
import { LaunchpadStatus } from '../../../constants/constants';
import { getFileNameFromURL } from '../../../pages/profile/launchpad/[id]/launchpadDetail';
import Button from '../../Button';
import MainButton from '../../Button/MainButton';
import Footer from '../../Footer';
import Header from '../../Header';
import TextField from '../../Input/TextField';
import UploadImage from './uploadImage';

type LaunchpadFormType = {
    launchpad?: any,
    createLaunchpad?: (launchpad: any) => any
    updateLaunchpadDraft?: (id: string, launchpad: any) => any
    updateLaunchpadUnpublish?: (id: string, launchpad: any) => any
}

const minStartDate = new Date();
minStartDate.setDate(minStartDate.getDate() + 1);

function LaunchpadForm({ launchpad, createLaunchpad, updateLaunchpadDraft, updateLaunchpadUnpublish }: LaunchpadFormType) {
    const featuredImgs = launchpad?.featured_images ?? Array.from({ length: 5 });
    const isCreate = !launchpad;
    const isDraft = LaunchpadStatus[launchpad?.status] === LaunchpadStatus.DRAFT
    const isPublished = LaunchpadStatus[launchpad?.status] === LaunchpadStatus[LaunchpadStatus.PUBLISHED]

    const { address } = useAccount()
    console.log(address);

    const { t } = useTranslation()
    const router = useRouter()
    const { control, setValue, getValues, handleSubmit, clearErrors, watch } = useForm();
    const [endDate, setEndDate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [nftImages, setNftImages] = useState([]);
    const [validateStartDate, setValidateStartDate] = useState('')
    const [validateEndDate, setValidateEndDate] = useState('')
    const [validateFeatImg, setValidateFeatImg] = useState('')
    const [validateNFTImgs, setValidateNFTImgs] = useState('')
    const [minEndDate, setMinEndDate] = useState<Date | null>();

    const featuredImgsValues = watch(Array.from({ length: 5 }, (_, index) => `featured-images-${index + 1}`));

    const handleSubmitForm = () => {
        if (startDate && endDate) {
            if (isBefore(new Date(endDate), new Date(getValues("starting")))) {
                setValidateEndDate("The end date must be after the start date")
            }
        }
        if (featuredImgsValues.some((e) => !e)) {
            setValidateFeatImg('Do not leave blank')
        }

        if (nftImages.length === 0) {
            setValidateNFTImgs('Do not leave blank')
        }

        handleSubmit(async (values) => {
            if (!values.starting) {
                setValidateStartDate('Do not leave blank')
            }
            if (!values.ending) {
                setValidateEndDate('Do not leave blank')
            }
            const isInvalid = !values.starting || !values.ending || featuredImgsValues.some((e) => !e) || nftImages.length === 0

            if (isInvalid) {
                return
            }

            const formData = new FormData();
            if (values.thumbnail instanceof File) {
                formData.append("thumbnail", values.thumbnail as File, values.thumbnail?.name);
            }

            for (let i = 0; i < nftImages.length; i++) {
                if (nftImages[i].file instanceof File) {
                    formData.append('nft_images', nftImages[i].file as File, nftImages[i].file.name);
                }
            }
            for (let i = 0; i < featuredImgsValues.length; i++) {
                if (featuredImgsValues[i] instanceof File) {
                    formData.append(launchpad ? 'featured_images_url' : 'featured_images', featuredImgsValues[i] as File, featuredImgsValues[i].name);
                }
            }
            formData.append("name", values.launchpadName);
            formData.append("license_token_address", values.licenseAddress);
            formData.append("license_token_id", values.licenseId);
            formData.append("mint_price", BigNumber(values.mintPrice || 0).multipliedBy(BigNumber(10).pow(18)).toString());
            formData.append("max_supply", values.maxSupply);
            formData.append("max_mint_per_address", values.maxMintPrice);
            formData.append("start_date", moment(values.starting).toISOString());
            formData.append("end_date", moment(values.ending).toISOString());
            formData.append("description", values.description);
            try {
                if (!launchpad) {
                    formData.append("creator_address", address);
                    await createLaunchpad(formData)
                } else {
                    formData.append("thumbnail_url", values.thumbnail);
                    nftImages.forEach((img) => {
                        formData.append('nft_images_url', img.imgUrl);
                    })
                    featuredImgsValues.forEach((imgUrl, index) => {
                        formData.append('featured_images_url', imgUrl);
                    })
                    if (launchpad?.status === 'DRAFT') {
                        await updateLaunchpadDraft(launchpad?.id, formData)
                    } else {
                        await updateLaunchpadUnpublish(launchpad?.id, formData)
                    }
                }
                toast(launchpad ? 'Saved' : 'Created', { type: 'success' })
                router.push('/profile/launchpad')
            } catch (error) {
                toast('An error ocurred, please try again', { type: 'error' })
            }
        })()
    };

    useEffect(() => {
        if (startDate) {
            setValidateStartDate('')
            const minDate = new Date(startDate);
            minDate.setDate(minDate.getDate() + 1);
            setMinEndDate(minDate);
        }
        if (endDate) {
            setValidateEndDate('')
        }
    }, [startDate, endDate])

    useEffect(() => {
        const hasValue = featuredImgsValues.every(img => img);
        if (hasValue) {
            setValidateFeatImg('')
        }
    }, [featuredImgsValues]);

    useEffect(() => {
        if (nftImages.length > 0) {
            setValidateNFTImgs('')
        }
    }, [nftImages]);

    useEffect(() => {
        const data = launchpad?.nft_images?.map((e, idx) => ({
            id: idx + 1,
            imgUrl: e,
            name: getFileNameFromURL(e),
            file: null
        })) ?? []
        setNftImages(data)
    }, [launchpad?.nft_images]);

    useEffect(() => {
        if (launchpad) {
            setValue('launchpadName', launchpad?.name)
            setValue('licenseAddress', launchpad?.license_token_address)
            setValue('licenseId', launchpad?.license_token_id)
            setValue('mintPrice', launchpad?.mint_price)
            setValue('maxSupply', launchpad?.max_supply)
            setValue('maxMintPrice', launchpad?.max_mint_per_address)
            setValue('starting', launchpad?.start_date)
            setValue('ending', launchpad?.end_date)
            setValue('description', launchpad?.description)
            setValue('thumbnail', launchpad?.thumbnail_url)
            launchpad?.featured_images.forEach((img, index) => {
                setValue(`featured-images-${index + 1}`, img)
            })
        }
    }, [launchpad])

    return (
        <>
            <Header />
            <div className='pk-container'>
                <div className='flex flex-col'>
                    <div className='bg-white pt-16 pb-6'>
                        <div className='text-base leading-5 font-bold md:text-2xl md:leading-[18px] md:font-extrabold whitespace-nowrap'>
                            {t(`${isCreate ? 'Create' : 'Edit'} launchpad`)}
                        </div>
                    </div>
                    <div className="bg-[#F0F0F0] rounded-[10px] py-6 px-10 flex gap-16">
                        <div className='flex flex-col justify-between'>
                            <div className="flex flex-col gap-8 w-[376px]">
                                <div className="flex flex-col gap-2">
                                    <LabelInput>Launchpad name</LabelInput>
                                    <Controller
                                        name="launchpadName"
                                        control={control}
                                        defaultValue={""}
                                        rules={{
                                            required: "Do not leave blank",
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl error={!!error}>
                                                <TextField
                                                    {...field}
                                                    className={`h-10 ${!isCreate && !isDraft ? 'bg-[#ABABAB]' : ''}`}
                                                    disabled={!isCreate && !isDraft}
                                                    size='sm'
                                                    placeholder={t('Enter collection name')}
                                                />
                                                <FormHelperText>{error?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <LabelInput>License address</LabelInput>
                                    <Controller
                                        name="licenseAddress"
                                        control={control}
                                        defaultValue={""}
                                        rules={{
                                            required: "Do not leave blank",
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl error={!!error}>
                                                <TextField
                                                    {...field}
                                                    className={`h-10 ${!isCreate && !isDraft ? 'bg-[#ABABAB]' : ''}`}
                                                    disabled={!isCreate && !isDraft}
                                                    size='sm'
                                                    placeholder={t('Enter an address')}
                                                />
                                                <FormHelperText>{error?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <LabelInput>License token ID</LabelInput>
                                    <Controller
                                        name="licenseId"
                                        control={control}
                                        defaultValue={""}
                                        rules={{
                                            required: "Do not leave blank",
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl error={!!error}>
                                                <TextField
                                                    {...field}
                                                    className={`h-10 ${!isCreate && !isDraft ? 'bg-[#ABABAB]' : ''}`}
                                                    disabled={!isCreate && !isDraft}
                                                    size='sm'
                                                    placeholder={t('Enter an ID')}
                                                />
                                                <FormHelperText>{error?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <LabelInput>Price</LabelInput>
                                    <Controller
                                        name="mintPrice"
                                        control={control}
                                        defaultValue={""}
                                        rules={{
                                            required: "Do not leave blank",
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl error={!!error}>
                                                <TextField
                                                    {...field}
                                                    className={`h-10 ${!isCreate && !isDraft ? 'bg-[#ABABAB]' : ''}`}
                                                    disabled={!isCreate && !isDraft}
                                                    size='sm'
                                                    placeholder={t('Enter price per mint')}
                                                    trailingComponent={<span>USDT</span>}
                                                />
                                                <FormHelperText>{error?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />

                                </div>
                                <div className="flex flex-col gap-2">
                                    <LabelInput>Max supply</LabelInput>
                                    <Controller
                                        name="maxSupply"
                                        control={control}
                                        defaultValue={""}
                                        rules={{
                                            required: "Do not leave blank",
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl error={!!error}>
                                                <TextField
                                                    {...field}
                                                    className={`h-10 ${!isCreate && !isDraft ? 'bg-[#ABABAB]' : ''}`}
                                                    disabled={!isCreate && !isDraft}
                                                    size='sm'
                                                    type='number'
                                                    placeholder={t('Enter token quantity')}
                                                />
                                                <FormHelperText>{error?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <LabelInput>Max NFTs minted per address</LabelInput>
                                    <Controller
                                        name="maxMintPrice"
                                        control={control}
                                        defaultValue={""}
                                        rules={{
                                            required: "Do not leave blank",
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl error={!!error}>
                                                <TextField
                                                    {...field}
                                                    className={`h-10 ${!isCreate && !isDraft ? 'bg-[#ABABAB]' : ''}`}
                                                    disabled={!isCreate && !isDraft}
                                                    size='sm'
                                                    type='number'
                                                    placeholder={t('Enter token quantity')}
                                                />
                                                <FormHelperText>{error?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <LabelInput>Starting</LabelInput>
                                    <Controller
                                        name="starting"
                                        control={control}
                                        defaultValue={""}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl error={!!validateStartDate}>
                                                <DatePicker
                                                    {...field}
                                                    selected={startDate}
                                                    showTimeSelect
                                                    dateFormat="Pp"
                                                    locale={router.locale == 'vn' ? vi : ''}
                                                    dropdownMode='select'
                                                    onChange={(date) => {
                                                        setValue('starting', date)
                                                        setStartDate(date)
                                                    }}
                                                    customInput={<CustomInput value={startDate} className={`${!isCreate && !isDraft ? 'bg-[#ABABAB]' : 'bg-white'}`} />}
                                                    // minDate={minStartDate}
                                                    disabled={!isCreate && !isDraft}
                                                />
                                                <FormHelperText>{validateStartDate}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />

                                </div>

                                <div className="flex flex-col gap-2">
                                    <LabelInput>Ending</LabelInput>
                                    <Controller
                                        name="ending"
                                        control={control}
                                        defaultValue={""}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl error={!!validateEndDate}>
                                                <DatePicker
                                                    {...field}
                                                    selected={endDate}
                                                    showTimeSelect
                                                    dateFormat="Pp"
                                                    locale={router.locale == 'vn' ? vi : ''}
                                                    dropdownMode='select'
                                                    onChange={(date) => {
                                                        setValue('ending', date)
                                                        setEndDate(date)
                                                    }}
                                                    customInput={<CustomInput className={`${!isCreate && !isDraft ? 'bg-[#ABABAB]' : 'bg-white'}`} />}
                                                    minDate={minEndDate}
                                                    disabled={!isCreate && (!isDraft)}
                                                />
                                                <FormHelperText>{validateEndDate}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='flex gap-6 mt-14'>
                                <MainButton
                                    style='secondary'
                                    className='flex-1'
                                    onClick={() => router.push('/profile/launchpad')}>
                                    {t('Cancel')}
                                </MainButton>
                                <MainButton className='flex-1' onClick={handleSubmitForm}>{t(`${isCreate ? 'Create' : 'Save'}`)}</MainButton>
                            </div>
                        </div>


                        <div className='flex flex-col flex-1 gap-10'>
                            <div className="flex flex-col gap-2">
                                <LabelInput>Description</LabelInput>
                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue={""}
                                    rules={{
                                        required: "Do not leave blank",
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormControl error={!!error}>
                                            <textarea
                                                {...field}
                                                value={launchpad?.description}
                                                placeholder={t('Enter a description')}
                                                rows={4}
                                                disabled={!isCreate && isPublished}
                                                className={`${(!isCreate && isPublished) ? 'bg-[#ABABAB]' : 'bg-white'} border-none rounded-[12px] py-3 px-[10px] w-full min-h-[124px] focus:outline-none text-[12px] placeholder-[#ABABAB] placeholder:text-[16px] leading-[20px]`} />
                                            <FormHelperText>{error?.message}</FormHelperText>
                                        </FormControl>
                                    )}
                                />
                            </div>
                            <div className='bg-white rounded-[16px] p-6'>
                                <div className='flex gap-2 items-center border-b border-[#F0F0F0] pb-3'>
                                    <span className='text-[#1C1C1C] font-semibold text-sm'>NFTs image</span>
                                    <Tooltip title="The name given to the image file will be the name of the NFT." placement="top-start">
                                        <Image src={ic_question_circle} alt='ic_question_circle' className='cursor-pointer' />
                                    </Tooltip>
                                </div>
                                <div className='py-3 flex flex-col gap-3'>
                                    <div className='h-[184px] overflow-y-scroll'>
                                        <div className="grid grid-cols-2 gap-3">
                                            {nftImages.map((nft, idx) => {
                                                return (
                                                    <div key={idx} className="py-2 px-4 bg-[#F2F2F2] rounded-[10px] flex justify-between items-center">
                                                        <p className='text-[#61646B] font-normal text-sm'>{nft.name}</p>
                                                        <Button onClick={() => {
                                                            setNftImages((nftImages) => nftImages.filter((item) => item.id !== nft.id))
                                                        }}>
                                                            <Image src={ic_close} alt='ic_close' />
                                                        </Button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <FormHelperText error={!!validateNFTImgs}>{validateNFTImgs}</FormHelperText>
                                    <ButtonAddNFTImage
                                        disabled={!isCreate && isPublished}
                                        onChange={(file) => setNftImages([...nftImages, { id: nftImages[nftImages.length - 1]?.id ? nftImages[nftImages.length - 1]?.id + 1 : 1, file, name: file.name }])}
                                    />
                                </div>
                            </div>
                            <div className='flex gap-32'>
                                <div className='flex flex-col gap-2'>
                                    <LabelInput>Thumbnail image (4:3)</LabelInput>
                                    <Controller
                                        name="thumbnail"
                                        control={control}
                                        defaultValue={""}
                                        rules={{
                                            required: "Do not leave blank",
                                        }}
                                        render={({ fieldState: { error } }) => (
                                            <FormControl error={!!error}>
                                                <UploadImage
                                                    id='thumbnail'
                                                    imgUrl={launchpad?.thumbnail_url}
                                                    height='104px'
                                                    width='158px'
                                                    disabled={!isCreate && isPublished}
                                                    onChange={(file) => {
                                                        setValue('thumbnail', file)
                                                        clearErrors('thumbnail')
                                                    }} />
                                                <FormHelperText>{error?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div className='flex flex-col justify-between'>
                                    <div className='flex flex-col gap-2'>
                                        <LabelInput>Featured images (1:1)</LabelInput>
                                        <div className='flex gap-16'>
                                            {featuredImgs.map((imgUrl: string, idx: number) =>
                                                <Controller
                                                    key={idx}
                                                    name={`featured-images-${idx + 1}`}
                                                    control={control}
                                                    render={() => (<UploadImage id={`featured-images-${idx + 1}`} imgUrl={imgUrl} disabled={!isCreate && isPublished} onChange={(file) => setValue(`featured-images-${idx + 1}`, file)} />)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <FormHelperText error={!!validateFeatImg}>{validateFeatImg}</FormHelperText>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LaunchpadForm;

const CustomInput = forwardRef(({ value, onClick, className }: any, ref: any) => {
    return (
        <button
            className={`${className} relative w-full h-10 rounded-[12px] cursor-default py-[1px] md:py-[4px] pl-[10px] pr-[57px] text-left focus:outline-none text-base`}
            onClick={onClick}
            ref={ref}>
            {value && (moment(value).format('DD/MM/yyyy HH:mm'))}
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center h-full mr-[10px]'>
                <Image src={ic_calendar} alt='ic_calendar' />
            </span>
        </button>
    )
})

const ButtonAddNFTImage = forwardRef(({ onChange, disabled }: any, ref: any) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            onChange?.(file);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };
    return (
        <>
            <label
                htmlFor="add_nft_img"
                className="border border-[#ABABAB] flex justify-center rounded-[10px] text-base font-bold text-[#ABABAB] py-[10px] cursor-pointer"
            >
                + Add NFT image
            </label>
            <input
                id="add_nft_img"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none", width: "150px" }}
                type="file"
                onChange={handleFileChange}
                disabled={disabled}
            />
        </>
    )
})

const LabelInput = forwardRef(({ children }: { children: React.ReactNode }) => {
    return (
        <p className="text-[#414141] text-sm font-semibold">{children}</p>
    )
})