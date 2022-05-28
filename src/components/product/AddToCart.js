import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { changeCart } from '@/lib/cart.client'
import { CheckIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
export default function AddToCart({ productVariant = {} }) {
    const router = useRouter();
    let [isOpen, setIsOpen] = useState(false)
    const goCheckout = (params) => {
      router.push('/store/checkout')
    }
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const onClick= async ()=>{
        const newCart = await changeCart(productVariant._id, undefined, router);
        if (newCart && !newCart.error) {
          openModal();
        }
        // router.push(`/store/checkout?ids=${productVariant._id}`)
    }
    return (
      <>
      <button
        onClick={onClick}
        type="button"
        className="w-full bg-sky-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-sky-700 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500"
      >
        加入购物车
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-top transition-all transform bg-white shadow-xl rounded-2xl" style={{marginTop: '100px', marginRight: '-40%', borderColor:'rgba(18, 18, 18, 0.08)', borderWidth:'0.1rem' ,borderStyle: 'solid'}}>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="mt-2">
                    <div className="flex items-center">
                        <dt className="text-sm text-gray-600">
                        <CheckIcon className="h-6 w-6" aria-hidden="true"></CheckIcon>
                        </dt>
                        <dd class="text-sm font-medium text-gray-900">
                        商品已加入购物车
                        </dd>
                    </div>
                </div>
                  
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{productVariant.product__expand?.name}</p>
                  {productVariant.product__expand?.option1 ? <p className="mt-1 text-sm text-gray-500">{productVariant.product__expand.option1}: {productVariant.option1}</p> : null}
                  {productVariant.product__expand?.option2 ? <p className="mt-1 text-sm text-gray-500">{productVariant.product__expand.option2}: {productVariant.option2}</p> : null}
                  {productVariant.product__expand?.option3 ? <p className="mt-1 text-sm text-gray-500">{productVariant.product__expand.option3}: {productVariant.option3}</p> : null}
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="w-full bg-sky-600 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500"
                    onClick={goCheckout}
                  >
                    去结算
                  </button>
                  <a
                    href="#"
                    className="w-full mt-4 inline-flex justify-center px-4 py-2 text-sm font-medium"
                    onClick={closeModal}
                  >
                    继续购物
                  </a>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      </>
    )
  }
  