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

import dynamic from 'next/dynamic'

import { SidebarLayout } from '@/layouts/SidebarLayout'
import ArticleLayout from '@/layouts/ArticleLayout'
import tinytime from 'tinytime'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { PageHeader } from '@/components/PageHeader'
import { getPost, getBlog, getBlogSidebarLayoutNav } from '@/lib/blog';
import Markdown from 'react-markdown'
import {NextSeo} from 'next-seo'
const {serialize} = require('next-mdx-remote/serialize')
import { MDXRemote } from 'next-mdx-remote'
import { Heading } from '@/components/Heading';
const {remarkPlugins} = require('remark')
const {rehypePlugins} = require('rehype')

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
  // 这些只能在服务端引入，所以只能写在这里。
  
  // const markdownTOC = require('markdown-toc');

  const { blog_slug, post_slug } = params;
  const blog = await getBlog(blog_slug);
  if (!blog) {
    res.statusCode = 404;
    res.end()
    return {props: {}}
  }
  const post = await getPost(post_slug);
  if (!post) {
    res.statusCode = 404;
    res.end()
    return {props: {}}
  }
  
  const mdxSource = await serialize(post.body, {
    mdxOptions: {
      remarkPlugins,
      rehypePlugins,
    }
  })
  // const headings = []; //markdownTOC(post.body).json

  // const minHeading = 2;

  // let tableOfContents = []
  // let currentHeading = null
  // headings.forEach(heading => {
  //   if (heading.lvl == minHeading) {
  //     if (currentHeading)
  //       tableOfContents.push(currentHeading);
  //     currentHeading = {
  //       title: heading.content,
  //       slug: heading.content,
  //       children: []
  //     };
  //   }
  //   if (currentHeading && heading.lvl == minHeading + 1) {
  //     currentHeading.children.push({
  //       title: heading.content,
  //       slug: heading.content,
  //     })
  //   }
  // });
  // if (currentHeading)
  //   tableOfContents.push(currentHeading);
  
  return {
    props: {
      mdxSource,
      tableOfContents: [], //tableOfContents,
      title: post.name,
      ...post
    }
  }
}

// const MDXRemote = dynamic(
//   () => import('next-mdx-remote').then((mod) => mod.MDXRemote),
//   { ssr: false }
// )
// console.log(MDXRemote)

export default function Post(props) {

  const router = useRouter()

  const {
    title = 'Missing title',
    summary,
    seo_title,
    image,
    mdxSource,
  } = props

  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
  const imageUrl = image?process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL + `/api/files/images/${image}` : null
  return (
    <>
      <NextSeo
        title={title}
        description={summary}
        openGraph={{
          title: seo_title || title,
          description: summary,
          url,
          images: [
            {
              url: imageUrl,
              alt: title,
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
          <h1 className="text-black max-w-screen-md lg:text-6xl md:text-5xl sm:text-4xl text-3xl w-full font-extrabold mb-8 lg:mb-10 leading-tighter">
            {title}
          </h1>
          {/* {author && <Author author={author} />} */}
          {imageUrl && (
            <div className="mt-4">
              <Image
                src={imageUrl}
                alt={title}
                width={1280}
                height={720}
                quality={100}
                className="rounded-lg"
              />
            </div>
          )}
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
            <MDXRemote {...mdxSource} components={components}/>
        </main>
      </article>
    </>
  )
}
