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

export const documentationNav = {
  '安装部署': [
    deploy['deploy-docker'],
    deploy['deploy-cloud'],
    deploy['devops'],
    deploy['deploy-activate'],
    deploy['steedos-config'],
    deploy['upgrade'],
  ],
  '管理员向导': [
    admin['organization'],
    admin['integration'],
    admin['create_object'],
    admin['field_type'],
    admin['auto_process'],
    admin['functions'],
    admin['no-code-extend'],
    admin['workflow-admin'],
    admin['record_report'],
    admin['import'],
    admin['dashboard'],
    admin['datasource'],
    admin['stimulsoft'],
    admin['permission_set'],
    admin['reports'],
  ],
  '用户向导': [
    user['apps'],
    user['getting-started'],
    user['workflow'],
  ]
}
