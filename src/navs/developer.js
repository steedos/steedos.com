import { createPageList } from '@/utils/createPageList'


const developer = createPageList(
  require.context(`../pages/developer/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'developer'
)

export const developerNav = {
  '快速向导': [
    developer['overview'],
    developer['metadata'],
    developer['designer'],
    developer['permissions'],
    developer['automation'],
    developer['code'],
    developer['package'],
    developer['devops'],
    developer['standard-objects'],
    developer['plugin'],
  ],
  '软件包开发': [
    developer['objectql'],
    // developer['functions'],
    developer['trigger'],
    developer['flow-trigger'],
    developer['services'],
    developer['sidecar'],
    developer['page'],
    developer['process'],
    developer['cron'],
    developer['event'],
  ],
  '元数据': [
    developer['metadata-object'],
    developer['metadata-field-type'],
    developer['formular'],
    developer['metadata-ui'],
    developer['metadata-permissions'],
    developer['metadata-automation'],
  ],
  'API': [
    developer['api-metadata'],
    developer['api-records'],
    developer['api-process'],
  ],
  // '可视化工具': [
  //   developer['designer-object'],
  //   developer['designer-page'],
  //   developer['designer-code'],
  //   developer['designer-formular'],
  //   developer['designer-process'],
  //   developer['designer-flows'],
  // ],
  'DevOps': [
    developer['sync-cli'],
    developer['sync-vscode'],
  ],
  '核心微服务': [
    developer['service-package'],
    developer['service-metadata'],
    developer['service-records'],
    developer['service-jobs'],
  ],
  '扩展插件': [
    developer['plugin-amis'],
    developer['plugin-stimulsoft'],
    developer['plugin-node-red'],
  ],
  // '平台微服务': [
  //   developer['service-message'],
  //   developer['service-logging'],
  //   developer['service-tracing'],
  //   developer['service-metrics'],
  //   developer['service-auditing'],
  // ],
  // '用户界面': [
  //   developer['ui-login'],
  //   developer['ui-record-view'],
  //   developer['ui-list-view'],
  //   developer['ui-amis'],
  // ],
}
