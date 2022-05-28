// import { Testimonials } from '@/components/Testimonials'
// import { DarkMode } from '@/components/home/DarkMode'
// import { ConstraintBased } from '@/components/home/ConstraintBased'
// import { BuildAnything } from '@/components/home/BuildAnything'
// import { Performance } from '@/components/home/Performance'
// import { MobileFirst } from '@/components/home/MobileFirst'
// import { StateVariants } from '@/components/home/StateVariants'
// import { ComponentDriven } from '@/components/home/ComponentDriven'
// import { Customization } from '@/components/home/Customization'
// import { ModernFeatures } from '@/components/home/ModernFeatures'
// import { EditorTools } from '@/components/home/EditorTools'
// import { ReadyMadeComponents } from '@/components/home/ReadyMadeComponents'
import { SearchButton } from '@/components/Search'
// import { Hero } from '@/components/home/Hero'
import { BigText, InlineCode, Link, Paragraph, Widont } from '@/components/home/common'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/Logo'
import { NavItems, NavPopover } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Markdown } from '@/components/Markdown'
import NextLink from 'next/link'
import Head from 'next/head'
import {getSite, getSiteByDomain, getSiteDomains} from '@/lib/site'
import { Player } from '@/components/player'
import clsx from 'clsx'
import styles from './index.module.css'



function Header() {
  return (
    <header className="relative">
      <div className="px-4 sm:px-6 md:px-8">
        <div
          className={clsx(
            'absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120]',
            styles.beams
          )}
        >
          <div
            className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
            }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
          <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white leading-tight lg:leading-tight">
          使用新一代低代码 DevOps 平台，<br/>
          快速构建个性化企业应用
          </h1>
          <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
              华炎魔方是 Salesforce 低代码平台的 的开源替代方案，使用可视化工具进行
            <code className="font-mono font-medium text-sky-500 dark:text-sky-400">模型设计</code>,{' '}
            <code className="font-mono font-medium text-sky-500 dark:text-sky-400">页面设计</code>,{' '}
            <code className="font-mono font-medium text-sky-500 dark:text-sky-400">流程设计</code>,{' '}
            <code className="font-mono font-medium text-sky-500 dark:text-sky-400">报表设计 </code>{' '}，
            只需点击鼠标，就能快速创建应用程序，实现敏捷开发的新高度。
          </p>
          <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
            <NextLink href="/docs/">
              <a className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
                快速开始
              </a>
            </NextLink>
            <SearchButton className="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700">
              {({ actionKey }) => (
                <>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-none text-slate-300 dark:text-slate-400"
                    aria-hidden="true"
                  >
                    <path d="m19 19-3.5-3.5" />
                    <circle cx="11" cy="11" r="6" />
                  </svg>
                  <span className="flex-auto">快速搜索...</span>
                  {actionKey && (
                    <kbd className="font-sans font-semibold dark:text-slate-500">
                      <abbr
                        title={actionKey[1]}
                        className="no-underline text-slate-300 dark:text-slate-500"
                      >
                        {actionKey[0]}
                      </abbr>{' '}
                      K
                    </kbd>
                  )}
                </>
              )}
            </SearchButton>
          </div>
        </div>
      </div>
      
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 md:px-8 mt-10 ">
        <div className='w-[360px] h-[200px] sm:w-[640px] sm:h-[360px] mx-auto aspect-video'>
          <Player
            // ref={playerRef}
            hls_url='https://vod.steedos.cn/video/175146ea-1772962056e-0000-0000-009-c59e0.mp4'
            light={`${process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL}/api/files/images/uYfiSbnj7Ms7djamt`}
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </header>
  )
}

