import { Testimonials } from '@/components/Testimonials'
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
import { getCollectionProducts, getCollections } from '@/lib/product';
import ReviewStars from '@/components/product/ReviewStars'
import Price from '@/components/product/Price'
import { getDefaultPrice } from '@/lib/product.client';
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
            <a href="/docs/" className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
              快速开始
            </a>
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
            className=" rounded-lg"
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
  
  const slug = 'steedos-packages'
  const collection = await getCollectionProducts(slug)

  return {
    props: {
      collection,
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
    collection,
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
  
      <div className="mb-20 space-y-20 overflow-hidden sm:mb-32 sm:space-y-32 md:mb-40 md:space-y-40">
        <Header />
        <section className="text-center px-8">
          <h2 className="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white">
            高效开发，快速迭代，加速数字化转型
          </h2>
          <figure>
            <blockquote>
              <p className="mt-6 max-w-3xl mx-auto text-lg">
              对于现代企业而言，能够根据快速变化的工作环境而做出调整并为之适应已变得至关重要。您的公司如何应对这些变化，以及您如何快速做出响应，可能成为决定您的长期成败的关键。您的企业可以通过多种方式实现这种变化，使用低代码开发是越来越受欢迎的一种方式，可使企业适应不断变化的外部环境。
              </p>
            </blockquote>
            {/* <div className="relative max-w-3xl mx-auto px-4 sm:px-6 md:px-8 mt-10">
              <div className='w-[360px] h-[200px] sm:w-[640px] sm:h-[360px] mx-auto aspect-video rounded-lg'>
                <Player
                  // ref={playerRef}
                  hls_url='https://www-steedos-com.oss-accelerate.aliyuncs.com/videos/creator/steedos-guide.mp4'
                  light={`${process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL}/api/files/images/m26uoZEELL8t22h4t`}
                  width="100%"
                  height="100%"
                />
              </div>
            </div> */}
          </figure>
        </section>
      </div>
      <Testimonials />

      {/* <article className="mt-20 relative z-10 max-w-5xl mx-auto">
        <main className="px-4 sm:px-6 md:px-8 pb-20">
          <Markdown body={homepage.body} className="prose sm:prose-lg dark:prose-dark"></Markdown>
        </main>
      </article> */}
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44">
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



            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="py-24 text-center">
                
                <h2 className="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white">
                  开源开放，携手伙伴，打造海量解决方案
                </h2>
                <p className="mt-6 max-w-3xl mx-auto text-lg">
                华炎魔方开放平台源码，携手全球合作伙伴，提供各行业各领域的低代码解决方案。基于华炎魔方开发的企业应用，无需开发人员介入，点击鼠标就能随心定制，快速满足企业数字化转型的各种需求。
                </p>
              </div>
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                {collection?.products?.map((product) => {

                  const imageUrl = product.image?process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL + `/api/files/images/${product.image}` : null
                  return (
                  <div
                    key={product.slug}
                    className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
                  >
                    <div className="aspect-w-5 aspect-h-3 bg-gray-200 group-hover:opacity-75">
                      <img
                        src={imageUrl}
                        className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                      />
                    </div>
                    <div className="flex-1 p-4 space-y-2 flex flex-col">
                      <h3 className="text-lg font-medium text-gray-900">
                        <a href={`/products/${product.slug}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="text-sm text-gray-500">{product.vender__expand?.name}</p>
                      <p className="text-sm text-gray-500">{product.description}</p>
                      <div className="flex-1 flex items-center justify-between">
                        <p className="text-sm italic text-gray-500"><ReviewStars rating={product.rating}/></p>
                        <p className="text-base font-medium text-gray-900"><Price price={getDefaultPrice(product)}></Price></p>
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
            </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}
