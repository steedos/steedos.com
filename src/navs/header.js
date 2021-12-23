
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
          name: '华炎魔方',
          href: '/platform/overview',
          items: [
            { name: '什么是华炎魔方?', href: '/platform/overview' },
            { name: '什么是低代码？', href: '/platform/lowcode' },
            { name: '技术架构', href: '/platform/architecture' },
            { name: '功能', href: '/platform/features' },
            { name: '报价', href: '/platform/pricing' },
            { name: '开源', href: '/platform/open-source-low-code' },
            { name: '私有部署', href: '/docs/deploy/' },
          ],
        },
        {
          id: 'cloud',
          name: '华炎魔方云服务',
          href: '/cloud/',
          items: [
            { name: '云服务概览', href: '/cloud/overview' },
            { name: '云计算', href: '/cloud/cloud-computing' },
            { name: 'PaaS', href: '/cloud/paas' },
            { name: 'SaaS', href: '/cloud/saas' },
            { name: '云原生', href: '/cloud/cloud-native' },
            { name: '多租户架构', href: '/cloud/multi-tenant' },
            { name: '注册开通云服务', href: '/docs/deploy/deploy-cloud' },
          ],
        },
        {
          id: 'resources',
          name: '资源',
          href: '/company/about-us',
          items: [
            { name: '客户案例', href: '/customer-success-stories' },
            { name: '解决方案', href: '/solutions' },
            { name: '安装部署', href: '/docs/deploy' },
            { name: '开发人员', href: '/docs/developer' },
            { name: '低代码学院', href: '/docs/low-code-academy' },
            { name: '关于华炎', href: '/company/about-us' },
            { name: '联系我们', href: '/company/contact-us' },
          ],
        },
      ],
    },
    {
      id: 'appstore',
      name: '商城',
      featured: [
        {
          name: '运维支持服务',
          href: '/products/cont/products/support-success-plan',
          imageSrc: 'https://console.steedos.cn/api/files/files/h8dYjfdrEspFb8icK',
          imageAlt:
            '使用华炎魔方平台需要指导？无论是安装、实施、培训、运维，我们都可以为您提供所需支持。',
        },
        {
          name: '开发者支持服务',
          href: '/products/developer-success-plan',
          imageSrc: 'https://console.steedos.cn/api/files/files/Dcjvtu6dTA95aAG7N',
          imageAlt: '我们为开发团队提供低代码开发全程辅导服务，帮助您的团队快速切换到全新的低代码开发模式。',
        },
      ],
      sections: [
        {
          id: 'collections',
          name: '云平台',
          href: '/collections/platform-cloud',
          items: [
            { name: '入门版', href: '/products/platform-cloud-starter' },
            { name: '标准版', href: '/products/platform-cloud-standard' },
            { name: '高级版', href: '/products/platform-cloud-professional' },
          ],
        },
        {
          id: 'apps',
          name: '应用市场',
          href: '/collections/steedos-packages',
          items: [
            { name: '合同管理', href: '/products/contract' },
            { name: '项目管理', href: '/products/project' },
            { name: '销售管理', href: '/products/crm' },
            { name: '财务管理', href: '/products/finance' },
            { name: '在线商城', href: '/products/shop' },
          ],
        },
        {
          id: 'service',
          name: '服务',
          href: '/collections/services',
          items: [
            { name: '运维支持服务', href: '/products/support-success-plan' },
            { name: '开发者支持服务', href: '/products/developer-success-plan' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: '视频', href: '/videos/' },
    { name: '文档', href: '/docs/' },
    { name: '社区', href: 'https://community.steedos.cn/', target: '_blank' }
  ],
}