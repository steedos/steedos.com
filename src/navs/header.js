
export const headerNav = {
  categories: [
    {
      id: 'platform',
      name: '平台',
      featured: [
        {
          name: '华炎魔方助力大众共用实施数字化转型',
          href: '/customer-success-stories/dzug',
          imageSrc: 'https://console.steedos.cn/api/files/images/kq9hPmNhxCFDXMp3u',
          imageAlt:
            '华炎魔方仅用3个月的时间，为大众公用建立了完整的业务财务一体化管理系统。',
        },
        {
          name: '华炎魔方助力建华建材实施生产管理系统',
          href: '/customer-success-stories/jianhuabm',
          imageSrc: 'https://console.steedos.cn/api/files/images/XMgWcjhCk4bKbXYYb',
          imageAlt:
            '华炎魔方仅用1.5个月的时间，为建华建材实施了PC构件生产管理系统。',
        },
      ],
      sections: [
        {
          id: 'platform',
          name: '低代码平台',
          href: '/platform/overview',
          items: [
            { name: '华炎魔方概览', href: '/platform/overview' },
            { name: '什么是低代码？', href: '/platform/lowcode' },
            { name: '技术架构', href: '/platform/architecture' },
            { name: '功能', href: '/platform/features' },
            { name: '报价', href: '/platform/pricing' },
            { name: '社区版', href: 'https://github.com/steedos/steedos-platform/', target: '_blank' },
            { name: '企业版', href: '/collections/platform' },
            { name: '技术服务', href: '/collections/services' },
          ],
        },
        {
          id: 'cloud',
          name: '应用市场',
          href: '/collections/steedos-packages',
          items: [
            { name: '项目管理', href: '/products/project' },
            { name: '合同管理', href: '/products/contract' },
            { name: '客户管理', href: '/products/crm' },
            { name: '销售订单', href: '/products/order' },
            { name: '采购管理', href: '/products/purchase' },
            { name: '业财管理', href: '/products/finance' },
            { name: '资产管理', href: '/products/asset' },
            { name: '审批中心', href: '/products/workflow' },
            { name: '协同办公', href: '/products/oa' },
          ],
        },
        {
          id: 'features',
          name: '功能',
          href: '/videos',
          items: [
            { name: '零代码开发', href: '/videos/lesson-object' },
            { name: '公式引擎', href: '/videos/formula-calculates' },
            { name: '权限引擎', href: '/videos/authority_management' },
            { name: '规则引擎', href: '/videos/workflow_rules' },
            { name: '批准过程', href: '/videos/admin-contracts' },
            { name: '报表引擎', href: '/videos/report' },
            { name: '元数据引擎', href: '/videos/lesson-metadata' },
            { name: '审批王', href: '/videos/admin-contracts' },
            { name: 'DevOps', href: '/videos/live-course-devops' },
          ],
        },
      ],
    },
    {
      id: 'resourses',
      name: '资源',
      featured: [
        {
          name: '生产环境部署 - Docker （推荐）',
          href: '/docs/deploy/deploy-docker',
          imageSrc: 'https://console.steedos.cn/api/files/images/qAyN6KWYdgmKBuwQg',
          imageAlt:'私有部署完全免费。',
        },
        {
          name: '开发环境部署 - DevOps 远程开发',
          href: '/docs/deploy/devops',
          imageSrc: 'https://console.steedos.cn/api/files/images/AnNW9yDQZmTgWAAo7',
          imageAlt: '远程开发项目，方便、快捷！',
        },
      ],
      sections: [
        {
          id: 'resources',
          name: '浏览文档',
          href: '/docs',
          items: [
            { name: '安装部署', href: '/docs/deploy' },
            { name: '管理员向导', href: '/docs/admin' },
            { name: '用户向导', href: '/docs/user' },
          ],
        },
        {
          id: 'developer',
          name: '开发人员向导',
          href: '/docs/developer',
          items: [
            { name: '快速向导', href: '/docs/developer/getting-started' },
            { name: '元数据类型概览', href: '/docs/developer/meta-types' },
            { name: '软件包发布与安装', href: '/docs/developer/package' },
          ],
        },
        {
          id: 'low-code-academy',
          name: '低代码学院',
          href: '/docs/low-code-academy',
          items: [
            { name: '合同管理系统', href: '/docs/low-code-academy/low-code-contract-app' },
            { name: '集团会议管理系统', href: '/docs/low-code-academy/low-code-meeting-app' },
            { name: '低代码DevOps教程', href: '/docs/low-code-academy/low-code-devops-hr' },
          ],
        },
        {
          id: 'company',
          name: '关于我们',
          href: '/company/about-us',
          items: [
            { name: '关于华炎', href: '/company/about-us' },
            { name: '解决方案', href: '/solutions' },
            { name: '联系我们', href: '/company/contact-us' },
          ],
        },
        {
          id: 'customer',
          name: '客户案例',
          href: '/customer-success-stories',
          items: [
            { name: '建华建材', href: '/customer-success-stories/jianhuabm' },
            { name: '大众公用', href: '/customer-success-stories/dzug' },
            { name: '新冠抗疫平台', href: '/customer-success-stories/COVID-19' },
          ],
        },
        {
          id: 'collections',
          name: '商城',
          href: '/collections/platform-cloud',
          items: [
            { name: '企业版', href: '/collections/platform' },
            { name: '应用市场', href: '/collections/steedos-packages' },
            { name: '技术服务', href: '/collections/services' },
          ],
        },
      ]
    }, 
    {
      id: 'customer-success-stories',
      name: '客户案例',
      featured: [
        {
          name: '华炎魔方助力招商银行探索产品低代码化转型',
          href: '/customer-success-stories/cmbchina-poc',
          imageSrc: 'https://console.steedos.cn/api/files/images/6440ac94671028003e760f11',
          imageAlt:
            '薪福通3.0借助华炎魔方平台向低代码赛道转型。',
        },
        {
          name: '华炎魔方助力清华大学搭建图书馆资产管理系统',
          href: '/customer-success-stories/tsinghua',
          imageSrc: 'https://console.steedos.cn/api/files/images/6440acbd671028003e760f13',
          imageAlt:
            '2022年9月清华大学图书馆联合上海华炎软件，使用华炎魔方低代码开发平台进行了应用系统生命周期管理软件的研发，通过1个月的时间，完成了整个系统的建设。',
        },
      ],
      sections: [
        {
          id: 'customer-cases',
          name: '项目案例',
          href: '/customer-success-stories/',
          items: [
            { name: '招商银行', href: '/customer-success-stories/cmbchina-poc' },
            { name: '清华大学', href: '/customer-success-stories/tsinghua' },
            { name: '建华建材', href: '/customer-success-stories/jianhuabm' },
            { name: '大众公用', href: '/customer-success-stories/dzug' },
            { name: '智器云', href: '/customer-success-stories/zqy' },
            { name: '中意盛森', href: '/customer-success-stories/contract' },
            { name: '河北港口集团', href: '/customer-success-stories/porthebei' },
          ],
        },
        {
          id: 'other-cases',
          name: ' 伙伴案例',
          href: '/customer-success-stories/',
          items: [
            { name: '昱庄智能工厂', href: '/customer-success-stories/yz' },
            { name: '抗疫平台', href: '/customer-success-stories/COVID-19' },
            { name: 'SCRM销售', href: '/customer-success-stories/scrm' },
            { name: 'CTMS临床研究管理', href: '/customer-success-stories/ctms' },
          ],
        }
      ],
    }
  ],
  pages: [
    { name: '文档', href: '/docs/' },
    { name: '视频', href: '/videos/' },
    { name: '应用市场', href: '/collections/steedos-packages' },
  ],
}