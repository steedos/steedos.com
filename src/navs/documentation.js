import { createPageList } from '@/utils/createPageList'

const deploy = createPageList(
  require.context(`../pages/docs/deploy/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/deploy'
)
const admin = createPageList(
  require.context(`../pages/docs/admin/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/admin'
)
const user = createPageList(
  require.context(`../pages/docs/user/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/user'
)
const developer = createPageList(
  require.context(`../pages/docs/developer/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/developer'
)

export const documentationNav = {
  '安装部署': [
    deploy['getting-started'],
    deploy['deploy-docker'],
    deploy['deploy-cloud'],
    deploy['devops'],
    deploy['deploy-windows'],
    deploy['deploy-mac'],
    deploy['deploy-activate'],
    deploy['steedos-config'],
    deploy['upgrade'],
  ],
  '用户向导': [
    user['getting-started'],
    user['apps'],
    user['workflow'],
  ],
  '管理员向导': [
    admin['getting-started'],
    admin['organization'],
    admin['permission_set'],
    admin['import'],
    admin['integration'],
  ],
  '无代码开发': [
    admin['object'],
    admin['field_type'],
    admin['listview'],
    admin['page-layout'],
    admin['formula'],
    admin['functions'],
    admin['no-code-extend'],
    admin['datasource'],
    admin['app'],
    admin['tab'],
  ],
  '统计分析': [
    admin['record_report'],
    admin['dashboard'],
    admin['stimulsoft'],
    admin['reports'],
  ],
  '自动执行业务流程': [
    admin['auto_process'],
    admin['workflow-rules'],
    admin['approval-process'],
    admin['automated-action'],
    admin['workflow-admin'],
    developer['flow-trigger']
  ],
  '服务端开发': [
    developer['getting-started'],
    developer['sync-metadata'],
    developer['trigger'],
    developer['router'],
    developer['objectql'],
    developer['package'],
    developer['deploy-gitpod'],
  ],
  '前端开发': [
    developer['graphql-api'],
    developer['button'],
    developer['form-event'],
    developer['form-formula'],
    developer['steedosui'],
    developer['client'],
  ],
  '插件': [
    developer['node-red'],
    developer['jsreport'],
  ]
}
