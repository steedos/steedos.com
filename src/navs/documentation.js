/*
 * @Author: yinlianghui@steedos.com
 * @Date: 2022-06-18 07:20:28
 * @LastEditors: yinlianghui@steedos.com
 * @LastEditTime: 2022-07-11 17:19:01
 * @Description: 
 */
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
const protocol = createPageList(
  require.context(`../pages/docs/protocol/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/protocol'
)

export const documentationNav = {
  '安装部署': [
    deploy['getting-started'],
    deploy['create-steedos-app'],
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
    admin['app'],
    admin['tab'],
  ],
  '应用集成': [
    admin['datasource'],
    admin['query'],
    developer['node-red'],
    developer['push'],
  ],
  '统计分析': [
    admin['reports'],
    admin['record_report'],
    admin['dashboard'],
    admin['stimulsoft'],
    developer['jsreport'],
  ],
  '自动执行业务流程': [
    admin['auto_process'],
    admin['workflow-rules'],
    admin['approval-process'],
    admin['automated-action'],
    admin['workflow-admin'],
  ],
  '服务端开发': [
    developer['getting-started'],
    developer['sync-metadata'],
    developer['trigger'],
    developer['router'],
    developer['objectql'],
    developer['package'],
    developer['flow-trigger'],
    developer['locale'],
    developer['deploy-gitpod'],
  ],
  '前端开发': [
    developer['amis'],
    developer['button'],
    developer['form-event'],
    developer['form-formula'],
    developer['steedosui'],
    developer['client'],
  ],
  'API': [
    developer['graphql-api'],
    protocol['api-process'],
    protocol['api-metadata'],
  ],
  '元数据': [
    protocol['metadata-object'],
    protocol['metadata-field-type'],
    protocol['metadata-ui'],
    protocol['metadata-permissions'],
    protocol['metadata-automation'],
  ],
}
