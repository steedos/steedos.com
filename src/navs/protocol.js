import { createPageList } from '@/utils/createPageList'


const protocol = createPageList(
  require.context(`../protocol/docs/protocol/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/protocol'
)

export const protocolNav = {
  '快速向导': [
    protocol['overview'],
    protocol['metadata'],
    protocol['designer'],
    protocol['permissions'],
    protocol['automation'],
    protocol['code'],
    protocol['package'],
    protocol['devops'],
    protocol['standard-objects'],
    protocol['plugin'],
  ],
  '软件包开发': [
    // protocol['objectql'],
    // protocol['functions'],
    protocol['trigger'],
    protocol['flow-trigger'],
    protocol['services'],
    protocol['sidecar'],
    protocol['page'],
    protocol['process'],
    protocol['cron'],
    protocol['event'],
  ],
  '元数据': [
    protocol['metadata-object'],
    protocol['metadata-field-type'],
    protocol['formular'],
    protocol['metadata-ui'],
    protocol['metadata-permissions'],
    protocol['metadata-automation'],
  ],
  'API': [
    protocol['api-metadata'],
    protocol['api-records'],
    protocol['api-process'],
  ],
  // '可视化工具': [
  //   protocol['designer-object'],
  //   protocol['designer-page'],
  //   protocol['designer-code'],
  //   protocol['designer-formular'],
  //   protocol['designer-process'],
  //   protocol['designer-flows'],
  // ],
  'DevOps': [
    protocol['sync-cli'],
    protocol['sync-vscode'],
  ],
  '核心微服务': [
    protocol['service-package'],
    protocol['service-metadata'],
    protocol['service-records'],
    protocol['service-jobs'],
  ],
  '扩展插件': [
    protocol['plugin-amis'],
    protocol['plugin-stimulsoft'],
    protocol['plugin-node-red'],
  ],
  // '平台微服务': [
  //   protocol['service-message'],
  //   protocol['service-logging'],
  //   protocol['service-tracing'],
  //   protocol['service-metrics'],
  //   protocol['service-auditing'],
  // ],
  // '用户界面': [
  //   protocol['ui-login'],
  //   protocol['ui-record-view'],
  //   protocol['ui-list-view'],
  //   protocol['ui-amis'],
  // ],
}
