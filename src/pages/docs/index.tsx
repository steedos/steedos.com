import Link from 'next/link'
import * as React from 'react'
import Image from 'next/image'
import friendlyTime from 'friendly-time'
import {NextSeo} from 'next-seo'
import { ROOT_URL } from '@/lib/base.client'

import { getCollections } from '@/lib/document';
import tinytime from 'tinytime'
import { Markdown } from '@/components/Markdown'

const UpdatedAt: React.FunctionComponent<{date: string}> = ({date}) => (
  <div>{date}</div>
)

export async function getStaticProps(ctx) {
  const collections = await getCollections();
  return {
    props: {
      collections: collections
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}

const Collection: React.FC = (props: any) => {
  console.log(`props`, props)
  const { collections } = props;
  const name = '文档中心';
  const description = '欢迎使用华炎魔方低代码平台。';
  return (
    <>
      <NextSeo
        title={`${name}`}
        description={description}
      />
    <div className="bg-white">
      <div className=" max-w-screen-lg mx-auto pt-16 px-4 sm:pt-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          {name}
          </h2>
          <p className="prose max-w-xl mt-5 mx-auto text-xl text-gray-500">
          欢迎使用华炎魔方低代码平台，您可以免费访问这里的文档。我们为商业用户提供VIP支持服务，<a href="/collections/services" target="_blank">了解更多</a>。
          </p>
        </div>
      </div>
    </div>
    <div className="text-black mx-auto max-w-screen-lg w-full lg:py-16 py-10 px-6">
      <main>
        <ul className="">
        {collections && collections.map((collection: any) => {
          const collectionSlug = `/docs/${collection.slug}`
          return (
          <li className="py-12" key={collection._id}>
            <article className="">
              <div className="mt-6 sm:mt-0">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">
                    <Link href={collectionSlug}>
                        <a className="text-gray-900">{collection.name}</a>
                    </Link>
                  </h2>
                  <div className="prose max-w-none text-gray-500">
                    <div className="prose max-w-none">
                      <Markdown body={collection.description}></Markdown>
                    </div>
                  </div>
                  <div className="text-base font-medium">
                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {collection.documents && collection.documents.map((document: any) => {                        
                        const docSlug = `/docs/${collection.slug}/${document.slug}`
                        return (
                        <div
                          key={document._id}
                          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <div className="flex-shrink-0">
                            {document.image && <img
                              src={`${process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL}/api/files/images/${document.image}`}
                              alt={document.name}
                              width={160}
                              height={160}
                              className="h-10 w-10 rounded-full"
                            />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <a href={docSlug} className="focus:outline-none">
                              <span className="absolute inset-0" aria-hidden="true" />
                              <p className="text-md font-medium text-gray-900">{document.name}</p>
                            </a>
                          </div>
                        </div>
                      )})}
                    </div>
                    {/* <a className="text-teal-600 hover:text-teal-700" aria-label={collection.name} href={collectionSlug}>阅读所有 →</a> */}
                  </div>
                </div>
              </div>
            </article>
          </li>
            )
          })}
        </ul>
      </main>
    </div>
  </>
  )
}

export default Collection;
