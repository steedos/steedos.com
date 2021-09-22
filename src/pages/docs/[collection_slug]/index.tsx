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
    <div className="text-black mx-auto max-w-screen-lg lg:py-16 py-10">
      <h1 className="md:text-4xl text-2xl text-center font-bold pb-16">
        {name}
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-8">
        {documents && documents.map((article: any) => {
          const fullSlug = `/docs/${slug}/${article.slug}`
          return (
            <div key={fullSlug} className="flex flex-col">
            
              <Link href={fullSlug}>
                <a>
                  <h2 className="md:text-2xl text-xl font-bold leading-tighter">
                    {article.name}
                  </h2>
                </a>
              </Link>
             
            </div>
          )
        })}
      </div>
    </div>
  </>
  )
}

export default Collection;
