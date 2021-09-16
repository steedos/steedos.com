
export const headerNav = {
  categories: [
    {
      id: 'platform',
      name: '平台',
      featured: [
        {
          name: 'Scaffold',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-menu-03.jpg',
          imageAlt:
            'Pricing page screenshot with tiered plan options and comparison table on colorful blue and green background.',
        },
        {
          name: 'Bones',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-menu-04.jpg',
          imageAlt:
            'Application screenshot with tiered navigation and account settings form on color red and purple background.',
        },
      ],
      sections: [
        {
          id: 'application',
          name: 'Application UI',
          items: [
            { name: 'Home Screens', href: '#' },
            { name: 'Detail Screens', href: '#' },
            { name: 'Settings Screens', href: '#' },
          ],
        },
        {
          id: 'case',
          name: '案例',
          items: [
            { name: '大众公用', href: '/platform/case' },
          ],
        },
        {
          id: 'pricing',
          name: '报价',
          items: [
            { name: '私有部署', href: '/pricing/platform' },
            { name: '云服务', href: '/pricing/cloud' },
          ],
        },
      ],
    },
    {
      id: 'appexchange',
      name: '应用市场',
      featured: [
        {
          name: 'Application UI Pack',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-menu-01.jpg',
          imageAlt:
            'Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.',
        },
        {
          name: 'Marketing Icon Pack',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-menu-02.jpg',
          imageAlt: 'Calendar user interface screenshot with icon buttons and orange-yellow theme.',
        },
      ],
      sections: [
        {
          id: 'cloud-services',
          name: '云服务',
          items: [
            { name: '华炎魔方', href: '#' },
          ],
        },
        {
          id: 'application',
          name: 'Application UI',
          items: [
            { name: 'Outlined', href: '#' },
            { name: 'Solid', href: '#' },
            { name: 'Branded', href: '#' },
            { name: 'Small', href: '#' },
            { name: 'Illustrations', href: '#' },
          ],
        },
        {
          id: 'marketing',
          name: 'Marketing',
          items: [
            { name: 'Outlined', href: '#' },
            { name: 'Solid', href: '#' },
            { name: 'Branded', href: '#' },
            { name: 'Small', href: '#' },
            { name: 'Illustrations', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: '定价', href: '/pricing/platform' },
    { name: '博客', href: '/blogs/news' },
    { name: '应用市场', href: '/collections/apps' },
    { name: '云服务', href: '/collections/cloud-servers' },
    // { name: 'Themes', href: '#' },
  ],
}