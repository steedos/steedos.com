import { SidebarLayout } from '@/layouts/SidebarLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import socialSquare from '@/img/social-square.jpg'
import { Title } from '@/components/Title'
import { protocolNav } from '@/navs/protocol'
import { Header } from '@/components/Header'

export function ProtocolLayout(props) {
  let router = useRouter()

  return (
    <>
      <Title suffix={router.pathname === '/' ? undefined : '低代码协议'}>
        {props.layoutProps.meta.metaTitle || props.layoutProps.meta.title}
      </Title>
      <Head>
        {/* <meta key="twitter:card" name="twitter:card" content="summary" />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={`https://tailwindcss.com${socialSquare}`}
        /> */}
      </Head>
      <SidebarLayout nav={protocolNav} {...props} />
    </>
  )
}

ProtocolLayout.nav = protocolNav