export async function getStaticProps({params}) {

  const {
    host,
  } = params
  const site = await getSiteByDomain(host)
  
  return {
    props: {
      ...site
    },
    notFound: !site || !site.homepage,
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}

export async function getStaticPaths() {
  const items = await getSiteDomains()

  // Get the paths we want to pre-render based on posts
  const paths = items.map((item) => ({
    params: { 
      host: item.name },
  }))

  return { paths, fallback: 'blocking' }
}

export default function Home(props) {
  const {
    name,
    homepage = {name: '', body: ''}
  } = props
  const [mobile, setMobile] = useState('')
  const backgroundImageUrl = '/img/header-background-ellipse.png'
  const imageUrl = homepage.image?process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL + `/api/files/images/${homepage.image}` : null
  return (
    <>
      <Head>
        <meta
          key="twitter:title"
          name="twitter:title"
          content={`${name} - ${homepage.name}`}
        />
        <meta
          key="og:title"
          property="og:title"
          content={`${name} - ${homepage.name}`}
        />
        <title>{name} - {homepage.name}</title>
      </Head>
  
      <div className="mb-10 space-y-20 overflow-hidden sm:mb-16 sm:space-y-32 md:mb-20 md:space-y-40">
        <Header/>
      </div>

      {/* <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div className="lg:py-24">
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">使用低代码技术，</span>
                  <span className="block text-indigo-400">快速构建个性化应用</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {homepage.summary}
                </p>
                <div className="mt-10 sm:mt-12">
                  <form action="https://console.steedos.cn/accounts/a/#/signup" className="sm:max-w-xl sm:mx-auto lg:mx-0" target="_blank">
                    <div className="sm:flex">
                      <div className="min-w-0 flex-1">
                        <label htmlFor="email" className="sr-only">
                          手机
                        </label>
                        <input
                          id="mobile"
                          type="mobile"
                          placeholder="请输入您的手机号"
                          onChange={(e)=>{setMobile(e.target.value)}}
                          className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                        />
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <button
                          type="button"
                          onClick={()=>{
                            window.open(`https://console.steedos.cn/accounts/a/#/signup?mobile=${mobile}`);
                          }}
                          className="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                        >
                          开通云服务
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                    开始您的华炎魔方低代码之旅。 <a href="https://www.steedos.cn/docs/deploy/deploy-cloud" target="_blank">（阅读开通指南）</a>
                  
                    </p>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:m-0 lg:relative">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                <img
                  className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={imageUrl}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    
      <article className="relative z-10 max-w-5xl mx-auto">
        <main className="px-4 sm:px-6 md:px-8 pb-20">
          <Markdown body={homepage.body} className="prose sm:prose-lg"></Markdown>
        </main>
      </article>
      {/* <section className="relative z-10 text-center max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="px-4 sm:px-6 md:px-8">
          <BigText as="h2" className="mb-8">
            <Widont>“Best practices” don’t actually work.</Widont>
          </BigText>
          <figure>
            <blockquote>
              <Paragraph className="max-w-4xl mx-auto mb-6">
                I’ve written{' '}
                <a
                  href="https://adamwathan.me/css-utility-classes-and-separation-of-concerns/"
                  className="text-light-blue-600 font-semibold"
                  style={{
                    boxShadow:
                      'inset 0 -0.1666666667em 0 0 #fff, inset 0 -0.3333333333em 0 0 #bae6fd',
                  }}
                >
                  a few thousand words
                </a>{' '}
                <Widont>
                  on why traditional “semantic class names” are the reason CSS is hard to maintain,
                  but the truth is you’re never going to believe me until you actually try it. If
                  you can suppress the urge to retch long enough to give it a chance, I really think
                  you'll wonder how you ever worked with CSS any other way.
                </Widont>
              </Paragraph>
            </blockquote>
            <figcaption className="sm:text-xl font-medium flex flex-col items-center">
              <div className="p-1 border-2 border-light-blue-400 rounded-full mb-3">
                <img
                  src={require('@/img/adam.jpg')}
                  alt=""
                  className="w-10 h-10 rounded-full bg-light-blue-100"
                  loading="lazy"
                />
              </div>
              <div className="text-gray-900">Adam Wathan</div>
              <div className="text-light-blue-600">Creator of Tailwind CSS</div>
            </figcaption>
          </figure>
        </div>
      </section> */}
      {/* <Testimonials /> */}
      {/* <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44"> */}
        {/* <ConstraintBased />
        <BuildAnything />
        <Performance />
        <MobileFirst />
        <StateVariants />
        <ComponentDriven />
        <DarkMode />
        <Customization />
        <ModernFeatures />
        <EditorTools />
        <ReadyMadeComponents /> */}
      {/* </div> */}
      {/* <Footer /> */}
    </>
  )
}
