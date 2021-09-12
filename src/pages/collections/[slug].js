import React from 'react'
import Head from 'next/head'
import ReviewStars from '@/components/product/ReviewStars'
import PriceMonthly from '@/components/product/PriceMonthly'

import { getCollectionProducts } from '@/lib/product';

import { getDefaultPrice } from '@/lib/product.client';

export async function getServerSideProps(context) {
  const { slug } = context.query
  const collection = await getCollectionProducts(slug)
  return {
    props: {
      collection: collection
    }
  }
}

export default class Collection extends React.Component {
  
  render(){
    const { collection } = this.props;
    return (
      <>
          <main className="products-heading">
            <div className="mx-auto py-8 px-4 sm:py-8 sm:px-1 lg:max-w-7xl lg:px-1">
              <div className="py-6 space-y-2 md:space-y-5">
                <h1 className="text-xl font-extrabold text-gray-900 tracking-tight sm:text-2xl">
                  {collection.name}
                </h1>
                {/* <p className="text-lg text-gray-500">
                  All the latest Tailwind CSS news, straight from the team.
                </p> */}
              </div>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {collection?.products?.map((product) => {
                  return (
                  <a key={`/products/${product.slug}`} href={`/products/${product.slug}`}>
                    <li key={`/products/${product.slug}`} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                      {/* <div className="relative bg-gray-100 pt-[50%] overflow-hidden" style={{paddingTop:'50%'}}>
                        <div className="absolute inset-0 w-full h-full rounded-t-lg overflow-hidden">
                          <img src={meta.image} alt="" className="absolute inset-0 w-full h-full"/>
                        </div>
                      </div> */}
                      <div className=" p-6 space-y-6">
                        <div className="w-full flex items-center justify-between space-x-6 text-right">
                          <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src={`${process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL}/api/files/images/${product.vender__expand?.logo}`} alt=""/>
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-gray-900 text-sm font-medium truncate"></h3>
                            </div>
                            <PriceMonthly price={getDefaultPrice(product)}></PriceMonthly>
                          </div>
                        </div>
                        <div className="">
                          <div className="space-y-2">
                              <h2 className="text-xl font-bold tracking-tight truncate text-gray-900">{product.name}
                              </h2>
                              {/* <dl>
                                <dt className="sr-only">Published on</dt>
                                <dd className="text-base font-medium text-gray-600">
                                  <time dateTime={meta.date}>
                                    {postDateTemplate.render(new Date(meta.date))}
                                  </time>
                                </dd>
                              </dl> */}
                              <dl>
                                <dt className="sr-only"></dt>
                                <dd className="text-base font-medium text-gray-500">
                                {product.vender__expand?.name}
                                </dd>
                              </dl>
                              <div className="prose max-w-none text-sm text-gray-500 line-clamp-3">
                                {product.description}
                              </div>
                            </div>
                        </div>
                      </div>
                      
                      <div className=''>
                        <div className="-mt-px flex divide-x divide-gray-200">
                          <div className="w-0 flex-1 flex items-center justify-between">
                            <div className="relative px-6 py-4">
                              <ReviewStars rating={product.rating}/>
                            </div>
                            <div className="relative text-right justify-right px-6 py-4 text-sm text-blue-700 font-medium border border-transparent rounded-bllg hover:text-blue-500">
                              <span>了解更多</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </a>
                  )
                })}
              </ul>
            </div>
          </main>
      </>
    )
  }
}
