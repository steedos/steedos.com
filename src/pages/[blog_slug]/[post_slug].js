import {
  useRef,
  useState,
  useEffect,
  createContext,
  Fragment,
  useCallback,
  isValidElement,
  useContext,
} from 'react'

import Error from 'next/error'
import dynamic from 'next/dynamic'

import { SidebarLayout } from '@/layouts/SidebarLayout'
import ArticleLayout from '@/layouts/ArticleLayout'
import tinytime from 'tinytime'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { PageHeader } from '@/components/PageHeader'
import { getPost, getBlog, getBlogSidebarLayoutNav } from '@/lib/blog';
import {NextSeo} from 'next-seo'
// const {serialize} = require('next-mdx-remote/serialize')
// import { MDXRemote } from 'next-mdx-remote'
import { Heading } from '@/components/Heading';
import { Markdown } from '@/components/Markdown'

const components = {
  Heading,
}

export async function getServerSideProps({
  params,
  res,
  locale,
  locales,
  preview,
}) {

  const { blog_slug, post_slug } = params;
  const blog = await getBlog(blog_slug);
  const post = blog? await getPost(blog_slug, post_slug):null;
  const errorCode = !blog || !post?404: 0;
  
  return {
    props: {
      errorCode,
      ...post
    }
  }
}

export default function Post(props) {

  const router = useRouter()

  const {
    errorCode,
    name = 'Missing title',
    body,
    blog__expand, 
    summary,
    seo_title,
    image,
    // mdxSource,
  } = props

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  let seo_title_calc = seo_title ? seo_title : name;
  if (blog__expand && blog__expand.name)
    seo_title_calc += ' - ' + blog__expand.name
  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
  const imageUrl = image?process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL + `/api/files/images/${image}` : null
  return (
    <>
      <NextSeo
        title={seo_title_calc}
        description={summary}
        openGraph={{
          title: seo_title_calc,
          description: summary,
          url,
          images: [
            {
              url: imageUrl,
              alt: name,
            },
          ],
        }}
        // twitter={{
        //   cardType: seo.cardType || 'summary_large_image',
        //   site: seo.site || 'eggheadio',
        //   handle: seo.handle,
        // }}
        // canonical={canonicalUrl}
      />
      <article className="mx-auto max-w-screen-md lg:mt-14 md:mt-8 mt-3 mb-16">
        <header>
          <h1 className="text-black max-w-screen-md lg:text-4xl md:text-4xl sm:text-3xl text-2xl w-full font-bold mb-8 lg:mb-10">
            {name}
          </h1>
          {/* {author && <Author author={author} />} */}
          {/* {imageUrl && (
            <div className="mt-4">
              <Image
                src={imageUrl}
                alt={name}
                width={1280}
                height={720}
                quality={100}
                className="rounded-lg"
              />
            </div>
          )} */}
          {/* {tags && (
            <ul>
              Posted in
              {tags.map((tags: any) => (
                <li key={tags}>{tags}</li>
              ))}
            </ul>
          )} */}
        </header>
        <main>
          <Markdown body={body} className="prose sm:prose-lg lg:prose-xl"></Markdown>
        </main>
      </article>
    </>
  )
}
