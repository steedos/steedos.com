
export const headerNav = {
  categories: [
    {
      id: 'platform',
      name: '平台',
      featured: [
        // {
        //   name: '客户案例：大众公用',
        //   href: '/docs/customer-success-stories/dzug',
        //   imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-menu-03.jpg',
        //   imageAlt:
        //     '华炎魔方仅用3个月的时间，为大众公用建立了完整的业务财务一体化管理系统。',
        // },
        // {
        //   name: '客户案例：建华建材',
        //   href: '/docs/customer-success-stories/dzug',
        //   imageSrc: 'https://console.steedos.cn/api/files/images/Qy3zLwE3JWdDoTxHA',
        //   imageAlt:
        //     '华炎魔方云服务位于亚马逊中国区域，每个企业拥有独享空间，并可随时导出为私有部署模式。',
        // },
      ],
      sections: [
        {
          id: 'platform',
          name: '平台',
          items: [
            { name: '低代码简介', href: '/platform/lowcode' },
            { name: '华炎魔方平台', href: '/platform/overview' },
            { name: '开源低代码', href: '/open-source/open-source-low-code' },
            { name: '解决方案', href: '/platform/solutions' },
            { name: '功能', href: '/platform/features' },
            { name: '报价', href: '/platform/pricing' },
            
          ],
        },
        {
          id: 'purchase',
          name: '商城',
          items: [
            { name: '华炎魔方云服务', href: '/collections/platform-cloud' },
            { name: '应用市场', href: '/collections/steedos-packages' },
          ],
        },
        {
          id: 'pricing',
          name: '客户案例',
          items: [
            { name: '大众公用', href: '/customer-success-stories/dzug' },
            { name: '建华建材', href: '/customer-success-stories/jianhuabm' },
          ],
        },
        {
          id: 'docs',
          name: '文档',
          items: [
            { name: '快速开始', href: '/docs/deploy/deploy_cloud' },
            { name: '安装部署', href: '/docs/deploy' },
            { name: '用户向导', href: '/docs/user' },
            { name: '管理员向导', href: '/docs/admin' },
            { name: '开发人员向导', href: '/docs/developer' },
          ],
        },
      ],
    },
    {
      id: 'appstore',
      name: '应用商城',
      featured: [
        // {
        //   name: '合同管理',
        //   href: '/products/contract',
        //   imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-menu-01.jpg',
        //   imageAlt:
        //     '借助华炎合同管理系统，你能够集中进行合同存储，提高合规性，自动化和加快整个合同生命周期，并获得更多其他业务优势。',
        // },
        // {
        //   name: '项目管理',
        //   href: '/products/project',
        //   imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-menu-02.jpg',
        //   imageAlt: '帮助您跟踪和管理项目，里程碑，任务，已阻止的任务，逾期任务，时间，费用预算，并具有详细的报表功能。',
        // },
      ],
      sections: [
        {
          id: 'app-store',
          name: '商城',
          items: [
            { name: '华炎魔方云服务', href: '/collections/platform-cloud' },
            { name: '应用市场', href: '/collections/steedos-packages' },
          ],
        },
        {
          id: 'application',
          name: '企业管理类',
          items: [
            { name: '合同管理', href: '/products/contract' },
            { name: '项目管理', href: '/products/project' },
          ],
        },
        {
          id: 'marketing',
          name: '市场营销类',
          items: [
            { name: '网站', href: '/products/site' },
            { name: '商城', href: '/products/store' },
          ],
        },
      ],
    },
  ],
  pages: [
    // { name: '动态', href: '/blogs/' },
  ],
}