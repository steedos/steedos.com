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
// import { Search } from '@/components/Search'
import { Hero } from '@/components/home/Hero'
import { BigText, InlineCode, Link, Paragraph, Widont } from '@/components/home/common'
// import { useEffect, useState } from 'react'
// import { Logo } from '@/components/Logo'
import { Footer } from '@/components/Footer'
import { Markdown } from '@/components/Markdown'
import NextLink from 'next/link'
import Head from 'next/head'
import {getSite, getSiteByDomain, getSiteDomains} from '@/lib/site'
import { useState } from 'react'

import { ChevronRightIcon } from '@heroicons/react/solid'

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
    <div className="text-center overflow-hidden">
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


      <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div className="lg:py-24">
                {/* <a
                  href="#"
                  className="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                >
                  <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-indigo-500 rounded-full">
                    We're hiring
                  </span>
                  <span className="ml-4 text-sm">Visit our careers page</span>
                  <ChevronRightIcon className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />
                </a> */}
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">赋能企业，</span>
                  <span className="block text-indigo-400">打造数字驱动型组织</span>
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
                    {/* 点击提交表示您同意我们的
                      {' '}
                      <a href="#" className="font-medium text-white">
                        服务条款
                      </a> */}
                      
                    </p>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                <img
                  className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={imageUrl}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <article className="pt-16 relative z-10 max-w-screen-lg mx-auto">
        <main className="px-4 sm:px-6 md:px-8 py-8">
          <Markdown body={homepage.body} className="prose sm:prose-lg lg:prose-xl"></Markdown>
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
      </div>
      {/* <Footer /> */}
    </div>
  )
}
