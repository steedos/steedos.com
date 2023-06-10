import { Features } from '@/components/Features'
import { SearchButton } from '@/components/Search'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/Logo'
import { NavItems, NavPopover } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Markdown } from '@/components/Markdown'
import NextLink from 'next/link'
import Head from 'next/head'
import {getSite, getSiteByDomain, getSiteDomains} from '@/lib/site'
import { getCollectionProducts, getCollections } from '@/lib/product';
import ReviewStars from '@/components/product/ReviewStars'
import Price from '@/components/product/Price'
import { getDefaultPrice } from '@/lib/product.client';
import clsx from 'clsx'
import styles from './index.module.css'


import { CallToAction } from '@/components/salient/CallToAction'
import { Faqs } from '@/components/salient/Faqs'
import { Hero } from '@/components/salient/Hero'
import { Pricing } from '@/components/salient/Pricing'
import { PrimaryFeatures } from '@/components/salient/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/salient/SecondaryFeatures'
import { Testimonials as Testimonials2} from '@/components/salient/Testimonials'



export async function getStaticProps({params}) {


  const slug = 'steedos-packages'
  const collection = await getCollectionProducts(slug)

  return {
    props: {
      collection,
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}


export default function Home(props) {
  const {
    name,
    collection
  } = props
  return (
    <>
      <Head>
        <title>华炎魔方低代码PaaS平台 - 赋能企业，打造数字驱动型组织</title>
      </Head>

      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      {/* <Features /> */}

        {/*

        <Testimonials2 />
        <Faqs /> */}
      <CallToAction />
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44">


            <div className="relative max-w-7xl mx-auto px-4 focus:outline-none sm:px-3 md:px-5">
              <div className="py-24 text-center">

                <h2 className="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white">
                  开源开放，携手伙伴，打造海量解决方案
                </h2>
                <p className="mt-6 max-w-3xl mx-auto text-lg">
                华炎魔方开放平台源码，携手全球合作伙伴，提供各行业各领域的低代码解决方案。基于华炎魔方开发的企业应用，无需开发人员介入，点击鼠标就能随心定制，快速满足企业数字化转型的各种需求。
                </p>
              </div>
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 pb-8">
                {collection?.products?.map((product) => {

                  const imageUrl = product.image?process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL + `/api/files/images/${product.image}` : null
                  return (
                  <div
                    key={product.slug}
                    className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
                  >
                    <div className="aspect-w-5 aspect-h-3 bg-gray-200 group-hover:opacity-75">
                      <img
                        src={imageUrl}
                        className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                      />
                    </div>
                    <div className="flex-1 p-4 space-y-2 flex flex-col">
                      <h3 className="text-lg font-medium text-gray-900">
                        <a href={`/products/${product.slug}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="text-sm text-gray-500">{product.vender__expand?.name}</p>
                      <p className="text-sm text-gray-500">{product.description}</p>
                      <div className="flex-1 flex items-center justify-between">
                        <p className="text-sm italic text-gray-500"><ReviewStars rating={product.rating}/></p>
                        <p className="text-base font-medium text-gray-900"><Price price={getDefaultPrice(product)}></Price></p>
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
            </div>
      </div>

      <Pricing />
      {/* <Footer /> */}
    </>
  )
}
