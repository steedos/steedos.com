import React, {FunctionComponent} from 'react'
import {NextSeo} from 'next-seo'

type LayoutProps = {
  meta?: {
    title?: string
    description?: string
    titleAppendSiteName?: boolean
    url?: string
    ogImage?: any
  }
}

const ArticleLayout: FunctionComponent<LayoutProps> = ({
  children,
  meta = {},
}) => {
  const {
    title,
    description,
    titleAppendSiteName = false,
    url,
    ogImage,
  } = meta
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        titleTemplate={titleAppendSiteName ? undefined : '%s'}
        twitter={{
          cardType: ogImage ? 'summary_large_image' : 'summary',
        }}
        openGraph={{
          title,
          description,
          url,
          images: ogImage ? [ogImage] : undefined,
        }}
        canonical={url}
      />
      <div className="dark:bg-gray-900 bg-white dark:text-gray-200 text-black">
        <article className="mx-auto max-w-screen-md lg:mt-14 md:mt-8 mt-3 mb-16">
          <h1 className="max-w-screen-md lg:text-5xl md:text-4xl sm:text-3xl text-2xl w-full font-extrabold mb-8 lg:mb-10 leading-tighter">
            {title}
          </h1>

          <main>{children}</main>
        </article>
      </div>
    </>
  )
}

export default ArticleLayout
