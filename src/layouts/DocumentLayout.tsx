import React, {Fragment, FunctionComponent} from 'react'
import {NextSeo} from 'next-seo'

type LayoutProps = {
  meta?: {
    title?: string
    description?: string
    url?: string
  }
  tableOfContents?: any
}

const DocumentLayout: FunctionComponent<LayoutProps> = ({
  children,
  meta = {},
  tableOfContents
}) => {
  const {
    title,
    description,
    url,
  } = meta
  const currentSection = 'xxx'
  return (
    <>
      
<div className="relative flex w-full bg-gray-50">
  <div className="hidden lg:block absolute top-0 bottom-0 right-0 left-1/2 bg-white"></div>
  <div className="relative flex w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="w-full flex-none lg:grid lg:grid-cols-3 lg:gap-8">
      <div className="bg-gray-50 lg:bg-transparent -mx-4 sm:-mx-6 lg:mx-0 py-12 sm:py-6 px-4 sm:px-6 lg:pl-0 lg:pr-8">
        <nav aria-label="Table of contents" className="text-sm max-w-[37.5rem] mx-auto lg:max-w-none lg:mx-0 lg:fixed w-full h-full pb-16 top-0 pt-32 overflow-y-auto" x-data="TableOfContents()" x-init="init()">
        <ul role="list" className="space-y-8 border-l border-gray-200 pl-6">
        {tableOfContents.map((section) => {
          let sectionIsActive =
            currentSection === section.slug ||
            section.children.findIndex(({ slug }) => slug === currentSection) > -1

          return (
            <Fragment key={section.slug}>
            <li className="space-y-3">
              <a href={`#${section.slug.toLowerCase()}`} className="block font-medium transition-colors duration-300 text-teal-600">{section.title}</a>
              <ul role="list" className="space-y-3">

              {section.children.map((subsection) => {
                let subsectionIsActive = currentSection === subsection.slug

                return (
                <li className="ml-4" key={subsection.slug}>
                  <a href={`#${subsection.slug.toLowerCase()}`} className="block transition-colors duration-300">{subsection.title}</a>
                </li>
                )
              })}
              </ul>
            </li>   
            </Fragment>
          )})}         
          </ul>
          <div className="absolute top-0 left-0 w-px bg-teal-500 origin-top transition-transform duration-300"></div>
        </nav>
      </div>
      <div className="relative col-span-2 lg:-ml-8 bg-white lg:shadow-md">
        <div className="hidden lg:block absolute top-0 bottom-0 -right-4 w-8 bg-white"></div>
        
        <div className="relative py-16 lg:px-16">
          <div className="pb-10 border-b border-gray-200 mb-10">
            <div>
              <h1 className="inline-block text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
            </div>
            <p className="mt-1 text-lg text-gray-500"></p>
          </div>
          <div className="prose mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default DocumentLayout
