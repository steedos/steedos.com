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
import {fromMarkdown} from 'mdast-util-from-markdown';

import BananaSlug from 'github-slugger'
import EmptyLayout from '@/layouts/EmptyLayout'
import { Header } from '@/components/Header'

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
  const currentSection = 'xxx'
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
      />
      <Header/>      
<div className="relative flex w-full bg-white lg:bg-gray-50">
  <div className="hidden lg:block absolute top-0 bottom-0 right-0 left-1/2 bg-white"></div>
  <div className="relative flex w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="w-full flex-none lg:grid lg:grid-cols-3 lg:gap-8">
      <div className="bg-gray-50 lg:bg-transparent -mx-4 sm:-mx-6 lg:mx-0 py-12 sm:py-16 px-4 sm:px-6 lg:pl-0 lg:pr-8">
        <nav aria-label="Table of contents" className="text-sm max-w-[37.5rem] mx-auto lg:max-w-none lg:mx-0 lg:fixed w-full h-full lg:pb-16 top-0 lg:pt-32 overflow-y-auto" x-data="TableOfContents()" x-init="init()">
        <ul role="list" className="space-y-8 border-l border-gray-200 pl-6">
        {tableOfContents.map((section) => {
          let sectionIsActive =
            currentSection === section.slug ||
            section.children.findIndex(({ slug }) => slug === currentSection) > -1

          return (
            <Fragment key={section.slug}>
            <li className="space-y-3">
              <a href={`#${section.slug.toLowerCase()}`} className="block font-medium transition-colors duration-300 text-teal-600">{section.title}</a>
              <ul role="list" className="space-y-3">

              {section.children.map((subsection) => {
                let subsectionIsActive = currentSection === subsection.slug

                return (
                <li className="ml-4" key={subsection.slug}>
                  <a href={`#${subsection.slug.toLowerCase()}`} className="block transition-colors duration-300">{subsection.title}</a>
                </li>
                )
              })}
              </ul>
            </li>   
            </Fragment>
          )})}         
          </ul>
          <div className="absolute top-0 left-0 w-px bg-teal-500 origin-top transition-transform duration-300"></div>
        </nav>
      </div>
      <div className="relative col-span-2 lg:-ml-8 bg-white lg:shadow-md">
        <div className="hidden lg:block absolute top-0 bottom-0 -right-4 w-8 bg-white"></div>
        
        <div className="relative py-16 lg:px-16">
          <div className="pb-10 border-b border-gray-200 mb-10">
            <div>
              <h1 className="inline-block text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
            </div>
            <p className="mt-1 text-lg text-gray-500"></p>
          </div>
          <div className="prose mx-auto">
            <Markdown body={body}></Markdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}


Document.layoutProps = {
  Layout: EmptyLayout
}