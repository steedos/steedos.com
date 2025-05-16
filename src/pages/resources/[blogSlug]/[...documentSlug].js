import { useRouter } from 'next/router'

import {NextSeo} from 'next-seo'
import { getProjectById, getBlogByUrl, getDocumentByUrl } from '@/b6/interfaces';

import { useMemo } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import visit from 'unist-util-visit';
import BananaSlug from 'github-slugger'

import { Markdown } from '@/components/Markdown'
import moment from 'moment'
import 'moment/locale/zh-cn'   // 如果你要用中文环境

const slugs = new BananaSlug()

moment.locale('zh-cn')        // 全局设置为中文

const parseHeadings = (markdownText) => {
  // 1. 先把 markdown 文本转成 AST
  const tree = unified().use(remarkParse).parse(markdownText);

  // 2. 找到文档中最小的标题深度
  let minDepth = Infinity;
  visit(tree, 'heading', (node) => {
    if (node.depth < minDepth) {
      minDepth = node.depth;
    }
  });
  console.log(tree, minDepth)

  // 如果文档里根本没有 heading，就返回空数组
  if (minDepth === Infinity) {
    return [];
  }

  // 3. 再次遍历，收集 depth 等于最小值的标题文本
  const headings = [];
  visit(tree, 'heading', (node) => {
    if (node.depth === 2) {
      const headingText = node.children
        .filter((child) => child.type === 'text')
        .map((child) => child.value)
        .join('');
        headings.push(headingText.trim());
    }
  });

  return headings;
};

export async function getStaticProps({params, query}) {

  
  const baseId = "spc-66722b5a71056405ab198b56"
  const projectId = "ced85241-276f-4d0f-8cfc-84c49d78adee"

  const project = await getProjectById(baseId, projectId);
  if (!project)  {
    console.log('project not found', projectId)
    return {
      notFound: true,
    }
  }

  const blog = await getBlogByUrl(baseId, params.blogSlug);
  if (!blog) {
    console.log('blog not found', params.blogSlug)
    return {
      notFound: true,
    }
  }
  blog.href = '/resources/' + blog.url;

  let documentSlug = params.documentSlug.join('/');
  const document = await getDocumentByUrl(baseId, blog._id, documentSlug);

  if (!document) {
    console.log('document not found', documentSlug)
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
  const headings = useMemo(() => parseHeadings(document.markdown), [document]);


  if (document && document.markdown) {
    const title = document.name + ' - ' + blog.name + ' - Steedos';
    const cover = `https://builder6.steedos.cn/api/files/images/${document.cover}`
    const url =  `https://www.steedos.com/resources/${blog.url}/${document.url}`;
    return (
      <>
        <NextSeo
        title={title}
        description={document.description}
        openGraph={{
          url,
          title: document.name,
          description: document.description,
          images: [
            {
              url: cover,
            },
          ],
          siteName: blog.name,
        }}
        />
        {/* <div class="mx-auto max-w-2xl lg:max-w-7xl px-6 lg:px-8 py-16 lg:py-24">

            <div class="flex flex-wrap gap-2">
              <a class="rounded-full border border-dotted border-gray-300 bg-gray-50 px-4 py-1 font-medium text-gray-500" data-headlessui-state="" href={blog.href}>{blog.name}</a>
            </div>
            <h1 class="mt-4 text-4xl font-bold tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-5xl sm:leading-[1.3]">{document.name}</h1>
            <div class="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr]">
              <div class="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start sticky top-16" >
                <ul className="flex flex-col gap-4 border-l border-w-2 border-gray-500">
                {headings.map((h, index) => (
                  <li key={index} className='-ml-px flex flex-col items-start'>
                    <a class="text-lg inline-block border-l border-transparent pl-5 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 sm:pl-4" type="button" href={`#${h}`}>{h}</a>
                  </li>
                ))}
                </ul>
              </div>
              <div class="prose prose-lg max-w-4xl xl:mx-auto">
                {document.cover && (
                  <img src={`https://builder6.steedos.cn/api/files/images/${document.cover}`} class="mb-10 aspect-3/2 w-full rounded-2xl object-cover"/>
                )}
                <Markdown body={document.markdown} className=""></Markdown>
              </div>
            </div>
        </div> */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24"> 
          {/* 如果需要分类标签 / 标题 / 封面等区块，可以放在这里 */} 

          <div class="flex flex-wrap gap-2">
            <a class="rounded-full border border-dotted border-gray-300 bg-gray-50 px-4 py-1 font-medium text-gray-500" data-headlessui-state="" href={blog.href}>{blog.name}</a>
          </div>
          <h1 class="mt-4 text-4xl font-bold tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-5xl sm:leading-[1.3]">{document.name}</h1>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[20rem_1fr]"> 
            {/* 左侧目录：sticky */} 
            <aside className="self-start hidden lg:block lg:sticky top-32 h-max"> 
              <ul className="flex flex-col gap-6 border-l-2 border-gray-300 pl-4"> 
                {
                  headings.map((h, index) => {

                    slugs.reset()
                    const id = slugs.slug(h, true) 
                    return ( 
                    <li key={index}> 
                      <a href={`#${id}`} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors" > 
                        {h} 
                      </a> 
                  </li> )})
                } 
              </ul> 
            </aside>
            <main class="prose prose-lg max-w-4xl xl:mx-auto">
              {document.cover && (
                <img src={`https://builder6.steedos.cn/api/files/images/${document.cover}`} class="mb-10 aspect-video w-full rounded-2xl object-cover"/>
              )}
              {/* <div class="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"><span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span><span class="ml-3">{moment(document.modified).format('LL')}</span></div> */}

              <Markdown body={document.markdown} className=""></Markdown>
            </main>
          </div>
        </div>
      </>

    );
  }

  return null;
}