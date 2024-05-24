import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
interface IFilledSelect {
  multiple?: boolean
  onChange?: any
  icon?: JSX.Element
  leadingIcon?: JSX.Element
  options: ({ key: string; value: string } | { key: number; value: string })[]
  placeholder: string
  className?: string
  allKey?: string
  label: string
  selected?: any
}
export default function FilledSelect({
  onChange,
  icon = <ChevronDownIcon className='h-5 w-5 text-subtle-dark' aria-hidden='true' />,
  leadingIcon,
  options,
  placeholder,
  selected,
  multiple,
  allKey,
  label,
  className,
}: IFilledSelect) {
  const { t } = useTranslation()
  if (multiple) {
    const selectedKey = selected.map((s) => s.key)
    const isTooLong = selectedKey.join('').length > 30
    return (
      <Listbox
        multiple={true}
        value={selected}
        onChange={(value: any[]) => {
          if (onChange) {
            if (value.at(-1).key == allKey) {
              onChange([value.find((s) => s.key == allKey)])
            } else {
              const newValue = value
                .filter((s) => s.key != allKey)
                .filter((value, index, self) => self.filter((t) => t.key === value.key).length % 2)
                .filter((value, index, self) => index === self.findIndex((t) => t.key === value.key))
              newValue.length ? onChange(newValue) : onChange([options.find((s) => s.key == allKey)])
            }
          }
        }}>
        {({ open }) => (
          <>
            <div className='relative'>
              <Listbox.Button className={`${className} relative cursor-pointer w-full rounded-[12px] bg-light-gray py-[3px] px-[13px] text-left text-gray-900 focus:outline-none flex items-center gap-[15px]`}>
                {leadingIcon && <span className=''>{leadingIcon}</span>}
                <span className='flex items-center text-[16px] leading-[24px]'>
                  {!!selected.length ? (
                    isTooLong ? (
                      <span className='block truncate text-subtle-dark'>
                        {`${selected.map((s) => s.value).length} ${t(`selected ${label}`)}`}
                      </span>
                    ) : (
                      <span className='block truncate text-subtle-dark'>{selected.map((s) => s.value).join(', ')}</span>
                    )
                  ) : (
                    <span className='block truncate text-subtle-dark'>{placeholder}</span>
                  )}
                </span>
                <span className=''>{icon}</span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                enter='transition ease-in duration-100'
                enterFrom='opacity-0'
                enterTo='opacity-100'>
                <Listbox.Options className='top-9 right-0 absolute z-10 mt-1 max-h-56 w-fit max-w-[300px] whitespace-nowrap rounded-[12px] overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {options.map((option) => {
                    return (
                      <Listbox.Option
                        key={option.key}
                        className={() =>
                          classNames(
                            selectedKey.includes(option.key) ? 'bg-primary-color' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-16'
                          )
                        }
                        value={option}>
                        {() => {
                          return (
                            <>
                              <div className='flex items-center'>
                                <span
                                  className={classNames(
                                    selectedKey.includes(option.key) ? 'font-semibold' : 'font-normal',
                                    'ml-3 block truncate'
                                  )}>
                                  {option.value}
                                </span>
                              </div>

                              {selectedKey.includes(option.key) ? (
                                <span className={'text-black absolute inset-y-0 right-0 flex items-center pr-4'}>
                                  <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                </span>
                              ) : null}
                            </>
                          )
                        }}
                      </Listbox.Option>
                    )
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    )
  }
  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        onChange && onChange(value)
      }}>
      {({ open }) => (
        <>
          <div className='relative'>
            <Listbox.Button className={`${className} relative w-full cursor-default rounded-[12px] bg-light-gray py-[3px] pl-[13px] pr-[57px] text-left text-gray-900 focus:outline-none`}>
              <span className='flex items-center text-[16px] leading-[24px]'>
                {selected ? (
                  <span className='block truncate text-subtle-dark'>{selected.value}</span>
                ) : (
                  <span className='block truncate text-subtle-dark'>{placeholder}</span>
                )}
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>{icon}</span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              enter='transition ease-in duration-100'
              enterFrom='opacity-0'
              enterTo='opacity-100'>
              <Listbox.Options className='top-9 right-0 absolute z-10 mt-1 max-h-56 w-fit max-w-[300px] rounded-[12px] overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {options.map((option) => {
                  return (
                    <Listbox.Option
                      key={option.key}
                      className={() =>
                        classNames(
                          selected.key == option.key ? 'bg-primary-color' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-16'
                        )
                      }
                      value={option}>
                      {() => {
                        return (
                          <>
                            <div className='flex items-center'>
                              <span
                                className={classNames(
                                  selected.key == option.key ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate'
                                )}>
                                {option.value}
                              </span>
                            </div>

                            {selected.key == option.key ? (
                              <span className={'text-black absolute inset-y-0 right-0 flex items-center pr-4'}>
                                <CheckIcon className='h-5 w-5' aria-hidden='true' />
                              </span>
                            ) : null}
                          </>
                        )
                      }}
                    </Listbox.Option>
                  )
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
