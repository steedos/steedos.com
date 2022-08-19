import React from 'react'
import Head from 'next/head'
import ReviewStars from '@/components/product/ReviewStars'
import Price from '@/components/product/Price'
import { Markdown } from '@/components/Markdown'

import { getCollectionProducts, getCollections } from '@/lib/product';

import { getDefaultPrice } from '@/lib/product.client';

export async function getStaticProps({params}) {
  const { slug } = params
  const collection = await getCollectionProducts(slug)
  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection: collection
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}

export async function getStaticPaths() {
  const items = await getCollections()

  // Get the paths we want to pre-render based on posts
  const paths = items.map((item) => ({
    params: { 
      slug: item.slug },
  }))
  console.log('Building Product Collections...');
  console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default class Collection extends React.Component {
  
  render(){
    const { collection } = this.props;
    return (
      <>
          <main className="products-heading mb-20">

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="py-24 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-white">{collection.name}</h1>
                <p className="mt-4 max-w-3xl mx-auto">
                  {collection.body}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                {collection?.products?.map((product) => {

                  const imageUrl = product.image?process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL + `/api/files/images/${product.image}` : null
                  return (
                  <div
                    key={product.slug}
                    className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
                  >
                    <div className="aspect-w-5 aspect-h-3 bg-gray-200 group-hover:opacity-75">
                      <img
                        src={imageUrl}
                        className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                      />
                    </div>
                    <div className="flex-1 p-4 space-y-2 flex flex-col">
                      <h3 className="text-lg font-medium text-gray-900">
                        <a href={`/products/${product.slug}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="text-sm text-gray-500">{product.vender__expand?.name}</p>
                      <p className="text-sm text-gray-500">{product.description}</p>
                      <div className="flex-1 flex items-center justify-between">
                        <p className="text-sm italic text-gray-500"><ReviewStars rating={product.rating}/></p>
                        <p className="text-base font-medium text-gray-900"><Price price={getDefaultPrice(product)}></Price></p>
                      </div>
                    </div>
                  </div>
                  // <a key={`/products/${product.slug}`} href={`/products/${product.slug}`}>
                  //   <li key={`/products/${product.slug}`} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                  //     {/* <div className="relative bg-gray-100 pt-[50%] overflow-hidden" style={{paddingTop:'50%'}}>
                  //       <div className="absolute inset-0 w-full h-full rounded-t-lg overflow-hidden">
                  //         <img src={meta.image} alt="" className="absolute inset-0 w-full h-full"/>
                  //       </div>
                  //     </div> */}
                  //     <div className=" p-6 space-y-6">
                  //       <div className="w-full flex items-center justify-between space-x-6 text-right">
                  //         <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src={`${process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL}/api/files/images/${product.image}`} alt=""/>
                  //         <div className="flex-1 truncate">
                  //           <div className="flex items-center space-x-3">
                  //             <h3 className="text-gray-900 text-sm font-medium truncate"></h3>
                  //           </div>
                  //           <Price price={getDefaultPrice(product)}></Price>
                  //         </div>
                  //       </div>
                  //       <div className="">
                  //         <div className="space-y-2">
                  //             <h2 className="text-xl font-bold tracking-tight truncate text-gray-900">{product.name}
                  //             </h2>
                  //             {/* <dl>
                  //               <dt className="sr-only">Published on</dt>
                  //               <dd className="text-base font-medium text-gray-600">
                  //                 <time dateTime={meta.date}>
                  //                   {postDateTemplate.render(new Date(meta.date))}
                  //                 </time>
                  //               </dd>
                  //             </dl> */}
                  //             <dl>
                  //               <dt className="sr-only"></dt>
                  //               <dd className="text-base font-medium text-gray-500">
                  //               {product.vender__expand?.name}
                  //               </dd>
                  //             </dl>
                  //             <div className="prose max-w-none text-sm text-gray-500 line-clamp-3">
                  //               {product.description}
                  //             </div>
                  //           </div>
                  //       </div>
                  //     </div>
                      
                  //     <div className=''>
                  //       <div className="-mt-px flex divide-x divide-gray-200">
                  //         <div className="w-0 flex-1 flex items-center justify-between">
                  //           <div className="relative px-6 py-4">
                  //             <ReviewStars rating={product.rating}/>
                  //           </div>
                  //           <div className="relative text-right justify-right px-6 py-4 text-sm text-blue-700 font-medium border border-transparent rounded-bllg hover:text-blue-500">
                  //             <span>了解更多</span>
                  //           </div>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </li>
                  // </a>
                  )
                })}
              </div>
            </div>
          </main>
      </>
    )
  }
}
