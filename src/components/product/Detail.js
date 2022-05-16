import Head from 'next/head'
import tinytime from 'tinytime'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, RadioGroup, Tab, Transition } from '@headlessui/react'
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
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Navigation, Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Gallery, Item } from 'react-photoswipe-gallery'
import { getPrice } from '@/lib/product.client';
import { getMedia } from '@/lib/product.client'
import { find, each } from 'lodash'
import BuyNow from '@/components/product/BuyNow'
import AddToCart from '@/components/product/AddToCart'
import { Markdown } from '@/components/Markdown'
// const {rehypePlugins} = require('rehype')

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const postDateTemplate = tinytime('{YYYY}-{Mo}-{DD}')


const PreviewImages = function({product}) {

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"flip"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFlip, Navigation, Pagination]}
        className="bg-black shadow-md shadow-gray-700 border-black aspect-[4/3] justify-center"
        >
        {getMedia(product).map((image) => (
          <SwiperSlide className="overflow-hidden h-full">
            <img className="mx-auto h-full max-w-full object-contain self-center" src={image.src} onClick={openModal}/>
          </SwiperSlide>
        ))}
      </Swiper>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-full w-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-full transform overflow-hidden bg-black text-left align-middle shadow-xl transition-all">
                  <div className="z-50 hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="bg-gray-900 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={closeModal}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-10 w-10" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="h-full">
                      <Swiper
                        spaceBetween={30}
                        effect={"flip"}
                        navigation={true}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[EffectFlip, Navigation, Pagination]}
                        className="h-full justify-center"
                        >
                        {getMedia(product).map((image) => (
                          <SwiperSlide className="h-full">
                            <img className="mx-auto object-contain h-full max-w-full self-center" src={image.src} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default function ProductDetail({ product, vid }) {
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
      <main className="max-w-7xl mx-auto sm:pt-10 sm:px-6 lg:px-8 w-full">


        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

        <div className="mt-6 max-w-2xl mx-auto lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div className="w-full max-h-full">
              <PreviewImages product={product}/>
            </div>
           

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">

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

                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
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
          {product.html && <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 py-8 px-4 sm:px-0">
            <div className="max-w-none pb-8">
              <Markdown body={product.html}></Markdown>
            </div>
          </section>}

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
