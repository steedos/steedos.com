import { useRouter } from 'next/router'

import {NextSeo} from 'next-seo'
import { getProjectById, getProjectBySlug, getProjectPageByUrl, getComponent, getPageBlocks } from '@/b6/interfaces';
import { RenderBuilderContent } from '@/b6/components/builder6';
import RenderLiquidComponent from '@/b6/components/liquid-component';
import _ from 'lodash';

export async function getStaticProps({params, query}) {
  const projectSlug = params.projectSlug;
  let pageUrl = '/' + (params.slug?.join('/') || '');
  console.log('pageUrl', pageUrl, projectSlug)

  const baseId = "spc-66722b5a71056405ab198b56"
  const defaultProjectId = "ced85241-276f-4d0f-8cfc-84c49d78adee"

  let project = await getProjectBySlug(baseId, projectSlug);
  if (project) {
    // 循环 project.tabs，如果 tab.type === page, 则 tab.url = '/' + project.slug + tab.url
    project.tabs = project.tabs.map(tab => {
      if (tab.type === 'page') {
        tab.url = '/' + project.slug + tab.url;
      }
      return tab;
    });
  }

  if (!project) {
    project = await getProjectById(baseId, defaultProjectId);
    pageUrl = '/' + projectSlug + pageUrl;
  }

  if (!project) {
    return {
      notFound: true,
    }
  }

  const page = await getProjectPageByUrl(baseId, project._id, pageUrl);

  if (!page) {
    return {
      notFound: true,
    }
  }

  let blocks = await getPageBlocks(baseId, page._id);
  blocks = _.orderBy(blocks, [(item) => item['sort']], ['asc']);

  let header = null; //await getComponent(baseId, "header");
  let footer = null; //await getComponent(baseId, "footer");
  let mainMenu = project.enable_tabs ? await getComponent(baseId, "main-menu") : null;

  return {
    props: {
      project,
      page,
      blocks,
      header,
      mainMenu,
      footer
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

export default function PageDetail({project, page, header, footer, mainMenu, blocks}){

  console.log('PageDetail', project)
  if (page && page.builder) {
    const builderJson = JSON.parse(page.builder)
    builderJson.name = page.name;
    return (
      <>
        {header && (
          <RenderLiquidComponent component={header} data={{project}} />
        )}

        
        {mainMenu && (
          <div className='sticky z-30 top-0 left-0 w-full'>
            <RenderLiquidComponent component={mainMenu} data={{...project, project}} />
          </div>
        )}

        {/* Render the Builder page */}
        <RenderBuilderContent content={builderJson}/>

        {/* 循环blocks，并输出 RenderBuilderContent */}
        {blocks && blocks.map((block, index) => {
          const blockJson = JSON.parse(block.builder)
          blockJson.name = block.name;
          return (
            <RenderBuilderContent key={index} content={blockJson}/>
          )
        })}

        {footer && (
          <RenderLiquidComponent component={footer} data={{project}} />
        )}
      </>
    );
  }

  return null;
}