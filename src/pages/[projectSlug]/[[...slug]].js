import { useRouter } from 'next/router'

import {NextSeo} from 'next-seo'
import { getProjectById, getProjectBySlug, getProjectPageByUrl } from '@/b6/interfaces';
import { RenderBuilderContent } from '@/b6/components/builder6';

export async function getStaticProps({params, query}) {
  const projectSlug = params.projectSlug;
  let pageUrl = '/' + (params.slug?.join('/') || '');
  console.log('pageUrl', pageUrl)

  const baseId = "spc-66722b5a71056405ab198b56"
  const defaultProjectId = "ced85241-276f-4d0f-8cfc-84c49d78adee"

  let project = await getProjectBySlug(baseId, projectSlug);

  if (!project) {
    project = await getProjectById(baseId, defaultProjectId);
    pageUrl = '/' + projectSlug + pageUrl;
  }

  if (!project) return {};

  const page = await getProjectPageByUrl(baseId, project._id, pageUrl);

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project,
      page: page
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

export default function PageDetail({page}){

  // console.log('PageDetail', page)
  if (page && page.builder) {
    const builderJson = JSON.parse(page.builder)
    builderJson.name = page.name;
    return (
      <>

        {/* Render the Builder page */}
        <RenderBuilderContent content={builderJson}/>
      </>
    );
  }

  return null;
}