import Link from 'next/link'

import { DocumentationLayout } from '@/layouts/DocumentationLayout'
import { getBlog, getBlogSidebarLayoutNav, getPostUrl } from '@/lib/blog';
import tinytime from 'tinytime'
import { BasicLayout } from '@/layouts/BasicLayout';

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

export async function getServerSideProps(context) {
  const { blog_slug } = context.params;
  const blog = await getBlog(blog_slug);
  if (!blog) {
    throw new Error(`Blog with slug '${params.blog_slug}' not found`)
  }
  const nav = await getBlogSidebarLayoutNav(blog_slug, blog.menu_primary)
  return {
    props: {
      blog: blog,
      nav: nav
    }
  }
}
export default function Blog({ blog, nav }) {
  return (
    <div className="px-4 sm:px-6 xl:px-8 pt-10 pb-16">

      <ul className="divide-y divide-gray-200">
        {blog.posts.map((post) => {
          console.log(post)
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



Blog.getLayoutProps = (page, pageProps)=>{
  console.log(pageProps.nav)
  return {
    meta: {
      title: pageProps.blog.name,
      description: pageProps.blog.description,
    },
    nav: pageProps.nav,
    Layout: ( pageProps.nav )? DocumentationLayout : BasicLayout,
  }
}
