import { SidebarLayout } from '@/layouts/SidebarLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import socialSquare from '@/img/social-square.jpg'
import { Title } from '@/components/Title'
import { developerNav } from '@/navs/developer'
import { Header } from '@/components/Header'

export function DeveloperLayout(props) {
  let router = useRouter()

  return (
    <>
      <Title suffix={router.pathname === '/' ? undefined : '华炎魔方开发者'}>
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
      <Header/>
      <SidebarLayout nav={developerNav} {...props} />
    </>
  )
}

DeveloperLayout.nav = developerNav
