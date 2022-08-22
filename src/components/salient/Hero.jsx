import Image from 'next/future/image'

import { SearchButton } from '@/components/Search'
import { Player } from '@/components/player'
import { Button } from '@/components/salient/Button'
import { Container } from '@/components/salient/Container'
import logoLaravel from '@/images/logos/laravel.svg'
import logoMirage from '@/images/logos/mirage.svg'
import logoStatamic from '@/images/logos/statamic.svg'
import logoStaticKit from '@/images/logos/statickit.svg'
import logoTransistor from '@/images/logos/transistor.svg'
import logoTuple from '@/images/logos/tuple.svg'

export function Hero() {
  return (
    <Container className="pt-20 pb-16 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl leading-tight sm:leading-tight	">
      新一代{' '}
        <span className="relative whitespace-nowrap text-blue-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">低代码 DevOps 平台</span> 
        </span>{' '}<br/>
        赋能企业，加速数字化转型

      </h1>
      <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
      华炎魔方是 Salesforce DX 敏捷开发平台的开源替代方案，将低代码技术融入传统开发工作中，为应用开发的整个生命周期赋能，
            实现敏捷开发的新高度。
      </p>
      {/* <div className="mt-10 flex justify-center gap-x-6">
        <Button href="/register">Get 6 months free</Button>
        <Button
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          variant="outline"
        >
          <div>
            <svg
              aria-hidden="true"
              className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
            >
              <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
            </svg>
            <span className="ml-3">Watch video</span>
          </div>
        </Button>
      </div> */}
      <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
        <a href="/docs/" className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
          快速开始
        </a>
        <SearchButton className="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700">
          {({ actionKey }) => (
            <>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-none text-slate-300 dark:text-slate-400"
                aria-hidden="true"
              >
                <path d="m19 19-3.5-3.5" />
                <circle cx="11" cy="11" r="6" />
              </svg>
              <span className="flex-auto">快速搜索...</span>
              {actionKey && (
                <kbd className="font-sans font-semibold dark:text-slate-500">
                  <abbr
                    title={actionKey[1]}
                    className="no-underline text-slate-300 dark:text-slate-500"
                  >
                    {actionKey[0]}
                  </abbr>{' '}
                  K
                </kbd>
              )}
            </>
          )}
        </SearchButton>
      </div>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 md:px-8 mt-10 ">
        <div className='w-[360px] h-[200px] sm:w-[640px] sm:h-[360px] mx-auto aspect-video'>
          <Player
            // ref={playerRef}
            className=" rounded-lg"
            hls_url='https://vod.steedos.cn/video/175146ea-1772962056e-0000-0000-009-c59e0.mp4'
            light={`${process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL}/api/files/images/uYfiSbnj7Ms7djamt`}
            width="100%"
            height="100%"
          />
        </div>
      </div>
      {/* <div className="mt-36 lg:mt-44">
        <div className="font-display text-xl font-bold text-slate-900">
          成功案例
        </div>
        <div className='inline-flex items-center justify-center max-w-xl'>
          <img src="https://console.steedos.cn/api/files/images/79TdqbwrTdSmihKw5"/>
        </div>
      </div> */}
    </Container>
  )
}
