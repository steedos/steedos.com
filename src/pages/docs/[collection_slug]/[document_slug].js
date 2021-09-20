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
import { getDocument} from '@/lib/document';
import {NextSeo} from 'next-seo'
import { Heading } from '@/components/Heading';
import { Markdown } from '@/components/Markdown'


export async function getServerSideProps({
  params,
  res,
}) {

  const { collection_slug, document_slug } = params;
  const document = await getDocument(collection_slug, document_slug);
  if (!document) {
    res.statusCode = 404;
    res.end()
    return {props: {}}
  }
  
  return {
    props: {
      ...document
    }
  }
}

export default function Document(props) {

  const router = useRouter()

  const {
    name = 'Missing title',
    body,
  } = props

  const title = name;
  const description = ''
  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
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
      <article className="mx-auto max-w-screen-md lg:mt-14 md:mt-8 mt-3 mb-16">
        <header>
          <h1 className="text-black max-w-screen-md lg:text-5xl md:text-4xl sm:text-3xl text-2xl w-full font-extrabold mb-8 lg:mb-10 leading-tighter">
            {name}
          </h1>
          {/* {author && <Author author={author} />} */}
          {/* {imageUrl && (
            <div className="mt-4">
              <Image
                src={imageUrl}
                alt={title}
                width={1280}
                height={720}
                quality={100}
                className="rounded-lg"
              />
            </div>
          )} */}
          {/* {tags && (
            <ul>
              Posted in
              {tags.map((tags: any) => (
                <li key={tags}>{tags}</li>
              ))}
            </ul>
          )} */}
        </header>
        <main className="">
          <Markdown body={body}></Markdown>
        </main>
      </article>
    </>
  )
}
