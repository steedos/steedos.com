import { Heading } from '@/components/Heading'
import Frame from '@/components/Frame'
import { XCircleIcon, InformationCircleIcon, ExclamationIcon, StarIcon } from '@heroicons/react/solid'
import { isString } from 'lodash'

export function a({ node, ...props }) {
  if (props.href && isString(props.href)) {
    const result = props.href.match(/\/embed\/videos\//i);
    if (result) {
      // const src = props.href.replace('/videos/', '/embed/videos/')
      return <Frame
        className="aspect-video"
        src={props.href}
      />
    }

    const target = props.href.match(/https:\/\//i) || props.href.match(/http:\/\//i) ? "_blank": "_self";
    return <a href={props.href} target={target}>{props.children}</a>
  }
}

export function alert({ node, ...props }){
  if (props.type === 'warning') {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
              <ExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <span className="text-sm text-red-700">{props.children}</span>
          </div>
        </div>
      </div>
    )
   } else if (props.type === 'tip') {
    return (
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InformationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <span className="text-sm text-yellow-700">{props.children}</span>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="rounded-md bg-gray-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <span className="text-sm text-blue-700">{props.children}</span>
          </div>
        </div>
      </div>
    )
  }
}

export const mdxComponents = {
  Heading,
  a,
  alert,
}

export default mdxComponents;