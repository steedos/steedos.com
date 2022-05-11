import Link from 'next/link'
import { VersionSwitcher } from '@/components/VersionSwitcher'
import { Search } from '@/components/Search'
import clsx from 'clsx'
import Router from 'next/router'
import { Logo } from '@/components/Logo'
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition, Menu } from '@headlessui/react'
import { MenuIcon, SearchIcon, ChevronDownIcon, XIcon, LogoutIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import { headerNav } from '@/navs/header';
import useSWR from 'swr'

import { authValidate, goLogin, goLogout, goSignup } from '@/lib/auth.client';
import { getCart } from '@/lib/cart.client';

const navigation = headerNav;


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function BannerMarkMobile(props) {
  return (
    <svg fill="none" viewBox="0 0 848 513" {...props}>
      <path
        fill="#fff"
        fillOpacity={0.1}
        d="M424 0C310.94 0 240.26 56.944 212 170.811c42.4-56.944 91.86-78.295 148.4-64.054 32.266 8.114 55.311 31.686 80.836 57.777 41.552 42.489 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.295-148.4 64.054-32.245-8.114-55.311-31.686-80.836-57.777C577.212 49.193 529.088 0 424 0zM212 256.217c-113.06 0-183.74 56.944-212 170.812 42.4-56.945 91.86-78.296 148.4-64.055 32.245 8.114 55.311 31.686 80.836 57.777 41.552 42.49 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.296-148.4 64.054-32.245-8.113-55.311-31.685-80.836-57.777-41.552-42.489-89.676-91.683-194.764-91.683z"
      />
      <path
        stroke="#fff"
        strokeOpacity={0.2}
        d="M360.522 106.272l-.122.485.122-.485zm0 0c32.383 8.143 55.504 31.778 80.966 57.805l.105.107-.318.312.318-.311c20.78 21.248 43.155 44.121 73.45 61.692 30.282 17.564 68.498 29.84 120.957 29.84 56.444 0 102.26-14.213 137.486-42.595 34.73-27.982 59.217-69.776 73.424-125.433-20.822 27.449-43.355 46.428-67.609 56.898-24.842 10.723-51.456 12.503-79.823 5.358-32.389-8.15-55.544-31.819-81.032-57.872l-.039-.04.357-.35-.357.35c-20.78-21.25-43.155-44.122-73.449-61.693C514.675 12.777 476.459.5 424 .5c-56.444 0-102.26 14.213-137.486 42.595-34.73 27.982-59.217 69.776-73.424 125.434 20.822-27.45 43.355-46.429 67.609-56.898 24.842-10.723 51.456-12.504 79.823-5.359zm45.885 241.978l.286-.28-.286.28.039.04c25.488 26.053 48.643 49.722 81.032 57.872 28.367 7.145 54.981 5.365 79.823-5.358 24.254-10.47 46.787-29.449 67.609-56.898-14.207 55.657-38.694 97.452-73.424 125.433-35.226 28.382-81.042 42.595-137.486 42.595-52.459 0-90.675-12.276-120.957-29.84-30.295-17.571-52.67-40.443-73.45-61.692l-.337.329.337-.329-.039-.041c-25.488-26.053-48.643-49.722-81.032-57.872-28.367-7.145-54.98-5.364-79.823 5.359-24.254 10.469-46.787 29.448-67.609 56.898 14.207-55.657 38.694-97.452 73.424-125.434C109.74 270.93 155.556 256.717 212 256.717c52.459 0 90.675 12.277 120.957 29.841 30.295 17.57 52.67 40.443 73.45 61.692z"
      />
      <path
        stroke="url(#mark-mobile__paint0_linear)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M647.5 120c-6-4.5-13.5-12.5-13.5-12.5"
      />
      <path
        stroke="url(#mark-mobile__paint1_linear)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M212 256c11.118 0 21.598.551 31.5 1.586"
      />
      <path
        stroke="url(#mark-mobile__paint2_linear)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M632.5 255.793c-11.118 0-21.598-.551-31.5-1.586"
      />
      <defs>
        <linearGradient
          id="mark-mobile__paint0_linear"
          x1={648.5}
          x2={636.5}
          y1={119.803}
          y2={108}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="mark-mobile__paint1_linear"
          x1={220.5}
          x2={245}
          y1={256.783}
          y2={257.783}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="mark-mobile__paint2_linear"
          x1={624}
          x2={599.5}
          y1={255.01}
          y2={254.01}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
}

function BannerMarkLeft(props) {
  return (
    <svg fill="none" viewBox="0 0 848 513" {...props}>
      <path
        fill="#fff"
        fillOpacity={0.1}
        d="M424 0C310.94 0 240.26 56.944 212 170.811c42.4-56.944 91.86-78.295 148.4-64.054 32.266 8.114 55.311 31.686 80.836 57.777 41.552 42.489 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.295-148.4 64.054-32.245-8.114-55.311-31.686-80.836-57.777C577.212 49.193 529.088 0 424 0zM212 256.217c-113.06 0-183.74 56.944-212 170.812 42.4-56.945 91.86-78.296 148.4-64.055 32.245 8.114 55.311 31.686 80.836 57.777 41.552 42.49 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.296-148.4 64.054-32.245-8.113-55.311-31.685-80.836-57.777-41.552-42.489-89.676-91.683-194.764-91.683z"
      />
      <path
        stroke="#fff"
        strokeOpacity={0.2}
        d="M360.522 106.272l-.122.485.122-.485zm0 0c32.383 8.143 55.504 31.778 80.966 57.805l.105.107-.318.312.318-.311c20.78 21.248 43.155 44.121 73.45 61.692 30.282 17.564 68.498 29.84 120.957 29.84 56.444 0 102.26-14.213 137.486-42.595 34.73-27.982 59.217-69.776 73.424-125.433-20.822 27.449-43.355 46.428-67.609 56.898-24.842 10.723-51.456 12.503-79.823 5.358-32.389-8.15-55.544-31.819-81.032-57.872l-.039-.04.357-.35-.357.35c-20.78-21.25-43.155-44.122-73.449-61.693C514.675 12.777 476.459.5 424 .5c-56.444 0-102.26 14.213-137.486 42.595-34.73 27.982-59.217 69.776-73.424 125.434 20.822-27.45 43.355-46.429 67.609-56.898 24.842-10.723 51.456-12.504 79.823-5.359zm45.885 241.978l.286-.28-.286.28.039.04c25.488 26.053 48.643 49.722 81.032 57.872 28.367 7.145 54.981 5.365 79.823-5.358 24.254-10.47 46.787-29.449 67.609-56.898-14.207 55.657-38.694 97.452-73.424 125.433-35.226 28.382-81.042 42.595-137.486 42.595-52.459 0-90.675-12.276-120.957-29.84-30.295-17.571-52.67-40.443-73.45-61.692l-.337.329.337-.329-.039-.041c-25.488-26.053-48.643-49.722-81.032-57.872-28.367-7.145-54.98-5.364-79.823 5.359-24.254 10.469-46.787 29.448-67.609 56.898 14.207-55.657 38.694-97.452 73.424-125.434C109.74 270.93 155.556 256.717 212 256.717c52.459 0 90.675 12.277 120.957 29.841 30.295 17.57 52.67 40.443 73.45 61.692z"
      />
      <path
        stroke="url(#mark-left__paint0_linear)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M212 256c11.118 0 21.598.551 31.5 1.586"
      />
      <path
        stroke="url(#mark-left__paint1_linear)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M632.5 255.793c-11.118 0-21.598-.551-31.5-1.586"
      />
      <defs>
        <linearGradient
          id="mark-left__paint0_linear"
          x1={220.5}
          x2={245}
          y1={256.783}
          y2={257.783}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="mark-left__paint1_linear"
          x1={624}
          x2={599.5}
          y1={255.01}
          y2={254.01}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
}

function BannerMarkRight(props) {
  return (
    <svg fill="none" viewBox="0 0 848 513" {...props}>
      <path
        fill="#fff"
        fillOpacity={0.1}
        d="M424 0C310.94 0 240.26 56.944 212 170.811c42.4-56.944 91.86-78.295 148.4-64.054 32.266 8.114 55.311 31.686 80.836 57.777 41.552 42.489 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.295-148.4 64.054-32.245-8.114-55.311-31.686-80.836-57.777C577.212 49.193 529.088 0 424 0zM212 256.217c-113.06 0-183.74 56.944-212 170.812 42.4-56.945 91.86-78.296 148.4-64.055 32.245 8.114 55.311 31.686 80.836 57.777 41.552 42.49 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.296-148.4 64.054-32.245-8.113-55.311-31.685-80.836-57.777-41.552-42.489-89.676-91.683-194.764-91.683z"
      />
      <path
        stroke="#fff"
        strokeOpacity={0.2}
        d="M360.522 106.272l-.122.485.122-.485zm0 0c32.383 8.143 55.504 31.778 80.966 57.805l.105.107-.318.312.318-.311c20.78 21.248 43.155 44.121 73.45 61.692 30.282 17.564 68.498 29.84 120.957 29.84 56.444 0 102.26-14.213 137.486-42.595 34.73-27.982 59.217-69.776 73.424-125.433-20.822 27.449-43.355 46.428-67.609 56.898-24.842 10.723-51.456 12.503-79.823 5.358-32.389-8.15-55.544-31.819-81.032-57.872l-.039-.04.357-.35-.357.35c-20.78-21.25-43.155-44.122-73.449-61.693C514.675 12.777 476.459.5 424 .5c-56.444 0-102.26 14.213-137.486 42.595-34.73 27.982-59.217 69.776-73.424 125.434 20.822-27.45 43.355-46.429 67.609-56.898 24.842-10.723 51.456-12.504 79.823-5.359zm45.885 241.978l.286-.28-.286.28.039.04c25.488 26.053 48.643 49.722 81.032 57.872 28.367 7.145 54.981 5.365 79.823-5.358 24.254-10.47 46.787-29.449 67.609-56.898-14.207 55.657-38.694 97.452-73.424 125.433-35.226 28.382-81.042 42.595-137.486 42.595-52.459 0-90.675-12.276-120.957-29.84-30.295-17.571-52.67-40.443-73.45-61.692l-.337.329.337-.329-.039-.041c-25.488-26.053-48.643-49.722-81.032-57.872-28.367-7.145-54.98-5.364-79.823 5.359-24.254 10.469-46.787 29.448-67.609 56.898 14.207-55.657 38.694-97.452 73.424-125.434C109.74 270.93 155.556 256.717 212 256.717c52.459 0 90.675 12.277 120.957 29.841 30.295 17.57 52.67 40.443 73.45 61.692z"
      />
      <path
        stroke="url(#mark-right__paint0_linear)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M148.4 362.974c-20.178-5.082-39.454-5.631-57.83-1.648"
      />
      <defs>
        <linearGradient
          id="mark-right__paint0_linear"
          x1={106.175}
          x2={151.193}
          y1={360.811}
          y2={362.062}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [cart, setCart] = useState({lines: []})

  useSWR('AuthValidate', async () => {
    const userInfo = await authValidate();
    if (!userInfo.error) {
      setUserInfo(userInfo)
    } else {
      setUserInfo({})
    }
  })

  useSWR('cart', async () => {
    const cart = await getCart();
    if (!cart.error) {
      setCart(cart)
    } else {
      setCart({lines: []})
    }
  })
  
  return (
    <>
      {/* <div className="py-2 bg-gradient-to-r from-teal-600 to-light-blue-500 overflow-hidden">
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <BannerMarkMobile className="sm:hidden absolute right-1/2 transform translate-x-[235px] translate-y-[-90px] w-[848px] h-[513px]" />
          <BannerMarkLeft className="hidden sm:block absolute right-1/2 transform translate-x-[-150px] translate-y-[-250px] w-[848px] h-[513px]" />
          <BannerMarkRight className="hidden sm:block absolute left-1/2 transform translate-x-[330px] translate-y-[-357px] w-[848px] h-[513px]" />
          <div className="relative flex justify-center items-center">
            <div className="text-sm font-medium text-white">
            低代码DevOps平台，精彩上线
            </div>
            <span
              aria-hidden="true"
              className="hidden sm:block mx-6 h-6 w-px bg-white bg-opacity-20"
            ></span>
            <div className="ml-6 sm:ml-0">
              <Link href="/docs/deploy/devops">
                <a className="whitespace-nowrap inline-flex rounded-md bg-white py-2 px-3 text-xs font-semibold uppercase text-blue-500 hover:bg-opacity-90">
                  了解更多 &rarr;
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="focus:outline-none -m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected ? 'text-teal-600 border-teal-600' : 'text-gray-900 border-transparent',
                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium focus:outline-none '
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel key={category.name} className="focus:outline-none pt-10 pb-8 px-4 space-y-10">
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative text-sm">
                            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                            </div>
                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                              <span className="absolute z-10 inset-0" aria-hidden="true" />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              {/* {item.imageAlt} */}
                            </p>
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                            <a href={section.href}>{section.name}</a>
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a href={item.href} className="-m-2 p-2 block text-gray-500">
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.href} target={page.target} className="-m-2 p-2 block font-medium text-gray-900">
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>
              {!userInfo.name && <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900" onClick={goLogin}>
                    登录
                  </a>
                </div>
                <div className="flow-root">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900" onClick={goSignup}>
                    创建账户
                  </a>
                </div>
              </div>}


              {/* <div className="border-t border-gray-200 py-6 px-4">
                <a href="#" className="-m-2 p-2 flex items-center">
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="w-5 h-auto block flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div> */}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="bg-opacity-90 backdrop-filter backdrop-blur-md backdrop-saturate-150 sticky z-20 lg:z-50 relative bg-white inset-0 flex-none text-sm font-medium ring-1 ring-gray-900 ring-opacity-5 shadow-sm">
       
        <nav aria-label="Top" className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Steedos Platform</span>
                  <Logo className="w-auto h-10" />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-4">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-teal-600 text-teal-600'
                                  : 'border-transparent hover:border-teal-600 hover:text-teal-600 text-gray-700 hover:text-gray-800',
                                'px-2 relative z-10 flex items-center transition-colors ease-out duration-200 text-base font-medium border-b-2 -mb-px pt-px'
                              )}
                            >
                              <span>{category.name}</span>
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                          <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                            <div className="relative bg-white">
                              <div className="max-w-8xl mx-auto px-8">
                                <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-center object-cover"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute z-10 inset-0" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            {/* {item.imageAlt} */}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.id}-heading`} className="font-medium text-gray-900">
                                            <a href={section.href}>{section.name}</a>
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.id}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      target={page.target}
                      className="px-2 flex items-center text-base font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {!userInfo.name && <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800" onClick={goLogin}>
                    登录
                  </a>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800" onClick={goSignup}>
                    创建账户
                  </a>
                </div>}
                {/* <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="text-gray-700 hover:text-gray-800 flex items-center">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="w-5 h-auto block flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div> */}

                

                {userInfo.name && <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center text-gray-700 hover:text-gray-800 w-full px-4 py-2 text-sm font-medium rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {userInfo.name}
                      <ChevronDownIcon
                        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          <button
                            onClick={goLogout}
                            className={`text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            <LogoutIcon
                              className="w-5 h-5 mr-2 text-violet-400"
                              aria-hidden="true"
                            />
                            注销
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                }
                {/* Cart */}
                {userInfo.name && <div className="ml-4 flow-root lg:ml-6">
                  <a href="/store/shopping-cart" className="group -m-2 p-2 flex items-center">
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart?.lines?.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
                }
              </div>
            </div>
          </div>
        </nav>
      </header>



      {/* <div className="sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-white flex-none flex">
        <div className="flex-none pl-4 sm:pl-6 xl:pl-8 flex items-center border-b border-gray-200 lg:border-b-0 lg:w-60 xl:w-72">
          <Link href="/">
            <a
              className="overflow-hidden w-10 md:w-auto"
              onContextMenu={(e) => {
                e.preventDefault()
                Router.push('/brand')
              }}
            >
              <span className="sr-only">Tailwind CSS home page</span>
              <Logo className="w-auto h-6" />
            </a>
          </Link>
        </div>
        <div className="flex-auto border-b border-gray-200 h-18 flex items-center justify-between px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
          <Search />
          <div className="lg:w-64 pl-8 flex-shrink-0 flex items-center justify-end space-x-6">
            <VersionSwitcher className="hidden lg:block" />
            <a
              href="https://github.com/tailwindlabs/tailwindcss"
              className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <span className="sr-only">Tailwind CSS on GitHub</span>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div> */}

    </>
  )
}
