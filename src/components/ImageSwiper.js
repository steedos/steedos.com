import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, RadioGroup, Tab, Transition } from '@headlessui/react'
import {
  XIcon,
} from '@heroicons/react/outline'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Navigation, Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const ImageSwiper = function({images}) {

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
        className="bg-black shadow-md shadow-gray-700 border-black aspect-[3/2] justify-center"
        >
        {images.map((image) => (
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
                        {images.map((image) => (
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
