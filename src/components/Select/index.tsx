import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
interface ISelect {
  selected?: { key: string | number; value: string }
  onChange?: (selected: { key: string | number; value: string }) => void
  icon?: JSX.Element
  options: { key: string | number; value: string }[]
  label?: string
  placeholder?: string
  className?: string
}
export default function Select({
  onChange,
  selected,
  icon = <ChevronDownIcon className='h-5 w-5 text-medium-gray' aria-hidden='true' />,
  options,
  label,
  placeholder,
  className,
}: ISelect) {
  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        onChange && onChange(value)
      }}>
      {({ open }) => (
        <>
          <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>{label}</Listbox.Label>
          <div className='relative'>
            <Listbox.Button className='relative w-full cursor-default rounded-[8px] bg-white py-[1px] md:py-[7px] pl-[10px] pr-[57px] text-left text-gray-900 focus:outline-none text-sm leading-6 lg:h-10 border border-medium-gray font-normal'>
              <span className={`flex items-center text-[14px] leading-[24px] ${className}`}>
                {selected?.key ? (
                  <span className='block truncate font-normal md:font-bold'>{selected.value}</span>
                ) : (
                  <span className='block truncate text-medium-gray font-normal md:font-bold'>{placeholder}</span>
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
              <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full min-w-fit whitespace-nowrap rounded-[12px] overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {options.map((option) => (
                  <Listbox.Option
                    key={option.key}
                    className={({ active }) =>
                      classNames(
                        option.key == selected?.key ? 'bg-primary-color' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-16'
                      )
                    }
                    value={option}>
                    {({ selected: s, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={classNames(
                              option.key == selected?.key ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate text-sm md:text-base'
                            )}>
                            {option.value}
                          </span>
                        </div>

                        {option.key == selected?.key ? (
                          <span className={'text-black absolute inset-y-0 right-0 flex items-center pr-4'}>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
