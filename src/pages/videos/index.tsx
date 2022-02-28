import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getVideos,  } from '@/lib/video';
import {NextSeo} from 'next-seo'
import { Markdown } from '@/components/Markdown'

export async function getStaticProps( {params,} ) {
  const videos = await getVideos();
  
  return {
    props: {
      videos
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}

const SiteVideos: React.FC = (props: any) => {
  const { videos } = props;
  const name = '视频中心';
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
          欢迎使用华炎魔方低代码平台，您可以免费访问这里的视频。我们为商业用户提供VIP支持服务，<a href="/collections/services" target="_blank">了解更多</a>。
          </p>
        </div>
      </div>
    </div>
    <div className="text-black mx-auto max-w-screen-lg w-full lg:py-16 py-10 px-6">
      <main>
        <ul className="">
        {videos && videos.map((videos_collection: any) => {
          return (
          <li className="py-12" key={videos_collection._id}>
            <article className="">
              <div className="mt-6 sm:mt-0">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">
                    {videos_collection.name}
                  </h2>
                  <div className="prose max-w-none text-gray-500">
                    <div className="prose max-w-none">
                      <Markdown body={videos_collection.description}></Markdown>
                    </div>
                  </div>
                  <div className="text-base font-medium">
                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {videos_collection.videos && videos_collection.videos.map((video: any) => {                        
                        const docSlug = `/videos/${video.slug}`
                        return (
                        <div
                          key={video._id}
                          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <div className="flex-1 min-w-0">
                            <a href={docSlug} className="focus:outline-none">
                              <span className="absolute inset-0" aria-hidden="true" />
                              <p className="text-md font-medium text-gray-900">{video.name}</p>
                            </a>
                          </div>
                        </div>
                      )})}
                    </div>
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

const IconPlaceholder = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        fill="currentColor"
      />
    </g>
  </svg>
)

export default SiteVideos;
