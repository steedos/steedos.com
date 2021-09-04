import { createPageList } from '@/utils/createPageList'
const pages = createPageList(
  require.context(`../pages/pricing/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'pricing'
)

export const pricingNav = {
  '报价': [
    pages['platform'],
    pages['cloud'],
  ],
}
