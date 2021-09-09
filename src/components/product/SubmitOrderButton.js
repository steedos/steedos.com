import { useRouter } from 'next/router'
import { submitOrder } from '@/lib/order'
import { each } from 'lodash';
export default function SubmitOrderButton({ variants }) {
    const router = useRouter()
    const onClick= async ()=>{
        let orderInfo = {variants: []};
        each(variants, (variant)=>{
            orderInfo.variants.push({
                _id: variant._id,
                quantity: 1 //TODO 没有购物车，数量为 1
            })
        })

        await submitOrder(orderInfo, router)
    }
    return (
        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        <button
          onClick={onClick}
          type="button"
          className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
        >
          提交订单
        </button>
      </div>
    )
  }
  