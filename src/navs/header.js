
export const headerNav = {
  categories: [
    {
      id: 'platform',
      name: '平台',
      featured: [
        {
          name: '华炎魔方入门版',
          href: '/docs/platform/platform-cloud-starter',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-menu-03.jpg',
          imageAlt:
            '华炎魔方云服务位于亚马逊中国区域，每个企业拥有独享空间，并可随时导出为私有部署模式。',
        },
        {
          name: '华炎魔方专业版',
          href: '/products/platform-cloud-professional',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-menu-04.jpg',
          imageAlt:
            '华炎魔方云服务位于亚马逊中国区域，每个企业拥有独享空间，并可随时导出为私有部署模式。',
        },
      ],
      sections: [
        {
          id: 'platform',
          name: '华炎魔方平台',
          items: [
            { name: '概览', href: '/docs/platform/overview' },
            { name: '功能', href: '/docs/platform/features' },
            { name: '动态', href: '/blogs/' },
          ],
        },
        {
          id: 'docs',
          name: '文档',
          items: [
            { name: '快速开始', href: '/docs/platform/getting_started' },
            { name: '案例', href: '/blogs/news/华炎魔方助力大众公用实施数字化转型' },
          ],
        },
        {
          id: 'pricing',
          name: '报价',
          items: [
            { name: '基础版', href: '/products/platform-cloud-starter' },
            { name: '标准版', href: '/products/platform-cloud-standard' },
            { name: '专业版', href: '/products/platform-cloud-professional' },
            { name: '私有部署版', href: '/docs/platform/私有部署版' },
          ],
        },
      ],
    },
    {
      id: 'appstore',
      name: '应用商城',
      featured: [
        {
          name: '合同管理',
          href: '/products/contract',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-menu-01.jpg',
          imageAlt:
            '借助华炎合同管理系统，你能够集中进行合同存储，提高合规性，自动化和加快整个合同生命周期，并获得更多其他业务优势。',
        },
        {
          name: '项目管理',
          href: '/products/project',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-menu-02.jpg',
          imageAlt: '帮助您跟踪和管理项目，里程碑，任务，已阻止的任务，逾期任务，时间，费用预算，并具有详细的报表功能。',
        },
      ],
      sections: [
        {
          id: 'app-store',
          name: '应用商城',
          items: [
            { name: '概览', href: '/docs/app-store/overview' },
            { name: '推荐应用', href: '/collections/featured' },
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