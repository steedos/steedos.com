import Link from 'next/link'
import * as React from 'react'
import Image from 'next/image'
import friendlyTime from 'friendly-time'
import {NextSeo} from 'next-seo'
import { ROOT_URL } from '@/lib/base.client'
import removeMarkdown from 'remove-markdown'
import { getCollection } from '@/lib/document';
import tinytime from 'tinytime'
import { Markdown } from '@/components/Markdown'

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
        description={removeMarkdown(description)}
      />
    <div className="text-black mx-auto max-w-screen-lg w-full lg:py-16 py-10">
      <main>
        <div className="divide-y divide-gray-200">
          <div className="pt-6 pb-8 space-y-2 md:space-y-5">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl md:text-[4rem] md:leading-[3.5rem]">
            {name}
            </h1>
            <Markdown body={description}></Markdown>
          </div>
        </div>
        <ul className="divide-y divide-gray-200">
        {documents && documents.map((article: any) => {
          const fullSlug = `/docs/${slug}/${article.slug}`
          return (
          <li className="py-12" key={fullSlug}>
            <article className="sm:flex lg:col-span-7">
              {/* <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium text-gray-500">
                  <time datetime="2021-08-11T19:30:00.000Z">August 12, 2021</time>
                </dd>
              </dl> */}
              <div className="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                {article.image && <Image
                    src={`${ROOT_URL}/api/files/images/${article.image}`}
                    alt={article.name}
                    width={160}
                    height={160}
                    quality={100}
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                  />
                }
              </div>
              <div className="mt-6 sm:mt-0 sm:ml-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight">
                    <Link href={fullSlug}>
                        <a className="text-gray-900">{article.name}</a>
                    </Link>
                  </h2>
                  <div className="prose max-w-none text-gray-500">
                    <div className="prose max-w-none">
                      <p>{article.summary}</p>
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
