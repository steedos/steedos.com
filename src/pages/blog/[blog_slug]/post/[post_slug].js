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
import { PageHeader } from '@/components/PageHeader'
import { getPost, getBlogSidebarLayoutNav } from '@/lib/blog';

export async function getServerSideProps(context) {
  const { blog_slug, post_slug } = context.params;
  const post = await getPost(blog_slug, post_slug);
  const nav = await getBlogSidebarLayoutNav(blog_slug, post.blog__expand.sidebar)
  return {
    props: {
      post: post,
      nav: nav
    }
  }
}

const formatDate = tinytime('{MM} {DD}, {YYYY}').render


function TableOfContents({ headings, currentSection }) {
  if (!headings) return null

  return (
    <>
      <h5 className="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">
        本页内容
      </h5>
      <ul className="overflow-x-hidden text-gray-500 font-medium">
        {headings.map((section) => {
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

  let [headings, setHeadings] = useState([])
  let [tableOfContents, setTableOfContents] = useState([])
  let [tableOfContentsLoaded, setTableOfContentsLoaded] = useState(false)
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)

  // calculate the minimum heading level and adjust all the headings to make
  // that the top-most. This prevents the contents from being weirdly indented
  // if all of the headings in the document are level 3, for example.
  const minHeading = tableOfContents.reduce(
    (memo, heading) => (heading.level < memo ? heading.level : memo),
    Infinity
  );

  useEffect(() => {
    if (editor.current && !tableOfContentsLoaded) {
      setTableOfContents(editor.current.getHeadings())
      setTableOfContentsLoaded(true);
    }
  });

  useEffect(() => {
    if (tableOfContents.length === 0) return
    
    tableOfContents.forEach(heading => {
      heading.top = document.getElementById(heading.id).getBoundingClientRect().top + document.documentElement.scrollTop
    })
    let calcHeadings = []
    let currentHeading = null
    tableOfContents.forEach(heading => {
      if (heading.level == minHeading) {
        if (currentHeading)
          calcHeadings.push(currentHeading);
        currentHeading = heading;
        currentHeading.children = []
      }
      if (currentHeading && heading.level == minHeading + 1) {
        currentHeading.children.push(heading)
      }
    });
    if (currentHeading)
      calcHeadings.push(currentHeading);
    setHeadings(calcHeadings)

    if (calcHeadings.length === 0) return

    function onScroll() {
      let y = window.pageYOffset
      let windowHeight = window.innerHeight
      let sortedHeadings = tableOfContents.concat([]).sort((a, b) => a.top - b.top)
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

  }, [tableOfContents])

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

      <div className="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
        <div className="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) pt-10 pb-6 top-18">
          
          {tableOfContents && tableOfContents.length > 0 && (
            <div className="mb-8">
              <TableOfContents headings={headings} currentSection={currentSection} />
            </div>
          )}
        </div>
      </div>
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
