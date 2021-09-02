import { createPageList } from '@/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs'
)

export const documentationNav = {
  'Getting started': [
    pages['installation'],
    {
      title: 'Github',
      href: 'https://github.com/steedos/steedos-platform/',
    },
  ],
}
