import '../css/fonts.css'
import '../css/main.css'
import 'focus-visible'
import { useState, useEffect, Fragment } from 'react'
import { Header } from '@/components/Header'
import { Title } from '@/components/Title'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import Head from 'next/head'
import {MDXProvider} from '@mdx-js/react'
import twitterLargeCard from '@/img/twitter-large-card.jpg'
import { ResizeObserver } from '@juggle/resize-observer'
import 'intersection-observer'
import mdxComponents from '@/components/mdx';
import {has} from 'lodash';
import { saveAuthInfo } from '@/lib/auth.client';

if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
  window.ResizeObserver = ResizeObserver
}

const progress = new ProgressBar({
  size: 2,
  color: '#22D3EE',
  className: 'bar-of-progress',
  delay: 100,
})

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', () => {
  progress.finish()
  window.scrollTo(0, 0)
})
Router.events.on('routeChangeError', progress.finish)

export default function App({ Component, pageProps, router }) {
  if(typeof window !== 'undefined' && router.query){
    if(has(router.query, 'X-Auth-Token') && has(router.query, 'X-Space-Id') && has(router.query, 'X-User-Id')){
      const authToken = router.query['X-Auth-Token'];
      const spaceId = router.query['X-Space-Id'];
      const userId = router.query['X-User-Id'];
      saveAuthInfo(userId, spaceId, authToken)
    }
  }

  const { 
    meta = {} 
  } = pageProps;

  const getLayout =
    Component.getLayout ||
    ((Page) => (
      <DefaultLayout>
        <Page {...pageProps} />
      </DefaultLayout>
    ))

  return (
    <>
      <Title suffix="华炎魔方">{meta.metaTitle || meta.title}</Title>
      <Head>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:site" name="twitter:site" content="@steedos" />
        <meta key="twitter:description" name="twitter:description" content={meta.description} />
        {/* <meta
          key="twitter:image"
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}${twitterLargeCard}`}
        /> */}
        {/* <meta key="twitter:creator" name="twitter:creator" content="@steedos" /> */}
        <meta
          key="og:url"
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}${router.pathname}`}
        />
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:description" property="og:description" content={meta.description} />
        {/* <meta
          key="og:image"
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}${twitterLargeCard}`}
        /> */}
      </Head>
      <MDXProvider components={mdxComponents}>
        {getLayout(Component, pageProps)}
      </MDXProvider>
    </>
  )
}
