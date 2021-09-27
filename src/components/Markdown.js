
import RMarkdown from 'react-markdown';
import { ROOT_URL } from '@/lib/base';
import Image from 'next/image'
// import getConfig from 'next/config'
import remarkGfm from 'remark-gfm'
import { isString } from 'lodash'
import Frame from '@/components/Frame'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
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

export function Markdown({ body }) {

  const __remarkPlugins = [...remarkPlugins, [imgLinks, {absolutePath: ROOT_URL}], remarkGfm]

  return (
    <>
      {body && (
        <RMarkdown 
          children={body.replace(new RegExp('\\\\\n', 'g'), '\n')} 
          remarkPlugins={__remarkPlugins} className="prose dark:prose-dark"
          components={{
            code,
            img, 
            a,
          }}
        >
        </RMarkdown>
      )}
    </>
  )
}
