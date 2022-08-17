import {
  useRef,
  useState,
  useEffect,
  createContext,
  Fragment,
  useCallback,
  isValidElement,
  useContext,
} from 'react'

import Error from 'next/error'
import dynamic from 'next/dynamic'

import { SidebarLayout } from '@/layouts/SidebarLayout'
import tinytime from 'tinytime'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getPost, getBlog, getPosts } from '@/lib/blog';
import {NextSeo} from 'next-seo'
// const {serialize} = require('next-mdx-remote/serialize')
// import { MDXRemote } from 'next-mdx-remote'
import { Heading } from '@/components/Heading';
import { Markdown } from '@/components/Markdown'
import {fromMarkdown} from 'mdast-util-from-markdown';


import { ContentsContext } from '@/layouts/ContentsLayout'

import BananaSlug from 'github-slugger'
import { Header } from '@/components/Header'

const slugs = new BananaSlug()

const getTOC = (markdown) => {

  slugs.reset()
  const tree = fromMarkdown(markdown)
  
  const contents = []

  for (let i = 0; i < tree.children.length; i++) {
    let node = tree.children[i]

    if (node.type === 'heading' && [2, 3].includes(node.depth)) {
      const level = node.depth
      const title = node.children
        .filter((n) => n.type === 'text')
        .map((n) => n.value)
        .join('')
      let slug = slugs.slug(title, true) 

      // let allOtherSlugs = contents.flatMap((entry) => [
      //   entry.slug,
      //   ...entry.children.map(({ slug }) => slug),
      // ])
      // let i = 1
      // while (allOtherSlugs.indexOf(slug) > -1) {
      //   slug = `${title}-${i}`
      //   i++
      // }

      if (level === 2) {
        contents.push({ title, slug, children: [] })
      } else if (contents[contents.length - 1]){
        contents[contents.length - 1].children.push({ title, slug })
      }
    }
  }

  return contents
}

