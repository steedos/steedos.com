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
import NextLink from 'next/link'
import Head from 'next/head'

function NpmInstallButton() {
  function copy() {
    navigator.clipboard.writeText('npm install tailwindcss').catch((e) => {
      console.log(e)
    })
  }

  return (
    <button
      type="button"
      className="w-full sm:w-auto flex-none bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200"
      onClick={() => copy()}
    >
      <span className="text-gray-900">
        <span className="hidden sm:inline text-gray-500" aria-hidden="true">
          ${' '}
        </span>
        npm install tailwindcss
      </span>
      <span className="sr-only">(click to copy to clipboard)</span>
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M8 16c0 1.886 0 2.828.586 3.414C9.172 20 10.114 20 12 20h4c1.886 0 2.828 0 3.414-.586C20 18.828 20 17.886 20 16v-4c0-1.886 0-2.828-.586-3.414C18.828 8 17.886 8 16 8m-8 8h4c1.886 0 2.828 0 3.414-.586C16 14.828 16 13.886 16 12V8m-8 8c-1.886 0-2.828 0-3.414-.586C4 14.828 4 13.886 4 12V8c0-1.886 0-2.828.586-3.414C5.172 4 6.114 4 8 4h4c1.886 0 2.828 0 3.414.586C16 5.172 16 6.114 16 8" />
      </svg>
    </button>
  )
}

export default function Home() {
  return (
    <div className="space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44 overflow-hidden">
      <Head>
        <meta
          key="twitter:title"
          name="twitter:title"
          content="Tailwind CSS - Rapidly build modern websites without ever leaving your HTML."
        />
        <meta
          key="og:title"
          property="og:title"
          content="Tailwind CSS - Rapidly build modern websites without ever leaving your HTML."
        />
        <title>华炎魔方 - 赋能企业，打造数字驱动型组织</title>
      </Head>
      <header className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
           
          <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">
            赋能企业，打造数字驱动型组织
          </h1>
          <p className="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11">
            华炎魔方将<InlineCode>低代码技术</InlineCode>与企业业务场景结合，
            助力企业在<InlineCode>最短时间</InlineCode>内开发<InlineCode>数字化</InlineCode>解决方案， 帮助企业快速落地现有业务战略， 以及<InlineCode>催生未来创新</InlineCode>。

          </p>
          <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 text-center">
            <NextLink href="/docs">
              <a className="w-full sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200">
                Get started
              </a>
            </NextLink>
            <NpmInstallButton />
          </div>
        </div>
        <Hero />
      </header>
      <section className="relative z-10 text-center max-w-screen-lg xl:max-w-screen-xl mx-auto">
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
      </section>
      <Testimonials />
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
      <Footer />
    </div>
  )
}
