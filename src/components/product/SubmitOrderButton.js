import { useRouter } from 'next/router'
import { submitOrder } from '@/lib/order'
import { each } from 'lodash';
export default function SubmitOrderButton({ variants, isQuick }) {
    const router = useRouter()
    const onClick= async ()=>{
        let orderInfo = {isQuick: isQuick, variants: []};
        each(variants, (variantQuantity, variantId)=>{
            orderInfo.variants.push({
                _id: variantId,
                quantity: Number(variantQuantity)
            })
        })
        await submitOrder(orderInfo, router)
    }
    return (
        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        <button
          onClick={onClick}
          type="button"
          className="w-full bg-sky-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500"
        >
          提交订单
        </button>
      </div>
    )
  }
  