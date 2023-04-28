import { NodeNextRequest } from 'next/dist/server/base-http/node'
import { useRouter } from 'next/router'
export default function BuyNow({ productVariant }) {
    const router = useRouter()
    const onClick=()=>{
        router.push(`/store/checkout?ids=${productVariant._id}`)
    }
    return (
      <button 
        onClick={onClick}
        type="button"
        style={{ display:"none" }}
        className="w-full bg-sky-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-sky-500"
      >
        立即购买
      </button>
    )
  }
  