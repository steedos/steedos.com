import { SidebarLayout } from '@/layouts/SidebarLayout'
import Head from 'next/head'
import twitterSquare from '@/img/twitter-square.jpg'
import { createPageList } from '@/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/pricing/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'pricing'
)

const nav = {
  Pricing: [
    pages['cloud'],
  ],
}

export function PricingLayout(props) {
  return (
    <>
      <Head>
      </Head>
      <SidebarLayout nav={nav} {...props} />
    </>
  )
}
