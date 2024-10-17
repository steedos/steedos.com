import { useRouter } from 'next/router'

import {NextSeo} from 'next-seo'
import { getProjectById, getBlogByUrl, getBlogDocuments } from '@/b6/interfaces';
import { RenderBuilderContent } from '@/b6/components/builder6';
import { Markdown } from '@/components/Markdown'

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
        {documents?.map((post) => {

          const fullSlug = `/resources/${blog.url}/${post.url}`
          const imageUrl = post.cover? `https://builder6.steedos.cn` + `/api/files/images/${post.cover}` : null
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
    );
  }

  return null;
}