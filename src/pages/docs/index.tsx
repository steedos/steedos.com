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

export async function getServerSideProps(ctx) {
  const collections = await getCollections();
  return {
    props: {
      collections: collections
    }
  }
}

const Collection: React.FC = (props: any) => {
  console.log(`props`, props)
  const { collections } = props;
  const name = '文档中心';
  const description = '';
  return (
    <>
      <NextSeo
        title={`${name}`}
        description={description}
      />
    <div className="text-black mx-auto max-w-screen-lg w-full lg:py-16 py-10">
      <main>
        <div className="divide-y divide-gray-200">
          <div className="py-6 space-y-2 md:space-y-5">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-[4rem] md:leading-[3.5rem]">
            {name}
            </h1>
            <p className="text-lg text-gray-500">{description}</p>
          </div>
        </div>
        <ul className="divide-y divide-gray-200">
        {collections && collections.map((article: any) => {
          const fullSlug = `/docs/${article.slug}`
          return (
          <li className="py-12" key={fullSlug}>
            <article className="sm:flex lg:col-span-7">
              <div className="mt-6 sm:mt-0">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight">
                    <Link href={fullSlug}>
                        <a className="text-gray-900">{article.name}</a>
                    </Link>
                  </h2>
                  <div className="prose max-w-none text-gray-500">
                    <div className="prose max-w-none">
                      <Markdown body={article.description}></Markdown>
                    </div>
                  </div>
                  <div className="text-base font-medium">
                    <a className="text-teal-600 hover:text-teal-700" aria-label={article.name} href={fullSlug}>阅读更多 →</a>
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
