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
    <div className="text-black mx-auto max-w-screen-lg lg:py-16 py-10">
      <h1 className="md:text-4xl text-2xl text-center font-bold pb-16">
        {blog.name}
      </h1>
      {blog.body && (<div className="pb-10">
        <Markdown body={blog.body}></Markdown>
      </div>)}
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-8">
        {posts && posts.map((article: any) => {
          const fullSlug = `/${blog.slug}/${article.slug}`
          const imageUrl = article.image?process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL + `/api/files/images/${article.image}` :  ""
          const ownerImageUrl = article.owner__expand.avatar?process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL + `/api/files/avatars/${article.owner__expand.avatar}` : ""
          return (
            <div key={fullSlug} className="flex flex-col">
              {imageUrl ? (
                <div className="md:mb-4 mb-2">
                  <Link href={fullSlug}>
                    <a>
                      <Image
                        src={imageUrl}
                        alt={article.name}
                        width={1280}
                        height={720}
                        quality={100}
                        className="rounded-lg"
                      />
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="aspect-w-16 aspect-h-9 md:mb-4 mb-2">
                  <Link href={fullSlug}>
                    <a>
                        <IconPlaceholder />
                    </a>
                  </Link>
                </div>
              )}
              <Link href={fullSlug}>
                <a>
                  <h2 className="md:text-2xl text-xl font-bold leading-tighter">
                    {article.name}
                  </h2>
                </a>
              </Link>
              {article.summary && (
                <div className="opacity-70 text-sm leading-snug mt-4">
                  {article.summary}
                </div>
              )}
{/* 
              {ownerImageUrl && (
                <div className="mt-4 flex items-start text-sm">
                  <div className="items-center flex space-x-3">
                    <Image
                      src={ownerImageUrl}
                      alt={article.owner__expand.name}
                      quality={100}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex flex-col w-40">
                      <div className="flex-none leading-tight opacity-90">
                        {article.owner__expand.name}
                      </div>
                      {article.published_at && (
                        <div className="place-content-end text-gray-500 leading-tight opacity-90">
                          <UpdatedAt
                            date={friendlyTime(new Date(article.published_at))}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  
                </div>
              )} */}
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
