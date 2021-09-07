import { StarIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ReviewStars({ rating }) {
  return (
    <div>
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((ratingIcon) => (
          <StarIcon
            key={ratingIcon}
            className={classNames(
              rating > ratingIcon ? 'text-yellow-400' : 'text-gray-300',
              'h-5 w-5 flex-shrink-0'
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="sr-only">{rating} out of 5 stars</p>
    </div>
  )
}
