import { useRouter } from 'next/router'

import {NextSeo} from 'next-seo'
import { getProjectById, getBlogByUrl, getBlogDocuments } from '@/b6/interfaces';
import moment from 'moment'
import 'moment/locale/zh-cn'   // 如果你要用中文环境

moment.locale('zh-cn')        // 全局设置为中文


export async function getStaticProps({params, query}) {

  
  const baseId = "spc-66722b5a71056405ab198b56"
  const projectId = "ced85241-276f-4d0f-8cfc-84c49d78adee"

  const project = await getProjectById(baseId, projectId);
  if (!project) return {};

  const blog = await getBlogByUrl(baseId, params.blogSlug);
  if (!blog) {
    return {
      notFound: true,
    }
  }

  const documents = await getBlogDocuments(baseId, blog._id as string);


  return {
    props: {
      blog,
      documents
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}


export const getStaticPaths = (async () => {
  return {
    paths: [
    ],
    fallback: "blocking", // false or "blocking"
  }
})

export default function PageDetail({blog, documents}){

  // console.log('blog', blog, documents)
  if (blog && documents.length > 0) {
    return (
      <div className="px-6 lg:px-8 lg:py-24 py-12 bg-gradient-to-t from-gray-100 ">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <h1 className="mb-12 text-4xl font-medium tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-6xl">
            {blog.name}
          </h1>
          {blog.description && (<div className="mb-12">
            <p className="max-w-3xl text-2xl font-medium text-gray-500">{blog.description}</p>
          </div>)}
        </div>
        <div className="mt-16 pb-14">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {documents?.map((post) => {

                const fullSlug = `/resources/${blog.url}/${post.url}`
                const imageUrl = post.cover? `https://builder6.steedos.cn` + `/api/files/images/${post.cover}` : 'https://cdn.sanity.io/images/ssqh4ksj/production/c734dd394de943820a25b4b96eace0855ab44749-2016x1344.png?w=1170&h=780&auto=format'
                return (
                  <div 
                    key={post.slug}
                    className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md ring-1 shadow-black/5 ring-black/5">
                    <img alt="A crossed out European emblem" src={imageUrl} className="aspect-3/2 w-full rounded-2xl object-cover"/>
                    <div className="flex flex-1 flex-col p-8">
                      <div className="text-sm/5 text-gray-700">{moment(post.modified).format('LL')}</div>
                      <div className="mt-2 text-lg font-medium">
                        <a data-headlessui-state="hover" href={fullSlug} data-hover=""><span className="absolute inset-0"></span>{post.name}</a>
                      </div>
                      <div className="mt-2 flex-1 text-sm/6 text-gray-500">{post.summary}</div>
                      {/* <div className="mt-6 flex items-center gap-3">
                        <img alt="" src="https://cdn.sanity.io/images/ssqh4ksj/production/cd1ee59e9e4c2ff30c303de6c7d1066c057419d5-7952x5304.jpg?rect=2370,0,5304,5304&amp;w=64&amp;h=64&amp;auto=format" className="aspect-square size-6 rounded-full object-cover"/>
                        <div className="text-sm/5 text-gray-700">Marcus Eldridge</div>
                      </div> */}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      </div>
    </div>
    );
  }

  return null;
}