function TableOfContents({ tableOfContents, currentSection }) {

  function isActive(section) {
    if (section.slug === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  let pageHasSubsections = tableOfContents.some((section) => section.children.length > 0)

  return (
    <>
      <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6 dark:text-slate-100">
        本页内容
      </h5>
      <ul className="text-slate-700 text-sm leading-6">
        {tableOfContents.map((section) => (
          <Fragment key={section.slug}>
            <li>
              <a
                href={`#${section.slug}`}
                className={clsx(
                  'block py-1',
                  pageHasSubsections ? 'font-medium' : '',
                  isActive(section)
                    ? 'font-medium text-sky-500 dark:text-sky-400'
                    : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                )}
              >
                {section.title}
              </a>
            </li>
            {section.children.map((subsection) => (
              <li className="ml-4" key={subsection.slug}>
                <a
                  href={`#${subsection.slug}`}
                  className={clsx(
                    'group flex items-start py-1',
                    isActive(subsection)
                      ? 'text-sky-500 dark:text-sky-400'
                      : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                  )}
                >
                  <svg
                    width="3"
                    height="24"
                    viewBox="0 -9 3 24"
                    className="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500"
                  >
                    <path
                      d="M0 0L3 3L0 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {subsection.title}
                </a>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
    </>
  )
}

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.slug)
  let [headings, setHeadings] = useState([])

  const registerHeading = useCallback((id, top) => {
    setHeadings((headings) => [...headings.filter((h) => id !== h.id), { id, top }])
  }, [])

  const unregisterHeading = useCallback((id) => {
    setHeadings((headings) => headings.filter((h) => id !== h.id))
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0 || headings.length === 0) return
    function onScroll() {
      let style = window.getComputedStyle(document.documentElement)
      let scrollMt = parseFloat(style.getPropertyValue('--scroll-mt').match(/[\d.]+/)?.[0] ?? 0)
      let fontSize = parseFloat(style.fontSize.match(/[\d.]+/)?.[0] ?? 16)
      scrollMt = scrollMt * fontSize

      let sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top)
      let top = window.pageYOffset + scrollMt + 1
      let current = sortedHeadings[0].id
      for (let i = 0; i < sortedHeadings.length; i++) {
        if (top >= sortedHeadings[i].top) {
          current = sortedHeadings[i].id
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll, {
        capture: true,
        passive: true,
      })
    }
  }, [headings, tableOfContents])

  return { currentSection, registerHeading, unregisterHeading }
}

export function PageHeader({ title, description, repo, badge = {}, section }) {
  if (!title && !description) return null

  return (
    <header id="header" className="relative z-20">
      <div>
        {section && (
          <p className="mb-2 text-sm leading-6 font-semibold text-sky-500 dark:text-sky-400">
            {section}
          </p>
        )}
        <div className="flex items-center">
          <h1 className="inline-block text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
            {title}
          </h1>
          {repo && (
            <a
              href={repo}
              className="ml-3 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 sm:mt-1 sm:ml-4"
            >
              <span className="sr-only">View on GitHub</span>
              <svg
                viewBox="0 0 16 16"
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          )}
        </div>
        {badge.key && badge.value && (
          <dl className="ml-3 mt-1.5 align-top inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-cyan-100 text-cyan-900 tracking-tight">
            <dt className="sr-only">{badge.key}</dt>
            <dd>{badge.value}</dd>
          </dl>
        )}
      </div>
      {description && (
        <p className="mt-6 text-lg text-slate-700 dark:text-slate-400">{description}</p>
      )}
    </header>
  )
}


export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}) {

  const { blog_slug, post_slug } = params;
  const blog = await getBlog(blog_slug);
  const post = blog? await getPost(blog_slug, post_slug):null;
  const errorCode = !blog || !post?404: 0;
  
  return {
    props: {
      errorCode,
      ...post,
      blog,
      background_image: '/img/header-background-ellipse.png'
    },
    revalidate: parseInt(process.env.NEXT_STATIC_PROPS_REVALIDATE), // In seconds
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { 
      blog_slug: post.blog__expand.slug,
      post_slug: post.slug },
  }))

  console.log('Building Blogs...');
  console.log(paths);
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default function Post(props) {

  const router = useRouter()

  const {
    errorCode,
    name = 'Missing title',
    body,
    blog, 
    summary,
    seo_title,
    image,
    background_image,
    // mdxSource,
  } = props

  const toc = getTOC(body)
  const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(toc)

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }


  let seo_title_calc = seo_title ? seo_title : name;
  if (blog && blog.name){
    seo_title_calc += ' - ' + blog.name
    // if (blog.site__expand) 
    //   seo_title_calc += ' | ' + blog.site__expand.name
  }
  const section = blog.name
  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
  const imageUrl = image?process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL + `/api/files/images/${image}` : null
  return (
    <>
      <NextSeo
        title={seo_title_calc}
        description={summary}
        openGraph={{
          title: seo_title_calc,
          description: summary,
          url,
          images: [
            {
              url: imageUrl,
              alt: name,
            },
          ],
        }}
        // twitter={{
        //   cardType: seo.cardType || 'summary_large_image',
        //   site: seo.site || 'eggheadio',
        //   handle: seo.handle,
        // }}
        // canonical={canonicalUrl}
      />

      {/* <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden bottom-10 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120] beams">
        <div className="mx-auto max-w-8xl lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-8">
            <div className="col-span-3 mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div className="lg:py-24">
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">{name}</span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                <Markdown body={summary} className="prose sm:prose-lg lg:prose-xl"></Markdown>
                </p>
              </div>
            </div>
            <div className="col-span-2 mt-12 lg:m-0 lg:relative">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                <img
                  className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={imageUrl}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="w-full h-full bg-no-repeat absolute hidden lg:block" style={{backgroundImage: `url("${background_image}")`}}>
      </div> */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 z-10 pb-20">
        <div className="lg:pl-[8rem]">
        {/* {blog.menu && blog.menu.items && (
        <nav id="sidebar" className="fixed z-40 inset-0 flex-none h-full lg:bg-gray-50 lg:bg-opacity-75 w-full lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden">
          <div id="navWrapper" className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0">
            <div className="text-xl font-bold tracking-tight text-gray-900 mt-16 px-8">
              {blog.menu.name}
            </div>
            <nav id="nav" className="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-md pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18)">
              <ul>
                <li className="mb-8">
                  <ul>
                    {blog.menu.items &&  blog.menu.items.map((item) => (
                    <li>
                      <a className="px-3 py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500" href={item.url}>
                        <span className="rounded-md absolute inset-0 bg-cyan-50 opacity-0"></span><span className="relative">{item.name}</span>
                      </a>
                    </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <div className="text-md tracking-tight text-black mt-12 px-3">
                有问题？<br/>
                400-820-1612
              </div>
            </nav>
          </div>
        </nav>
        )} */}
        <div className="max-w-3xl mx-auto py-10 xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16">
          <div id="content-wrapper" className="lg:px-8 min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
            <article className="">
            
              <PageHeader
                title={name}
                // description={summary}
                section={section}
              />
              
              <div
                id="content-wrapper"
                className="relative z-20 prose prose-slate dark:prose-dark"
              >
                <div className="my-10 text-lg text-slate-700 dark:text-slate-400">
                  <Markdown body={summary} className="prose prose-lg lg:prose-xl dark:prose-dark"></Markdown>
                </div>
                <ContentsContext.Provider value={{ registerHeading, unregisterHeading }}>
                  <Markdown body={body} className="prose lg:prose-lg dark:prose-dark"></Markdown>
                </ContentsContext.Provider>
              </div>
            </article>
          </div>

          <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 px-8 overflow-y-auto hidden xl:block">
            {toc.length > 0 && (
              <TableOfContents tableOfContents={toc} currentSection={currentSection} />
            )}
          </div>
        </div>
      </div>

    </div>
    </>
  )
}
