import Head from 'next/head'
import tinytime from 'tinytime'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import {
  HeartIcon,
  MenuIcon,
  MinusSmIcon,
  PlusSmIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import VariantRadios from '@/components/product/VariantRadios'
import ReviewStars from '@/components/product/ReviewStars'
import Price from '@/components/product/Price'

import { getPrice } from '@/lib/product.client';
import { getMedia } from '@/lib/product.client'
import { find, each, conformsTo } from 'lodash'
import BuyNow from '@/components/product/BuyNow'
import AddToCart from '@/components/product/AddToCart'
import { Markdown } from '@/components/Markdown'
import { ImageSwiper } from '@/components/ImageSwiper'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const postDateTemplate = tinytime('{YYYY}-{Mo}-{DD}')



export default function ProductDetail({ product, vid }) {

  const breadcrumbs = [
    // { id: 1, name: '商城', href: '#' },
    { id: 2, name: product.product_collection__expand[0].name, href: `/collections/${product.product_collection__expand[0].slug}` },
  ];
  let variant = null;
  if(vid){
    variant = find(product.product_variants, (v)=>{
      return v._id === vid;
    })
  }
  
  const [productVariant, setProductVariant] = useState(variant || product.product_variants[0]);
  const onVariantRadiosChange = (values)=>{
    setProductVariant(find(product.product_variants, (item)=>{
      let isEq = true;
      each(values, (v, k)=>{
        if(isEq){
          if(item[k] === v){
            isEq = true
          }else{
            isEq = false
          }
        }
      })
      return isEq;
    }))
  }
  return (
    <>
      <main className="max-w-8xl mx-auto sm:pt-8 sm:px-6 lg:px-8 w-full">


        <div className="max-w-3xl mx-auto lg:max-w-none">

          <nav aria-label="Breadcrumb">
            <ol role="list" className="mb-3 flex items-center space-x-2">
              {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-sky-600">
                      {breadcrumb.name}
                    </a>
                    {breadcrumbIdx !== breadcrumbs.length - 1 ? (
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="w-4 h-5 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                    ):null}
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

          {/* Product */}
          <div className="mt-6 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div className="col-span-3 w-full max-h-full">
              <ImageSwiper images={getMedia(product)}/>
            </div>
           

            {/* Product info */}
            <div className="col-span-2 mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                  <Price price={getPrice(productVariant)}></Price>
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                  <ReviewStars rating={product.rating} />
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <Markdown body={product.description}></Markdown>
              </div>

              <VariantRadios product={product} onChange={onVariantRadiosChange} productVariant={productVariant}></VariantRadios>
              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <AddToCart productVariant={productVariant}></AddToCart>
                <BuyNow productVariant={productVariant}></BuyNow>
              </div>
              {/* <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="border-t divide-y divide-gray-200">
                  {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(
                                  open ? 'text-indigo-600' : 'text-gray-900',
                                  'text-sm font-medium'
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section> */}
            </div>
          </div>
          {product.html && (<section aria-labelledby="related-heading" className="max-w-3xl mt-6 border-gray-200 py-8 px-4 sm:px-0">
            <div className="pb-8">
              <Markdown body={product.html}></Markdown>
            </div>
          </section>)}

          {product.reviews && product.reviews.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 py-8 px-4 sm:px-0">
              <h2 id="related-heading" className="text-xl font-bold text-gray-900">评论</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {product.reviews.map((review, reviewIdx) => (
                  <div key={review._id} className="flex text-sm text-gray-500 space-x-4">
                    <div className="flex-none py-10">
                      <img src={`${process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL}/avatar/${review.owner}`} alt="" className="w-10 h-10 bg-gray-100 rounded-full" />
                    </div>
                    <div className='py-10'>
                      <h3 className="font-medium text-gray-900">{review.owner__expand.name}</h3>
                      <p>
                        <time dateTime={review.created}>{postDateTemplate.render(new Date(Number(review.created)))}</time>
                      </p>


                      <div className="mt-4">
                        <ReviewStars rating={review.rating} />
                      </div>

                      <div className="mt-4 prose prose-sm max-w-none text-gray-500">{review.name}</div>
                      
                    </div>
                  </div>
                ))}
              </div>
            </section>

          )}
          {/* <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0">
            <h2 id="related-heading" className="text-xl font-bold text-gray-900">
              Customers also bought
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((product) => (
                <div key={product.id}>
                  <div className="relative">
                    <div className="relative w-full h-72 rounded-lg overflow-hidden">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                      />
                      <p className="relative text-lg font-semibold text-white">{product.price}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a
                      href={product.href}
                      className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                    >
                      Add to bag<span className="sr-only">, {product.name}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section> */}
        </div>
      </main>
    </>
  )
}
