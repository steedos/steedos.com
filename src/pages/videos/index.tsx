import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getVideos,  } from '@/lib/video';
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
  return (
    <div className="mx-auto max-w-3xl lg:max-w-7xl lg:pt-16 pt-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="mt-1 text-3xl font-extrabold sm:text-4xl sm:tracking-tight lg:text-5xl text-black dark:text-white">
        {name}
        </h2>
        {/* <p className="prose max-w-xl mt-5 mx-auto text-xl text-gray-500">
        欢迎使用华炎魔方低代码平台，您可以免费访问这里的视频。
        </p> */}
      </div>
      <div className="mx-auto w-full lg:py-16 py-6 px-1">
      {videos && videos.map((video_collection: any) => {
        return (
          <div className="pt-4" key={video_collection._id}>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
            {video_collection.name}
          </h2>
          {/* <div className="text-gray-500 py-2">
            {video_collection.description}
          </div> */}
          <div className="py-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {video_collection && video_collection.videos.map((video: any) => {
              return (
                <div key={`${video.slug}`} className="flex flex-col border border-solid  rounded-lg border-slate-100">
                  {video.thumb_image ? (
                    <div className="md:mb-2 mb-2">
                      <Link href={`/videos/${video.slug}`}>
                        <a>
                          <img
                            src={`${process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL}/api/files/images/${video.thumb_image}`}
                            alt={video.name}
                            width={1280}
                            height={720}
                            className="rounded-t-lg"
                          />
                        </a>
                      </Link>
                    </div>
                  ) : (
                    <div className="aspect-w-16 aspect-h-9 md:mb-4 mb-2">
                      <Link href={`/videos/${video.slug}`}>
                        <a>
                          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-600">
                            <IconPlaceholder />
                          </div>
                        </a>
                      </Link>
                    </div>
                  )}
                  <Link href={`/videos/${video.slug}`}>
                    <a className="px-4 py-2">
                      <b className="text-lg font-medium text-gray-900">
                        {video.name}
                      </b>
                    </a>
                  </Link>
                  {video.summary && (
                    <div className="dark:prose-dark text-sm text-gray-500 dark:text-white  p-4 pt-0">
                      {video.summary}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )})}
      </div>
    </div>
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
