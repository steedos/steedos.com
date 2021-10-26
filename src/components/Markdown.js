
import ReactMarkdown from 'react-markdown';
import { ROOT_URL } from '@/lib/base';
import Image from 'next/image'
// import getConfig from 'next/config'
import remarkGfm from 'remark-gfm'
import { isString } from 'lodash'
import { InformationCircleIcon, ExclamationIcon, StarIcon } from '@heroicons/react/solid'
import Frame from '@/components/Frame'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkDirective from 'remark-directive'
import hastscript from 'hastscript'
import rehypeRaw from 'rehype-raw'
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
  if (className === 'language-markup') {
    const html = children
    return (
      <div className="not-prose" dangerouslySetInnerHTML={{__html: html}}></div>
    )
  }
  return !inline && match ? (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, '')}
      style={atomDark}
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
  // if (isAllowImageDomain(props.src)) {
  //   return (<Image {...props}
  //     width={1280}
  //     height={720}
  //     quality={100}
  //     className="rounded-lg" />)
  // } else {
    return <img className="rounded-lg" {...props} />
  // }
}

export function a({ node, ...props }) {
  if (props.href && isString(props.href)) {
    const result = props.href.match(/\/embed\/videos\//i);
    if (result) {
      // const src = props.href.replace('/videos/', '/embed/videos/')
      return <Frame
        src={props.href}
      />
    }

    const target = props.href.match(/https:\/\//i) || props.href.match(/http:\/\//i) ? "_blank": "_self";
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

export function Markdown(props) {
  const { 
    body = "", 
    className = 'prose dark:prose-dark'
  } = props

  const __remarkPlugins = [...remarkPlugins, [imgLinks, {absolutePath: ROOT_URL}], remarkDirective, customPlugin, remarkGfm]
  const markdownBody = body ? body.replace(new RegExp('\\\\n', 'g'), '<br/>\n\n').replace(new RegExp('\\\\\n', 'g'), '<br/>\n\n') : ""
  return (
    <>
      {markdownBody && (
        <ReactMarkdown 
          children={markdownBody} 
          remarkPlugins={__remarkPlugins} 
          rehypePlugins={[rehypeRaw]} 
          className={className}
          skipHtml={false}
          components={{
            code,
            // img, 
            a,
            info,
            warning,
            pre,
            tip
          }}
        >
        </ReactMarkdown>
      )}
    </>
  )
}
