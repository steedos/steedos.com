import { useRouter } from 'next/router'

import {NextSeo} from 'next-seo'
import { getProjectById, getBlogByUrl, getDocumentByUrl } from '@/b6/interfaces';
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
        <div class="max-w-3xl mx-auto pt-16 pb-10 px-4">
            <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 md:text-4xl ">{document.name}</h1>
            <div class="prose prose-lg py-10">
              <Markdown body={document.markdown} className=""></Markdown>
            </div>
        </div>
      </>

    );
  }

  return null;
}