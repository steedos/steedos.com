import { Heading } from '@/components/Heading'
import Frame from '@/components/Frame'
import { InformationCircleIcon, ExclamationIcon, StarIcon } from '@heroicons/react/solid'
import { isString } from 'lodash'

export function a({ node, ...props }) {
  if (props.href && isString(props.href)) {
    const result = props.href.match(/\/embed\/videos\//i);
    if (result) {
      // const src = props.href.replace('/videos/', '/embed/videos/')
      return <Frame
        src={props.href}
      />
    }

    const target = "_blank" //props.href.match(/https:\/\//i) || props.href.match(/http:\/\//i) ? "_blank": "_self";
    return <a href={props.href} target={target}>{props.children}</a>
  }
}

export function pre({ node, ...props }) {
  return <div>{props.children}</div>
}

export function info({ node, ...props }) {
  return <div className="block notice-block info"><div className="icon"><InformationCircleIcon></InformationCircleIcon></div><div className="content">{props.children}</div></div>
}

export function warning({ node, ...props }){
  return <div className="block notice-block warning"><div className="icon"><ExclamationIcon></ExclamationIcon></div><div className="content">{props.children}</div></div>
}

export function tip({ node, ...props }){
  return <div className="block notice-block tip"><div className="icon"><StarIcon></StarIcon></div><div className="content">{props.children}</div></div>
}

export const mdxComponents = {
  Heading,
  a,
  pre,
  info,
  warning,
  tip
}

export default mdxComponents;