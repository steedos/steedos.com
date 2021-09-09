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

import { DocumentationLayout } from '@/layouts/DocumentationLayout'
import tinytime from 'tinytime'
import Editor from "rich-markdown-editor";
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { PageHeader } from '@/components/PageHeader'
import { getPost, getBlog, getBlogSidebarLayoutNav } from '@/lib/blog';

export async function getServerSideProps({
  params,
  locale,
  locales,
  preview,
}) {
  const { blog_slug, post_slug } = params;
  const blog = await getBlog(blog_slug);
  if (!blog) {
    throw new Error(`Blog with slug '${params.blog_slug}' not found`)
  }
  const post = await getPost(blog_slug, post_slug);
  if (!post) {
    throw new Error(`Post with slug '${params.post_slug}' not found`)
  }
  const nav = blog.sidebar? await getBlogSidebarLayoutNav(blog_slug, blog.sidebar):null
  return {
    props: {
      post: post,
      nav: nav
    }
  }
}

const formatDate = tinytime('{MM} {DD}, {YYYY}').render


function TableOfContents({ tableOfContents, currentSection }) {
  if (!tableOfContents) return null

  return (
    <>
      <h5 className="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">
        本页内容
      </h5>
      <ul className="overflow-x-hidden text-gray-500 font-medium">
        {tableOfContents.map((section) => {
          let sectionIsActive = currentSection === section.id ||
            section.children.findIndex(({ id }) => id === currentSection) > -1

          return (
            <Fragment key={section.id}>
              <li>
                <a
                  href={`#${section.id}`}
                  className={clsx(
                    'block transform transition-colors duration-200 py-2 hover:text-gray-900',
                    {
                      'text-gray-900': sectionIsActive,
                    }
                  )}
                >
                  {section.title}
                </a>
              </li>
              {section.children.map((subsection) => {
                let subsectionIsActive = currentSection === subsection.id

                return (
                  <li
                    className='ml-4'
                    key={subsection.id}
                  >
                    <a
                      href={`#${subsection.id}`}
                      className={clsx(
                        'block py-2 transition-colors duration-200 hover:text-gray-900 font-medium',
                        {
                          'text-gray-900': subsectionIsActive,
                        }
                      )}
                    >
                      {subsection.title}
                    </a>
                  </li>
                )
              })}
            </Fragment>
          )
        })}
      </ul>
    </>
  )
}


export default function Post({ post, nav }) {
  
  const editor = useRef(null);
  const router = useRouter()

  let [tableOfContents, setTableOfContents] = useState([])
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)


  useEffect(() => {
    if (!editor.current)
      return;
      
    const headings = editor.current.getHeadings()
    
    if (headings.length === 0) {
      setTableOfContents([]);
      return
    }
    
    // calculate the minimum heading level and adjust all the headings to make
    // that the top-most. This prevents the contents from being weirdly indented
    // if all of the headings in the document are level 3, for example.
    const minHeading = headings.reduce(
      (memo, heading) => (heading.level < memo ? heading.level : memo),
      Infinity
    );

    headings.forEach(heading => {
      heading.top = document.getElementById(heading.id).getBoundingClientRect().top + document.documentElement.scrollTop
    })
    let toc = []
    let currentHeading = null
    headings.forEach(heading => {
      if (heading.level == minHeading) {
        if (currentHeading)
          toc.push(currentHeading);
        currentHeading = heading;
        currentHeading.children = []
      }
      if (currentHeading && heading.level == minHeading + 1) {
        currentHeading.children.push(heading)
      }
    });
    if (currentHeading)
      toc.push(currentHeading);
    setTableOfContents(toc)
    console.log(toc)

    if (toc.length === 0) return

    function onScroll() {
      let y = window.pageYOffset
      let windowHeight = window.innerHeight
      let sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top)
      if (y <= 0) {
        setCurrentSection(sortedHeadings[0].id)
        return
      }
      if (y + windowHeight >= document.body.scrollHeight) {
        setCurrentSection(sortedHeadings[sortedHeadings.length - 1].id)
        return
      }
      const middle = y + windowHeight / 2
      let current = sortedHeadings[0].id
      for (let i = 0; i < sortedHeadings.length; i++) {
        if (middle >= sortedHeadings[i].top) {
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
    return () => window.removeEventListener('scroll', onScroll, true)

  }, [post])

  return (
    <div id={post._id} className="w-full flex">
      <div className="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
        <PageHeader
          title={post.name}
          description={post.seo_description}
          // badge={{ key: 'Tailwind CSS version', value: meta.featureVersion }}
          // border={!classes && meta.headerSeparator !== false}
        />
        <Editor key={post.slug}
          ref={editor}
          defaultValue={post.body_html}
          readOnly={true}
          readOnlyWriteCheckboxes={true}
          className="steedos-rich-markdown-editor"
        />
      </div>

      {tableOfContents && tableOfContents.length > 0 && (
        <div className="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
          <div className="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) pt-10 pb-6 top-18">
            
            {tableOfContents && tableOfContents.length > 0 && (
              <div className="mb-8">
                <TableOfContents tableOfContents={tableOfContents} currentSection={currentSection} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

Post.getLayoutProps = (page, pageProps) => {
  return {
    meta: {
      title: pageProps.post.name,
      description: pageProps.post.description,
    },
    nav: pageProps.nav,
    Layout: DocumentationLayout,
  }
}
