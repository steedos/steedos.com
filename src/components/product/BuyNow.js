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
        className="w-full bg-indigo-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
      >
        立即购买
      </button>
    )
  }
  