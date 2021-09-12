import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// import useSWR from 'swr'
import { Fragment } from 'react'
import { ChevronRightIcon, ChevronUpIcon, TrashIcon } from '@heroicons/react/solid'
import { Popover, Transition } from '@headlessui/react'
import PriceMonthly from '@/components/product/PriceMonthly'
import { getImageSrc } from '@/lib/base.client'
import { getPrice } from '@/lib/product.client';
import { getProductsVariant } from '@/lib/product';
import { formatPrice } from '@/lib/product.client';
import { each } from 'lodash'
import SubmitOrderButton from '@/components/product/SubmitOrderButton'

export async function getServerSideProps(context) {
  const { ids } = context.query;
  let productsVariant = []
  if(ids){
    productsVariant = await getProductsVariant(ids.split(','))
  }

  let productsVariantPrice = 0;

  each(productsVariant, (productVariant)=>{
    productsVariantPrice += productVariant.price
  })

  // const products = await getProductsVariant()

  // if (!products) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {
      productsVariant: productsVariant,
      productsVariantPrice: productsVariantPrice
    }
  }
}

export default function Checkout({productsVariant, productsVariantPrice}) {
  return (
    <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="bg-gray-50">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Checkout</h2>

          <div className="lg:grid lg:grid-cols-1 lg:gap-x-12 xl:gap-x-16">
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">订单摘要</h2>

              <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {productsVariant.map((productVariant) => (
                    <li key={productVariant._id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img src={getImageSrc(productVariant.image)} alt={productVariant.image} className="flex-none w-20 h-20 object-center object-cover bg-gray-200 rounded-md" />
                      </div>

                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <a href={productVariant.href} className="font-medium text-gray-700 hover:text-gray-800">
                                {productVariant.name}
                              </a>
                            </h4>
                            {productVariant.product__expand.option1 && <p className="mt-1 text-sm text-gray-500">{productVariant.product__expand.option1}: {productVariant.option1}</p>}
                            {productVariant.product__expand.option2 && <p className="mt-1 text-sm text-gray-500">{productVariant.product__expand.option2}: {productVariant.option2}</p>}
                            {productVariant.product__expand.option3 && <p className="mt-1 text-sm text-gray-500">{productVariant.product__expand.option3}: {productVariant.option3}</p>}
                          </div>

                          <div className="ml-4 flex-shrink-0 flow-root">
                            <p className="mt-1 text-sm font-medium text-gray-900"><PriceMonthly price={getPrice(productVariant)}></PriceMonthly></p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                  {/* 先隐藏商品小计及运费,待功能实现后(一个订单包含多个产品),再显示 */}
                  {/* <div className="flex items-center justify-between">
                    <dt className="text-sm">总商品金额</dt>
                    <dd className="text-sm font-medium text-gray-900">{formatPrice(productsVariantPrice)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">运费</dt>
                    <dd className="text-sm font-medium text-gray-900">{formatPrice()}</dd>
                  </div> 
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">应付总额</dt>
                    <dd className="text-base font-medium text-gray-900">{formatPrice(productsVariantPrice)}</dd>
                  </div>*/}
                  <div className="flex items-center justify-between pt-2">
                    <dt className="text-base font-medium">应付总额</dt>
                    <dd className="text-base font-medium text-gray-900">{formatPrice(productsVariantPrice)}</dd>
                  </div>
                </dl>

                <SubmitOrderButton variants={productsVariant}></SubmitOrderButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
