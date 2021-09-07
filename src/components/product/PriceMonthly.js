export default function PriceMonthly({ price }) {
  return (
    <p className="mt-1 ">
      {price > 0 && (
        <span className="flex-shrink-0 inline-block px-3 py-1 text-blue-800 text-base font-medium bg-blue-100 rounded-full">¥{price.toFixed(2)}</span>
      )}
      {price === 0 && (
        <span className="flex-shrink-0 inline-block px-3 py-1 text-green-800 text-base font-medium bg-green-100 rounded-full">免费</span>
      )}
    </p>
  )
}
