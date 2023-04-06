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
const amis = createPageList(
  require.context(`../pages/docs/amis/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/amis'
)
const service = createPageList(
  require.context(`../pages/docs/service/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/service'
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
    deploy['app-store'],
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
    developer['sms'],
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
    developer['filters'],
    developer['package'],
    developer['flow-trigger'],
    developer['locale'],
    developer['deploy-gitpod'],
  ],
  '前端开发': [
    developer['button'],
    developer['form-event'],
    developer['form-formula'],
    developer['steedosui'],
    developer['client'],
  ],
  'Amis 微页面': [
    amis['getting-started'],
    amis['page-type'],
    amis['pages'],
    amis['designer'],
    amis['api'],
    amis['component'],
    amis['metadata'],
    amis['example'],
  ],
  'API': [
    developer['api-validate'],
    developer['graphql-api'],
    protocol['api-process'],
    protocol['api-metadata'],
    protocol['api-jwt-sso'],
  ],
  '元数据': [
    protocol['metadata-object'],
    protocol['metadata-field-type'],
    protocol['metadata-ui'],
    protocol['metadata-permissions'],
    protocol['metadata-automation'],
  ],
}
