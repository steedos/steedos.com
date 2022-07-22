import Link from 'next/link'
import * as React from 'react'
import Image from 'next/image'
import groq from 'groq'
import {parse} from 'date-fns'
import friendlyTime from 'friendly-time'
import {NextSeo} from 'next-seo'
import Error from 'next/error'
import {find} from 'lodash'

import { SidebarLayout } from '@/layouts/SidebarLayout'
import { getBlog, getBlogPosts, getBlogs } from '@/lib/blog';
import tinytime from 'tinytime'
import { Markdown } from '@/components/Markdown'

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

const UpdatedAt: React.FunctionComponent<{date: string}> = ({date}) => (
  <div>{date}</div>
)

export async function getStaticProps({params}) {
  const { blog_slug } = params;
  const blog = await getBlog(blog_slug);
  const errorCode = !blog?404: 0;
  
  const posts = blog? await getBlogPosts(blog._id): [];
  
  return {
    props: {
      errorCode,
      blog,
      posts
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}


export async function getStaticPaths() {
  const items = await getBlogs()

  // Get the paths we want to pre-render based on posts
  const paths = items.map((item) => ({
    params: { 
      blog_slug: item.slug },
  }))
  console.log('Building Blogs...');
  console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

const BlogPosts: React.FC = (props: any) => {
  const {errorCode, blog, posts} = props;

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <NextSeo
        title={`${blog.name}`}
      />
    <div className="mx-auto max-w-screen-lg lg:py-16 py-10">
      <div className="pb-20">
      <h1 className="md:text-4xl text-2xl text-center font-bold text-slate-700 dark:text-slate-200">
        {blog.name}
      </h1>
      {blog.body && (<div className="pt-10">
        <Markdown body={blog.body}></Markdown>
      </div>)}
      </div>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 lg:gap-x-8">
        {posts?.map((post) => {

          const fullSlug = `/${blog.slug}/${post.slug}`
          const imageUrl = post.image?process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL + `/api/files/images/${post.image}` : null
          return (
            <div
              key={post.slug}
              className="group relative flex flex-col overflow-hidden"
            >
              <div className="aspect-w-5 aspect-h-3 bg-gray-200 group-hover:opacity-75 rounded-lg ">
                <img
                  src={imageUrl}
                  className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                />
              </div>
              <div className="flex-1 py-6 space-y-4 flex flex-col">
                <h3 className="md:text-2xl text-xl font-medium">
                  <a href={`${fullSlug}`}>
                    <span aria-hidden="true" className="text-slate-700 dark:text-slate-200">
                    {post.name}
                    </span>
                  </a>
                </h3>
                {/* <p className="text-sm text-gray-500">{post.owner__expand?.name}</p> */}
                <p className="text-md">{post.summary}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </>
  )
}


const IconPlaceholder = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        fill="currentColor"
      />
    </g>
  </svg>
)


export default BlogPosts;
