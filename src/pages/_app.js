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
import {has, isArray} from 'lodash';
import { saveAuthInfo } from '@/lib/auth.client';
// import { getSite } from '@/lib/site';

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

export default function App({ Component, pageProps = {}, router }) {
  let [navIsOpen, setNavIsOpen] = useState(false)
  if(typeof window !== 'undefined' && router.query){
    if(has(router.query, 'X-Auth-Token') && has(router.query, 'X-Space-Id') && has(router.query, 'X-User-Id')){
      let authToken = router.query['X-Auth-Token'];
      if(isArray(authToken)){
        authToken = authToken[authToken.length-1]
      }
      let spaceId = router.query['X-Space-Id'];
      if(isArray(spaceId)){
        spaceId = spaceId[spaceId.length-1]
      }
      let userId = router.query['X-User-Id'];
      if(isArray(userId)){
        userId = userId[userId.length-1]
      }
      saveAuthInfo(userId, spaceId, authToken)
    }
  }

  useEffect(() => {
    if (!navIsOpen) return
    function handleRouteChange() {
      setNavIsOpen(false)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [navIsOpen])

  const Layout = Component.layoutProps?.Layout || DefaultLayout

  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen }
    : {}
  const showHeader = router.pathname !== '/'
  const meta = Component.layoutProps?.meta || pageProps?.meta || {}
  const description =
    meta.metaDescription || meta.description || 'Documentation for the Tailwind CSS framework.'

  return (
    <>
      <MDXProvider components={mdxComponents}>
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </>
  )
}

// App.getInitialProps = async ({ctx}) => {
//   const { req } = ctx;
//   let site = null;
//   if(req){
//     try {
//       let parsedSrc = new URL(req.headers.referer);
//       site = await getSite(parsedSrc.hostname)
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   return { 
//     site: site 
//   }
// }