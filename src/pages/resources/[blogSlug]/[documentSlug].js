import { useRouter } from 'next/router'

import {NextSeo} from 'next-seo'
import { getProjectById, getBlogByUrl, getDocumentByUrl } from '@/b6/interfaces';
import { RenderBuilderContent } from '@/b6/components/builder6';
import { Markdown } from '@/components/Markdown'
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
  blog.href = '/resources/' + blog.url;

  const document = await getDocumentByUrl(baseId, blog._id, params.documentSlug);

  if (!document) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      blog,
      document
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

export default function PageDetail({blog, document}){

  // console.log('post', document)
  if (document && document.markdown) {
    return (
      <>
        <NextSeo
        title={document.name}
        description={document.description}
        />
        <div class="mx-auto max-w-2xl lg:max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
            <div class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"><span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span><span class="ml-3">{moment(document.modified).format('LL')}</span></div>
            <h1 class="mt-2 text-4xl font-bold tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-5xl sm:leading-[1.3]">{document.name}</h1>
            <div class="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
              <div class="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
                <div class="flex flex-wrap gap-2">
                  <a class="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500" data-headlessui-state="" href={blog.href}>{blog.name}</a>
                </div>
              </div>
              <div class="prose prose-lg max-w-3xl xl:mx-auto">
                <Markdown body={document.markdown} className=""></Markdown>
              </div>
            </div>
        </div>
      </>

    );
  }

  return null;
}