import * as React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const Main = ({children}) => {
  return (
    <div className="w-full flex flex-col flex-grow px-5 dark:bg-gray-900 dark:text-gray-100">
      {children}
    </div>
  )
}

export const DefaultLayout = ({children, site}) => {
  return (
    <>
      <Header site={site}/>
      <Main>
        {children}
      </Main>
      {/* <Footer /> */}
    </>
  )
}

export const getLayout = (page) => <Layout>{page}</Layout>

export default DefaultLayout
