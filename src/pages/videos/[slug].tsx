import React, {FunctionComponent} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import get from 'lodash/get'
import Image from 'next/image'
import useSWR from 'swr'
import {useWindowSize} from 'react-use'
import {NextSeo} from 'next-seo'
import Head from 'next/head'
import removeMarkdown from 'remove-markdown'
import { getVideo } from '@/lib/video';
import { Markdown } from '@/components/Markdown'
import { Player } from '@/components/player'

const OFFSET_Y = 80
const VIDEO_MIN_HEIGHT = 480

export async function getServerSideProps({
  params,
  res,
  locale,
  locales,
  preview,
}) {
  // 这些只能在服务端引入，所以只能写在这里。
  
  // const markdownTOC = require('markdown-toc');

  const { slug } = params;
  const video = await getVideo(slug);
  if (!video) {
    return {
      notFound: true,
    }
  }

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  return {
    props: {
      title: video.name,
      ...video
    }
  }
}

const Video: FunctionComponent<any> = (props) => {
  const playerRef = React.useRef(null)
  const {height} = useWindowSize()
  const [videoMaxWidth, setVideoMaxWidth] = React.useState(0)

  React.useEffect(() => {
    setVideoMaxWidth(Math.round((height - OFFSET_Y) * 1.6))
  }, [height])

  
  const router = useRouter()
  
    const {
      title = 'Missing title',
      _id,
      body,
      download_url,
      duration,
      hls_url,
      is_free,
      name,
      owner,
      published_at,
      site,
      slug,
      subtitles_url,
      owner__expand,
      thumb_image
    } = props
  
  let seo_title_calc = title;
  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
  const imageUrl = thumb_image?process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL + `/api/files/images/${thumb_image}` : null
  return (
    <>
      <NextSeo
          title={seo_title_calc}
          openGraph={{
            title: seo_title_calc,
            url,
            images: [
              {
                url: imageUrl,
                alt: title,
              },
            ],
          }}
        />
      <Head>
        <script src="//cdn.bitmovin.com/player/web/8/bitmovinplayer.js" />
      </Head>
      <div>
        <div className="bg-black -mt-3 sm:-mt-5 -mx-5">
          <div
            className="w-full m-auto"
            style={{
              maxWidth:
                height > VIDEO_MIN_HEIGHT + OFFSET_Y
                  ? videoMaxWidth
                  : VIDEO_MIN_HEIGHT * 1.6,
            }}
          >
            <div
              className="w-full relative overflow-hidden bg-black text-white"
              style={{paddingTop: '56.25%'}}
            >
              <div className="absolute w-full h-full top-0 left-0">
                <Player
                  ref={playerRef}
                  hls_url={hls_url}
                  light={`${process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL}/api/files/images/${thumb_image}`}
                  width="100%"
                  height="100%"
                  config= {{
                    attributes: {
                      width: 'auto',
                      height: 'auto'
                    }
                    }
                  }
                  // subtitlesUrl={subtitles_url}
                />
              </div>
            </div>
          </div>
        </div>
        <main className="mx-auto max-w-screen-md lg:mt-14 md:mt-8 mt-3 mb-16">
          <article>
            <header>
                <h1 className="text-black max-w-screen-md lg:text-4xl md:text-4xl sm:text-3xl text-2xl w-full font-bold mb-8 lg:mb-10">
                  {name}
                </h1>
                {/* <div className="mt-2 flex items-center">
                    <a className="text-base dark:text-gray-400 text-gray-800 hover:text-blue-600 transition-colors ease-in-out duration-300 flex items-center">
                      <span className="ml-1">{owner__expand.name}</span>
                    </a>
                </div> */}
              </header>
              <Markdown body={body}></Markdown>
          </article>
        </main>
      </div>
    </>
  )
}

export default Video

