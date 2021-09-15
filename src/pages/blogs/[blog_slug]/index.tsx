import Link from 'next/link'
import * as React from 'react'
import Image from 'next/image'
import groq from 'groq'
import {parse} from 'date-fns'
import friendlyTime from 'friendly-time'
import {NextSeo} from 'next-seo'

import {find} from 'lodash'

import { SidebarLayout } from '@/layouts/SidebarLayout'
import { getPosts, getBlogSidebarLayoutNav, getPostUrl } from '@/lib/blog';
import tinytime from 'tinytime'

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

const UpdatedAt: React.FunctionComponent<{date: string}> = ({date}) => (
  <div>{date}</div>
)

export async function getServerSideProps({params, res}) {
  const { blog_slug } = params;
  const posts = await getPosts();
  
  return {
    props: {
      posts
    }
  }
}

const BlogPosts: React.FC = (props: any) => {
  const {posts} = props;
  return (
    <>
      <NextSeo
        title='Articles'
      />
    <div className="text-black mx-auto max-w-screen-lg lg:py-16 py-10">
      <h1 className="md:text-4xl text-2xl text-center font-bold pb-16">
        Articles
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-8">
        {posts && posts.map((article: any) => {
          const fullSlug = `/blogs/${article.blog__expand?.slug}/${article.name}-${article._id}`
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
                      <div className="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-600">
                        {/* <IconPlaceholder /> */}
                      </div>
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

                  {article.summary && (
                    <div className="opacity-70 text-sm leading-snug  pl-2">
                      {article.summary}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  </>
  )
}

export default BlogPosts;

export function Blog({ blog, nav }) {
  return (
    <div className="px-4 sm:px-6 xl:px-8 pt-10 pb-16">

      <ul className="divide-y divide-gray-200">
        {blog.posts.map((post) => {
          const link = getPostUrl(blog.slug, post);
          return (
            <li key={post._id} className="py-12">
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                {post.published_at && (
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium text-gray-500">
                      <time dateTime={post.published_at}>
                        {postDateTemplate.render(new Date(post.published_at))}
                      </time>
                    </dd>
                  </dl>
                )}
                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">
                      <Link href={link}>
                        <a className="text-gray-900">{post.name}</a>
                      </Link>
                    </h2>
                    <div className="prose max-w-none text-gray-500">
                      {post.description}
                    </div>
                  </div>
                  <div className="text-base font-medium">
                    <Link href={link}>
                      <a
                        className="text-teal-600 hover:text-teal-700"
                        aria-label={`Read "${post.name}"`}
                      >
                        阅读更多 &rarr;
                      </a>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    
    </div>
  )
}
