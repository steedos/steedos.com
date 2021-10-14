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

      <div className="w-full h-full bg-no-repeat absolute hidden lg:block" style={{backgroundImage: `url("${backgroundImageUrl}");`}}>
      </div>
      <header className="relative z-10 max-w-screen-lg mx-auto">
        <div className="px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
           
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">
            {homepage.name}
          </h1>
          <p className="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11">
            {/* 华炎魔方将<InlineCode>低代码技术</InlineCode>与企业业务场景结合，
            助力企业在<InlineCode>最短时间</InlineCode>内开发<InlineCode>数字化</InlineCode>解决方案， 帮助企业快速落地现有业务战略， 以及<InlineCode>催生未来创新</InlineCode>。 */}
            <Markdown body={homepage.summary} className="prose sm:prose-lg md:prose-xl lg:prose-2xl"></Markdown>
          </p>
          {/* <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 text-center">
            <NextLink href="/docs/deploy/deploy-cloud">
              <a className="w-full sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200">
                快速开始
              </a>
            </NextLink>
          </div> */}

          <img className="rounded-lg mt-10" src={imageUrl} alt=""></img>

        </div>
      </header>
      <article className="relative z-10 max-w-screen-lg mx-auto">
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
