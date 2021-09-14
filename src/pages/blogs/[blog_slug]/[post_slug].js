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
import { ContentsLayout } from '@/layouts/ContentsLayout'
import tinytime from 'tinytime'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { PageHeader } from '@/components/PageHeader'
import { getPost, getBlog, getBlogSidebarLayoutNav } from '@/lib/blog';
import Markdown from 'react-markdown'
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
  const {serialize} = require('next-mdx-remote/serialize')
  
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
  
  const nav = blog.menu_primary? await getBlogSidebarLayoutNav(blog_slug, blog.menu_primary):null
  const mdxSource = await serialize(post.body, {
    mdxOptions: {
      remarkPlugins,
      rehypePlugins,
    }
  })
  const headings = []; //markdownTOC(post.body).json

  const minHeading = 2;

  let tableOfContents = []
  let currentHeading = null
  headings.forEach(heading => {
    if (heading.lvl == minHeading) {
      if (currentHeading)
        tableOfContents.push(currentHeading);
      currentHeading = {
        title: heading.content,
        slug: heading.content,
        children: []
      };
    }
    if (currentHeading && heading.lvl == minHeading + 1) {
      currentHeading.children.push({
        title: heading.content,
        slug: heading.content,
      })
    }
  });
  if (currentHeading)
    tableOfContents.push(currentHeading);
  
  return {
    props: {
      post: post,
      mdxSource,
      nav: nav,
      tableOfContents: [] //tableOfContents,
    }
  }
}

// const MDXRemote = dynamic(
//   () => import('next-mdx-remote').then((mod) => mod.MDXRemote),
//   { ssr: false }
// )
// console.log(MDXRemote)

export default function Post({ post, nav, mdxSource, tableOfContents }) {

  const toc = ( nav && nav.length > 0 )? [] : tableOfContents
  return (
    <ContentsLayout tableOfContents={tableOfContents} meta={{
      title: post.name,
      description: post.summary
    }}>
      <MDXRemote {...mdxSource} components={components}/>
      {/* <Markdown remarkPlugins={remarkPlugins}>
        {post.body}
      </Markdown> */}
    </ContentsLayout>
  )
}


Post.getLayout = (Page, pageProps) => {
  const {nav} = pageProps
  return (
    <SidebarLayout nav={nav}>
      <Page {...pageProps}/>
    </SidebarLayout>
  )
}