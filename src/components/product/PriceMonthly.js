import { formatPrice } from '@/lib/product.client'
export default function PriceMonthly({ price }) {
  return (
    <>
      {price > 0 && (
        <span>{formatPrice(price)}</span>
      )}
      {price === 0 && (
        <span className="flex-shrink-0 inline-block px-3 py-1 text-green-800 text-base font-medium bg-green-100 rounded-full">免费</span>
      )}
    </>
  )
}
