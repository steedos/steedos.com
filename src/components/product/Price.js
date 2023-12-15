export default function Price({ price }) {
  return (
    <>
      {price > 0 && (
        <span>{price}</span>
      )}
      {price === 0 && (
        <span className="flex-shrink-0 inline-block px-3 py-1 text-green-800 text-base font-medium bg-green-100 rounded-full">免费</span>
      )}
    </>
  )
}
