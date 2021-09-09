import { DocumentationLayout } from '@/layouts/DocumentationLayout'
import { getBlog, getBlogSidebarLayoutNav, getPostUrl } from '@/lib/blog';
import tinytime from 'tinytime'

export async function getServerSideProps(context) {
  const { blog_slug } = context.params;
  const blog = await getBlog(blog_slug);
  const nav = blog? await getBlogSidebarLayoutNav(blog_slug, blog.sidebar): []
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
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blog.posts.map((post) => {
          return (
            <a key={post._id} href={getPostUrl(blog.slug, post)}>
              <li key={`/product/${post.name}`} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                {/* <div className="relative bg-gray-100 pt-[50%] overflow-hidden" style={{paddingTop:'50%'}}>
                        <div className="absolute inset-0 w-full h-full rounded-t-lg overflow-hidden">
                          <img src={meta.image} alt="" className="absolute inset-0 w-full h-full"/>
                        </div>
                      </div> */}
                <div className=" p-6 space-y-6">
                  <div className="w-full flex items-center justify-between space-x-6 text-right">
                    <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src={`${process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL}/api/files/images/${post.image}`} alt="" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 text-sm font-medium truncate"></h3>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold tracking-tight truncate text-gray-900">{post.name}
                      </h2>
                      {/* <dl>
                                <dt className="sr-only">Published on</dt>
                                <dd className="text-base font-medium text-gray-600">
                                  <time dateTime={meta.date}>
                                    {postDateTemplate.render(new Date(meta.date))}
                                  </time>
                                </dd>
                              </dl> */}
                      <dl>
                        <dt className="sr-only"></dt>
                        <dd className="text-base font-medium text-gray-500">
                          {post.developer?.name}
                        </dd>
                      </dl>
                      <div className="prose max-w-none text-sm text-gray-500 line-clamp-3">
                        {post.description}
                      </div>
                    </div>
                  </div>
                </div>

                <div className=''>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex items-center justify-between">
                      <div className="relative text-right justify-right px-6 py-4 text-sm text-blue-700 font-medium border border-transparent rounded-bllg hover:text-blue-500">
                        <span>更多</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </a>
          )
        })}
      </ul>
    </div>
  )
}



Blog.getLayoutProps = (page, pageProps)=>{
  return {
    meta: {
      title: pageProps.blog.name,
      description: pageProps.blog.description,
    },
    nav: pageProps.nav,
    Layout: DocumentationLayout,
  }
}
