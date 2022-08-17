import '../css/fonts.css'
import '../css/main.css'
import 'focus-visible'
import { useState, useEffect, Fragment } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer';
import { Title } from '@/components/Title'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import Head from 'next/head'
import twitterLargeCard from '@/img/twitter-large-card.jpg'
import { ResizeObserver } from '@juggle/resize-observer'
import 'intersection-observer'
import {has, isArray} from 'lodash';
import { saveAuthInfo } from '@/lib/auth.client';
import { SearchProvider } from '@/components/Search'
import { SessionProvider } from "next-auth/react"
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

export default function App({ 
  Component,
  pageProps: { session, ...pageProps }, 
  router 
}) {
  let [navIsOpen, setNavIsOpen] = useState(false)

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

  const Layout = Component.layoutProps?.Layout || Fragment

  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen }
    : { }
  const showHeader = !router.pathname.startsWith('/embed') && !router.pathname.startsWith('/login')
  const showFooter = !router.pathname.startsWith('/docs') && !router.pathname.startsWith('/embed') && !router.pathname.startsWith('/login')
  const meta = Component.layoutProps?.meta || pageProps?.meta || {}
  const description =
    meta.metaDescription || meta.description || '开源低代码 DevOps 平台'

  let section =
  meta.section ||
  Object.entries(Component.layoutProps?.Layout?.nav ?? {}).find(([, items]) =>
    items.find(({ href }) => href === router.pathname)
  )?.[0]

  return (
    <SessionProvider session={session}>
      <SearchProvider>
        {showHeader && (
          <Header
            hasNav={Boolean(Component.layoutProps?.Layout?.nav)}
            navIsOpen={navIsOpen}
            onNavToggle={(isOpen) => setNavIsOpen(isOpen)}
            title={meta.title}
            section={section}
          />
        )}
          <Layout {...layoutProps}>
            <Component section={section} {...pageProps} />
          </Layout>
        {showFooter && (
          <Footer/>
        )}
      </SearchProvider>
    </SessionProvider>
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