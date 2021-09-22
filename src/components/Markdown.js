
import RMarkdown from 'react-markdown';
import { ROOT_URL } from '@/lib/base';
import Image from 'next/image'
// import getConfig from 'next/config'
import remarkGfm from 'remark-gfm'
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

export function Markdown({ body }) {

  const __remarkPlugins = [...remarkPlugins, [imgLinks, {absolutePath: ROOT_URL}], remarkGfm]

  return (
    <>
      {body && (
        <RMarkdown children={body} remarkPlugins={__remarkPlugins} className="prose dark:prose-dark mt-1 sm:text-base text-sm"
          components={{
            // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
            img: ({ node, ...props }) => {
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
          }}
        >
        </RMarkdown>
      )}
    </>
  )
}
