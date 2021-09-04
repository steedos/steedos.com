import { SidebarLayout } from '@/layouts/SidebarLayout'
import Head from 'next/head'
import twitterSquare from '@/img/twitter-square.jpg'
import { platformNav } from '@/navs/platform'
import { Footer } from '@/components/Footer'

export function PlatformLayout(props) {
  return (
    <>
      <Head>
      </Head>
      <SidebarLayout nav={platformNav} {...props} />
      <Footer/>
    </>
  )
}
