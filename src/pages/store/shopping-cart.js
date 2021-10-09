import React from 'react'
import { Fragment, useState } from 'react'
import { ROOT_URL, getImageSrc } from '@/lib/base.client'
import { useRouter } from 'next/router'
import { getCart, changeCart } from '@/lib/cart.client';
import Price from '@/components/product/Price'
import QuantityInput from '@/components/QuantityInput'
import Trash from '@/components/Trash'
import useSWR from 'swr'
function openOrderInfo(orderId) {
  window.open(`${ROOT_URL}/app/-/shop_orders/view/${orderId}`)
}
export default function Cart() {
  const router = useRouter();
  const relatedProducts = [];
  const products = [];
  const [cart, setCart] = useState({lines: []})

  const goCheckout = (params) => {
    router.push('/store/checkout')
  }

  const onChangeQuantity = async (value, merchandise)=>{
    const newCart = await changeCart(merchandise.merchandise__expand._id, value);
    if (!newCart.error) {
      setCart(newCart)
    } else {
      setCart({lines: []})
    }
  }

  useSWR('userCart', async () => {
    const _cart = await getCart();
    if (!_cart.error) {
      setCart(_cart)
    } else {
      setCart({lines: []})
    }
  })
  return (
    <>
      <main className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8" style={{width:'80rem'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto pt-16">
            <div className="py-4 flex items-center justify-between">
              <dt className="text-gray-600">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">您的购物车</h1>
              </dt>
              <dd className="font-medium text-gray-900">
                <a href="/" className="text-indigo-600 font-medium hover:text-indigo-500">
                  继续购物<span aria-hidden="true"> &rarr;</span>
                </a>
              </dd>
            </div>
            {(!cart.lines || cart.lines.length < 1) && <div>您的购物车是空的</div>}
            {cart.lines && cart.lines.length > 0 && <form className="mt-12">
              <section aria-labelledby="cart-heading">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                  {cart.lines.map((merchandise, productIdx) => (
                    <li key={merchandise.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={getImageSrc(merchandise.merchandise__expand.image || merchandise.merchandise__expand.product__expand.image)} alt={merchandise.merchandise__expand.image || merchandise.merchandise__expand.product__expand.image}
                          className="w-24 h-24 rounded-lg object-center object-cover sm:w-32 sm:h-32"
                        />
                      </div>

                      <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div>
                          <div className="flex justify-between sm:grid sm:grid-cols-2">
                            <div className="pr-6">
                              <h3 className="text-sm">
                                <a href={merchandise.href} className="font-medium text-gray-700 hover:text-gray-800">
                                  {merchandise.merchandise__expand.product__expand.name}
                                </a>
                              </h3>
                              {merchandise.merchandise__expand.option1 ? <p className="mt-1 text-sm text-gray-500">{merchandise.merchandise__expand.product__expand.option1}: {merchandise.merchandise__expand.option1}</p> : null}
                              {merchandise.merchandise__expand.option2 ? <p className="mt-1 text-sm text-gray-500">{merchandise.merchandise__expand.product__expand.option2}: {merchandise.merchandise__expand.option2}</p> : null}
                              {merchandise.merchandise__expand.option3 ? <p className="mt-1 text-sm text-gray-500">{merchandise.merchandise__expand.product__expand.option3}: {merchandise.merchandise__expand.option3}</p> : null}
                            </div>

                            <p className="text-sm font-medium text-gray-900 text-right"><Price price={merchandise.estimated_cost?.total_amount}></Price></p>
                          </div>

                          <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/3 sm:mt-0">
                            <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                              Quantity, {merchandise.merchandise__expand.product__expand.name}
                            </label>
                            <div className="flex items-center justify-between">
                              <dt className="text-sm text-gray-600">
                                <QuantityInput quantity={merchandise.quantity} index={productIdx} merchandise={merchandise} onChange={onChangeQuantity}></QuantityInput>
                              </dt>
                              <dd class="text-sm font-medium text-gray-900">
                                <Trash onRemove={async ()=>{
                                    return await onChangeQuantity(0, merchandise)
                                }} title={`您确定要从购物车移除 ${merchandise.merchandise__expand.product__expand.name} ? `}></Trash>
                              </dd>
                          </div>
                            
                          </div>
                        </div>

                        {/* <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                          {merchandise.inStock ? (
                            <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                          ) : (
                            <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                          )}

                          <span>{merchandise.inStock ? 'In stock' : `Ships in ${merchandise.leadTime}`}</span>
                        </p> */}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
              {/* Order summary */}
              <section aria-labelledby="summary-heading" className="mt-10 sm:ml-32 sm:pl-6">
                <div className="rounded-lg py-6">
                  <h2 id="summary-heading" className="sr-only">
                    Order summary
                  </h2>

                  <div className="flow-root">
                    <dl className="-my-4 text-sm divide-y divide-gray-200">
                      <div className="py-4 flex items-center justify-between">
                        <dt className="text-gray-600">小计</dt>
                        <dd className="font-medium text-gray-900"><Price price={cart.estimated_cost?.total_amount}></Price></dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="mt-10">
                  <button
                    type="button"
                    onClick={goCheckout}
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    去结算
                  </button>
                </div>

                <div className="mt-6 text-sm text-center text-gray-500">
                  <p>
                    <a href="/" className="text-indigo-600 font-medium hover:text-indigo-500">
                      继续购物<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </p>
                </div>
              </section>
            </form>
            }
          </div>
        </div>

        {/* Policy grid */}
        {/* <section aria-labelledby="policies-heading" className="mt-24 bg-gray-50 border-t border-gray-200">
          <h2 id="policies-heading" className="sr-only">
            Our policies
          </h2>

          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
              {policies.map((policy) => (
                <div
                  key={policy.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className="md:flex-shrink-0">
                    <div className="flow-root">
                      <img className="-my-1 h-24 w-auto mx-auto" src={policy.imageSrc} alt="" />
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-900">{policy.name}</h3>
                    <p className="mt-3 text-sm text-gray-500">{policy.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
      </main>
    </>
  )
}
