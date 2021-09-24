import Link from 'next/link'
import * as React from 'react'
import Image from 'next/image'
import friendlyTime from 'friendly-time'
import {NextSeo} from 'next-seo'

import { getCollection } from '@/lib/document';
import tinytime from 'tinytime'

const UpdatedAt: React.FunctionComponent<{date: string}> = ({date}) => (
  <div>{date}</div>
)

export async function getServerSideProps({params, res}) {
  const { collection_slug } = params;
  const collection = await getCollection(collection_slug);
  
  return {
    props: {
      ...collection
    }
  }
}

const Collection: React.FC = (props: any) => {
  const {name, slug, description, documents} = props;

  return (
    <>
      <NextSeo
        title={`${name}`}
        description={description}
      />
    <div className="text-black mx-auto max-w-screen-lg w-full lg:py-16 py-10">
      <main>
        <div className="divide-y divide-gray-200">
          <div className="pt-6 pb-8 space-y-2 md:space-y-5">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-[4rem] md:leading-[3.5rem]">
            {name}
            </h1>
            <p className="text-lg text-gray-500">{description}</p>
          </div>
        </div>
        <ul className="divide-y divide-gray-200">
        {documents && documents.map((article: any) => {
          const fullSlug = `/docs/${slug}/${article.slug}`
          return (
          <li className="py-12" key={fullSlug}>
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
              {/* <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium text-gray-500">
                  <time datetime="2021-08-11T19:30:00.000Z">August 12, 2021</time>
                </dd>
              </dl> */}
              <div className="space-y-5 xl:col-span-3">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">
                    <Link href={fullSlug}>
                        <a className="text-gray-900">{article.name}</a>
                    </Link>
                  </h2>
                  <div className="prose max-w-none text-gray-500">
                    <div className="prose max-w-none">
                      {/* <p>Almost 6 months in the making, we finally released <a href="https://tailwindui.com/#product-ecommerce">Tailwind UI Ecommerce</a> — the first all-new component kit for Tailwind UI since the initial launch back in February 2020.</p> */}
                    </div>
                  </div>
                </div>
                <div className="text-base font-medium">
                  <a className="text-teal-600 hover:text-teal-700" aria-label={article.name} href={fullSlug}>阅读更多 →</a>
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
