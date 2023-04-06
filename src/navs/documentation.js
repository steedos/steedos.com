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
const plugins = createPageList(
  require.context(`../pages/docs/plugins/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/plugins'
)
const apps = createPageList(
  require.context(`../pages/docs/apps/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/apps'
)

export const documentationNav = {
  '安装部署': [
    deploy['getting-started'],
    deploy['deploy-docker'],
    // deploy['deploy-activate'],
    // deploy['app-store'],
    deploy['steedos-config'],
    deploy['upgrade'],
  ],
  '开发人员': [
    developer['getting-started'],
    developer['create-steedos-app'],
    developer['devops'],
    developer['package'],
    developer['sync-metadata'],
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
    admin['integration-ding'],
    admin['integration-qywx'],
  ],
  '自定义对象': [
    admin['object'],
    admin['field_type'],
    admin['listview'],
    admin['tab'],
    admin['app'],
    admin['page-layout'],
    admin['formula'],
    admin['functions'],
    admin['no-code-extend'],
    admin['datasource'],
  ],
  '自动执行业务流程': [
    admin['auto_process'],
    admin['workflow-rules'],
    admin['approval-process'],
    admin['automated-action'],
    admin['workflow-admin'],
  ],
  'Amis 微页面': [
    amis['getting-started'],
    amis['page-type'],
    amis['pages'],
    amis['designer'],
    amis['button'],
    amis['api'],
    amis['component'],
    amis['metadata'],
    amis['example'],
  ],
  '微服务开发': [
    developer['service'],
    developer['action-trigger'],
    developer['action-api'],
    // developer['objectql'],
    developer['filters'],
    developer['flow-trigger'],
    developer['locale'],
  ],
  '平台API': [
    developer['api-validate'],
    developer['graphql-api'],
    developer['api-process'],
    developer['api-jwt-sso'],
  ],
  '平台微服务': [
    developer['service-objectql'],
    developer['service-graphql'],
    developer['service-push'],
    developer['service-sms'],
  ],
  '插件': [
    plugins['node-red'],
  ],
  '元数据': [
    protocol['metadata-object'],
    protocol['metadata-field-type'],
    protocol['metadata-ui'],
    protocol['metadata-permissions'],
    protocol['metadata-automation'],
  ],
  // '统计分析': [
  //   admin['reports'],
  //   admin['record_report'],
  //   admin['dashboard'],
  //   admin['stimulsoft'],
  //   developer['jsreport'],
  // ],
}
