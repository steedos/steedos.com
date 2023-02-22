import Link from 'next/link'
import { SearchButton } from '@/components/Search'
import clsx from 'clsx'
import Router from 'next/router'
import { Logo } from '@/components/Logo'
import { useEffect, Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition, Menu } from '@headlessui/react'
import { UserIcon, CodeIcon, ChevronDownIcon, CogIcon, LogoutIcon, ShoppingBagIcon, ViewGridIcon, UserAddIcon } from '@heroicons/react/outline'
import { ThemeSelect, ThemeToggle } from './ThemeToggle'
import { headerNav } from '@/navs/header';
import useSWR from 'swr'
import { useSession, signIn, signOut } from "next-auth/react"

import { getCart } from '@/lib/cart.client';

const navigation = headerNav;
const registration_url = "https://id.steedos.cn/realms/master/protocol/openid-connect/registrations?client_id=steedos-oidc-public&redirect_uri=https://www.steedos.cn&response_type=code&ui_locales=zh_CN"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export function NavPopover({ display = 'md:hidden', className, ...props }) {
  let [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (!isOpen) return
    function handleRouteChange() {
      setIsOpen(false)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [isOpen])

  return (
    <div className={clsx(className, display)} {...props}>
      <button
        type="button"
        className="text-slate-500 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Navigation</span>
        <svg width="24" height="24" fill="none" aria-hidden="true">
          <path
            d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Dialog
        as="div"
        className={clsx('fixed z-50 inset-0', display)}
        open={isOpen}
        onClose={setIsOpen}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" />
        <div className="fixed top-4 right-4 bottom-4 left-4 bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5">
          <button
            type="button"
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Close navigation</span>
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 overflow-visible" aria-hidden="true">
              <path
                d="M0 0L10 10M10 0L0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <Tab.Group as="div" className="mt-2 h-full overflow-y-scroll">
            <div className="border-b border-gray-200">
              <Tab.List className="-mb-px flex px-4 space-x-8">
                {navigation.categories.map((category) => (
                  <Tab
                    key={category.name}
                    className={({ selected }) =>
                      classNames(
                        selected ? 'text-sky-600 border-sky-600' : 'border-transparent',
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
                        <a href={item.href} className="mt-6 block font-medium">
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
                      <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-sm">
                        <a href={section.href}>{section.name}</a>
                      </p>
                      <ul
                        role="list"
                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                        className="mt-6 flex flex-col space-y-6"
                      >
                        {section.items.map((item) => (
                          <li key={item.name} className="flow-root">
                            <a href={item.href} className="-m-2 p-2 block">
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
          {/* {!userInfo.name && <div className="border-t border-gray-200 py-6 px-4 space-y-6">
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
          </div>} */}
          {/* <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-200/10">
            <ThemeSelect />
          </div> */}
        </div>
      </Dialog>
    </div>
  )
}

export function Header({ hasNav = false, navIsOpen, onNavToggle, title, section }) {
  let [isOpaque, setIsOpaque] = useState(false)
  const { data: session } = useSession()


  useEffect(() => {
    if (session) {
      const userId = session.user.email;
      const people = {
        id: userId,
        name: 'steedos.com/' + session.user.name,
        spaceId: 'steedos.com',
        spaceName: 'steedos.com',
      }
      window.posthog.identify(userId);
      window.posthog.people.set(people);
    }
  }, [session]);
  
  const [open, setOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [cart, setCart] = useState({lines: []})

  useEffect(() => {
    let offset = 50
    function onScroll() {
      if (!isOpaque && window.scrollY > offset) {
        setIsOpaque(true)
      } else if (isOpaque && window.scrollY <= offset) {
        setIsOpaque(false)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [isOpaque])

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
      {/* <div className="py-2 bg-gradient-to-r from-sky-600 to-light-blue-500 overflow-hidden">
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

      <div className="absolute z-40 lg:z-50 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex justify-end">
          <picture>
            <source srcSet={'/img/beams/docs@30.avif'} type="image/avif" />
            <img
              src={'/img/beams/docs@tinypng.png'}
              alt=""
              className="w-[71.75rem] flex-none max-w-none dark:hidden"
            />
          </picture>
          <picture>
            <source srcSet={'/img/beams/docs-dark@30.avif'} type="image/avif" />
            <img
              src={'/img/beams/docs-dark@tinypng.png'}
              alt=""
              className="w-[90rem] flex-none max-w-none hidden dark:block"
            />
          </picture>
        </div>
      </div>
      <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
       
        <nav aria-label="Top" className="max-w-8xl mx-auto font-semibold text-base leading-6 ">
          <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
            <div className="flex items-center">
             
              {/* Logo */}
              <div className="flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Steedos Platform</span>
                  <Logo className="w-auto h-9" />
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
                                  ? 'border-sky-600 text-sky-600'
                                  : 'border-transparent hover:border-sky-600 hover:text-sky-600',
                                'text-slate-700 dark:text-slate-200 font-semibold px-2 relative z-10 flex items-center transition-colors ease-out duration-200 border-b-2 -mb-px pt-px'
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
                          <Popover.Panel className="absolute top-full inset-x-0 text-sm">
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div className="absolute inset-0 top-1/2 shadow" aria-hidden="true" />

                            <div className="relative bg-white dark:bg-slate-800 font-normal">
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
                                          <a href={item.href} className="mt-6 block font-medium font-semibold text-slate-900 dark:text-slate-100">
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
                                          <p id={`${section.id}-heading`} className="font-medium font-semibold text-slate-900 dark:text-slate-100">
                                            <a href={section.href}>{section.name}</a>
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.id}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-slate-900 dark:hover:text-slate-300">
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
                      className="px-2 flex items-center text-slate-700 dark:text-slate-200 text-base font-medium hover:border-sky-600 hover:text-sky-600 border-b-2 -mb-px pt-px border-transparent "
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">

                <div className="relative hidden lg:flex items-center ml-auto">
                  <div className="text-slate-700 dark:text-slate-200">

                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-opacity-20 hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        {/* {userInfo.name && (userInfo.name)} */}
                        我的账户
                          <ChevronDownIcon
                            className="w-5 h-5 ml-1 -mr-1 text-violet-300 hover:text-sky-500"
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
                            {/* Cart */}
                            {/* {userInfo.name && (
                            <Menu.Item>
                              <a href="/store/shopping-cart" className="text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                <ShoppingBagIcon
                                  className="w-5 h-5 mr-2 text-sky-400"
                                  aria-hidden="true"
                                />
                                购物车 ({cart?.lines?.length})
                              </a>
                            </Menu.Item>)} */}
                            {!session && (
                              <Menu.Item>
                                <a href="#" onClick={() => signIn("keycloak")} className="font-medium text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                  <ShoppingBagIcon
                                    className="w-5 h-5 mr-2 text-sky-400"
                                    aria-hidden="true"
                                  />
                                  登录
                                </a>
                              </Menu.Item>
                            )}
                            {session && (
                              <Menu.Item>
                                <a href="#" className="font-bold text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-base">
                                  {session.user.name}
                                </a>
                              </Menu.Item>
                            )}


                            <Menu.Item>
                              <a href="https://id.steedos.cn/realms/master/account/" target="_blank" className="font-medium text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                <UserIcon
                                  className="w-5 h-5 mr-2 text-sky-400"
                                  aria-hidden="true"
                                />
                              我的账户
                              </a>
                            </Menu.Item>
                            <Menu.Item>
                              <a href="https://console.steedos.cn" target="_blank" className="font-medium text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                <CogIcon
                                  className="w-5 h-5 mr-2 text-sky-400"
                                  aria-hidden="true"
                                />
                              管理控制台
                              </a>
                            </Menu.Item>

                            <Menu.Item>
                              <a href="https://gitlab.steedos.cn" target="_blank" className="font-medium text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                <CodeIcon
                                  className="w-5 h-5 mr-2 text-sky-400"
                                  aria-hidden="true"
                                />
                              Gitlab Devops 平台
                              </a>
                            </Menu.Item>

                            {session && (
                              <Menu.Item>
                                <a href="#" onClick={signOut} className="font-medium text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm">
                                  <LogoutIcon
                                    className="w-5 h-5 mr-2 text-sky-400"
                                    aria-hidden="true"
                                  />
                                  注销
                                </a>
                              </Menu.Item>
                            )}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <a className="hover:text-sky-500 dark:hover:text-sky-400 text-sm font-medium " href={registration_url}>
                      <span className="ml-2 font-medium text-sm leading-5 rounded-full text-sky-600 bg-sky-400/10 px-3 py-2  dark:text-sky-400">免费注册</span>
                    </a>
                  </div>
                  <div className="flex items-center border-l border-slate-200 ml-3 pl-6 dark:border-slate-800">
                    <ThemeToggle panelClassName="mt-8" />
                    <a
                      href="https://github.com/steedos/steedos-platform"
                      target="_blank"
                      className="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                    >
                      <span className="sr-only">Enterprise Low-Code Platform on GitHub</span>
                      <svg
                        viewBox="0 0 16 16"
                        className="w-5 h-5"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <SearchButton className="ml-auto text-slate-500 w-8 h-8 -my-1 flex items-center justify-center hover:text-slate-600 lg:hidden dark:text-slate-400 dark:hover:text-slate-300">
                  <span className="sr-only">Search</span>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m19 19-3.5-3.5" />
                    <circle cx="11" cy="11" r="6" />
                  </svg>
                </SearchButton>
                <NavPopover className="ml-2 -my-1" display="lg:hidden" />
              </div>
            </div>
          </div>

        </nav>

        {hasNav && (
            <div className="flex items-center p-4 border-b border-slate-900/10 lg:hidden dark:border-slate-50/[0.06]">
              <button
                type="button"
                onClick={() => onNavToggle(!navIsOpen)}
                className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <span className="sr-only">Navigation</span>
                <svg width="24" height="24">
                  <path
                    d="M5 6h14M5 12h14M5 18h14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {title && (
                <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
                  {section && (
                    <li className="flex items-center">
                      {section}
                      <svg
                        width="3"
                        height="6"
                        aria-hidden="true"
                        className="mx-3 overflow-visible text-slate-400"
                      >
                        <path
                          d="M0 0L3 3L0 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </li>
                  )}
                  <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
                    {title}
                  </li>
                </ol>
              )}
            </div>
          )}
      </header>
    </>
  )
}
