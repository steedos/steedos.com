import { createPageList } from '@/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/mdx/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs'
)

export const documentationNav = {
  '快速向导': [
    pages['test'],
  ],
}
