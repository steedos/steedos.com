
import RMarkdown from 'react-markdown';
import { ROOT_URL } from '@/lib/base';
import Image from 'next/image'
// import getConfig from 'next/config'
import remarkGfm from 'remark-gfm'
import { isString } from 'lodash'
import { InformationCircleIcon, ExclamationIcon, StarIcon } from '@heroicons/react/solid'
import Frame from '@/components/Frame'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkDirective from 'remark-directive'
import hastscript from 'hastscript'
const visit = require('unist-util-visit')
const { remarkPlugins } = require('remark');
const imgLinks = require("@pondorasti/remark-img-links")


// const { serverRuntimeConfig } = getConfig();
const { domains: imageDomains } = process.env.__NEXT_IMAGE_OPTS;

const isAllowImageDomain = (src) => {
  let isAllow = false;
  if (!src.startsWith('/') && imageDomains) {
    let parsedSrc;
    try {
      parsedSrc = new URL(src);
    } catch (err) {
      console.error(err);
      isAllow = false;
    }
    if (process.env.NODE_ENV !== 'test' && !imageDomains.includes(parsedSrc.hostname)) {
      isAllow = false;
    } else {
      isAllow = true;
    }
    return isAllow;
  }
}


function customPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      console.log(`node.type`, node.type)
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        
        const data = node.data || (node.data = {})
        if(node.name){
          const hast = hastscript(node.name, node.attributes)
          data.hName = hast.tagName
          data.hProperties = hast.properties
        }
      }
    })
  }
}

export function code({node, inline, className, children, ...props}) {
  const match = /language-(\w+)/.exec(className || '')
  return !inline && match ? (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, '')}
      style={dark}
      language={match[1]}
      PreTag="div"
      {...props}
    />
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export function img({ node, ...props }) {
  if (!props.src) {
    return <></>
  }
  if (isAllowImageDomain(props.src)) {
    return (<Image {...props}
      width={1280}
      height={720}
      quality={100}
      className="rounded-lg" />)
  } else {
    return <img className="rounded-lg" {...props} />
  }
}

export function a({ node, ...props }) {
  if (props.href && isString(props.href)) {
    const result = props.href.match(/\/videos\//i);
    if (result) {
      const src = props.href.replace('/videos/', '/embed/videos/')
      return <Frame
        src={src}
      />
    }
  }

  return <a href={props.href}>{props.children}</a>
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

export function Markdown(props) {
  const { 
    body, 
    className = 'prose dark:prose-dark'
  } = props

  const __remarkPlugins = [...remarkPlugins, [imgLinks, {absolutePath: ROOT_URL}], remarkDirective, customPlugin, remarkGfm]

  return (
    <>
      {body && (
        <RMarkdown 
          children={body.replace(new RegExp('\\\\\n', 'g'), '\n')} 
          remarkPlugins={__remarkPlugins} 
          className={className}
          components={{
            code,
            // img, 
            a,
            info,
            warning,
            tip
          }}
        >
        </RMarkdown>
      )}
    </>
  )
}
