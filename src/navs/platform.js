import { createPageList } from '@/utils/createPageList'
const pages = createPageList(
  require.context(`../pages/platform/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'platform'
)

export const platformNav = {
  '客户案例': [
    pages['case'],
  ],
}
