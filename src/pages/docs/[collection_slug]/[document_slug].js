import {
  useRef,
  useState,
  useEffect,
  createContext,
  Fragment,
  useCallback,
  isValidElement,
  useContext,
} from 'react'

import dynamic from 'next/dynamic'

import { useRouter } from 'next/router'
import Image from 'next/image'
import { getDocument, getDocuments} from '@/lib/document';
import {NextSeo} from 'next-seo'
import { Heading } from '@/components/Heading';
import { Markdown } from '@/components/Markdown'
import DocumentLayout from '@/layouts/DocumentLayout';
import {fromMarkdown} from 'mdast-util-from-markdown';

import BananaSlug from 'github-slugger'
import EmptyLayout from '@/layouts/EmptyLayout'

const slugs = new BananaSlug()

const getTableOfContents = (markdown) => {

  slugs.reset()
  const tree = fromMarkdown(markdown)
  
  const contents = []

  for (let i = 0; i < tree.children.length; i++) {
    let node = tree.children[i]

    if (node.type === 'heading' && [2, 3].includes(node.depth)) {
      const level = node.depth
      const title = node.children
        .filter((n) => n.type === 'text')
        .map((n) => n.value)
        .join('')
      let slug = slugs.slug(title, true) 

      // let allOtherSlugs = contents.flatMap((entry) => [
      //   entry.slug,
      //   ...entry.children.map(({ slug }) => slug),
      // ])
      // let i = 1
      // while (allOtherSlugs.indexOf(slug) > -1) {
      //   slug = `${title}-${i}`
      //   i++
      // }

      if (level === 2) {
        contents.push({ title, slug, children: [] })
      } else if (contents[contents.length - 1]){
        contents[contents.length - 1].children.push({ title, slug })
      }
    }
  }

  return contents
}

export async function getStaticProps({
  params,
  res,
}) {
  const { collection_slug, document_slug } = params;
  const document = await getDocument(collection_slug, document_slug);
  if (!document) {
    return {
      notFound: true,
    }
  }
  const tableOfContents = document.body? getTableOfContents(document.body): []
  
  return {
    props: {
      tableOfContents,
      ...document
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}


export async function getStaticPaths() {
  const documents = await getDocuments()

  // Get the paths we want to pre-render based on posts
  const paths = documents.map((document) => ({
    params: { 
      collection_slug: document.collection__expand.slug,
      document_slug: document.slug },
  }))
  console.log('Building Documents...');
  console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default function Document(props) {

  const router = useRouter()
  const {
    name = 'Missing title',
    tableOfContents,
    body,
    summary,
    collection__expand
  } = props

  let title = name;
  if (collection__expand) {
    title += ' - ' + collection__expand.name
  }
  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
  return (
    <>
      <NextSeo
        title={title}
        description={summary}
        openGraph={{
          title: title,
          description: summary,
          url,
          images: [
            // {
            //   url: imageUrl,
            //   alt: title,
            // },
          ],
        }}
        // twitter={{
        //   cardType: seo.cardType || 'summary_large_image',
        //   site: seo.site || 'eggheadio',
        //   handle: seo.handle,
        // }}
        // canonical={canonicalUrl}
      />
      <DocumentLayout meta={{title: name}}
        tableOfContents={tableOfContents}
      >
        <Markdown body={body}></Markdown>
      </DocumentLayout>
      
    </>
  )
}


Document.Layout = EmptyLayout