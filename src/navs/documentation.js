import { createPageList } from '@/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs'
)

export const documentationNav = {
  'Getting started': [
    pages['installation'],
    {
      title: 'Release Notes',
      href: 'https://github.com/tailwindlabs/tailwindcss/releases',
    },
  ],
  'Official Plugins': [
    {
      title: 'Typography',
      href: 'https://github.com/tailwindlabs/tailwindcss-typography',
    },
    {
      title: 'Forms',
      href: 'https://github.com/tailwindlabs/tailwindcss-forms',
    },
    {
      title: 'Aspect Ratio',
      href: 'https://github.com/tailwindlabs/tailwindcss-aspect-ratio',
    },
    {
      title: 'Line Clamp',
      href: 'https://github.com/tailwindlabs/tailwindcss-line-clamp',
    },
  ],
}
