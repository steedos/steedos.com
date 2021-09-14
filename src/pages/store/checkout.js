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
import { each, isFunction, sum, values } from 'lodash'
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
  const [totalPrice, setTotalPrice] = useState(productsVariantPrice)

  const [variantsSubTotalPrice, setVariantsSubTotalPrice] = useState({});

  const [variantsInfo, setVariantsInfo] = useState({});

  const calculateTotalPrice = ()=>{
    setTotalPrice(sum(values(variantsSubTotalPrice)));
  }

  const setVariantPrice = (_id, subTotalPrice, quantity)=>{
    setVariantsSubTotalPrice(Object.assign({}, variantsSubTotalPrice, {[_id]: subTotalPrice}))
    setVariantsInfo(Object.assign({}, variantsInfo, {[_id]: quantity}))
  }

  useEffect(() => {
    calculateTotalPrice();
  }, [JSON.stringify(variantsSubTotalPrice), JSON.stringify(productsVariant)]);
  
  return (
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
                    <ProductVariantCheckout productVariant={productVariant} key={productVariant._id} onChange={(subTotalPrice, quantity)=>{
                      setVariantPrice(productVariant._id, subTotalPrice, quantity)
                    }}></ProductVariantCheckout>
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
                    <dd className="text-base font-medium text-gray-900">{formatPrice(totalPrice)}</dd>
                  </div>
                </dl>

                <SubmitOrderButton variants={variantsInfo}></SubmitOrderButton>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}


function ProductVariantCheckout({ productVariant, defQuanticy = 1, onChange }) {
  const [subTotalPrice, setSubTotalPrice] = useState(0)
  const [quantity, setQuantity] = useState(defQuanticy)

  const calculateSubTotalPrice = ()=>{
    let subTotal = quantity * (productVariant.price || 0)
    setSubTotalPrice(subTotal);
    if(onChange && isFunction(onChange)){
      onChange(subTotal, quantity);
    }
  }

  useEffect(() => {
    calculateSubTotalPrice();
  }, [quantity, JSON.stringify(productVariant)]);


  return (
    <li key={productVariant._id} className="flex py-6 px-4 sm:px-6">
      <div className="flex-shrink-0">
        <img src={getImageSrc(productVariant.image || productVariant.product__expand.image)} alt={productVariant.image || productVariant.product__expand.image} className="flex-none w-20 h-20 object-center object-cover bg-gray-200 rounded-md" />
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
        <div className="flex mt-2">
          <div className="min-w-0 flex-1">
          <input
            style={{ width: 65 }}
            onChange={
                (e) => {
                    setQuantity(e.target.value)
                }
            }
            id="quantity"
            name="quantity"
            autoComplete="quantity"
            type="number"
            min="1"
            onInput={
                (e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                }
            }
            value={quantity}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          </div>

          <div className="ml-4 flex-shrink-0 flow-root">
            <p className="mt-1 text-sm font-medium text-gray-900"><PriceMonthly price={subTotalPrice}></PriceMonthly></p>
          </div>
        </div>
      </div>
    </li>
  )
}