import { useRouter } from 'next/router'
export default function BuyButton({ productVariant }) {
    const router = useRouter()
    const onClick=()=>{
        router.push(`/store/checkout?ids=${productVariant._id}`)
    }
    return (
      <button
        onClick={onClick}
        type="button"
        className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        购买
      </button>
    )
  }
  