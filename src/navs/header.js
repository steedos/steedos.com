
export const headerNav = {
  categories: [
    {
      id: 'platform',
      name: '产品',
      featured: [
        {
          name: '华炎魔方赋能企业，打造数字驱动型组织',
          href: '/platform/overview',
          imageSrc: 'https://console.steedos.cn/api/files/images/3TNS6p46atnntJE4y',
          imageAlt:'华炎魔方赋能企业，打造数字驱动型组织',
        },
        {
          name: '华炎魔方十大引擎',
          href: '/platform/features',
          imageSrc: 'https://console.steedos.cn/api/files/images/ER8tP4Yvu8fDfvFkR',
          imageAlt: '华炎魔方十大引擎',
        },
      ],
      sections: [
        {
          id: 'platform',
          name: '华炎魔方',
          href: '/platform/overview',
          items: [
            { name: '什么是低代码？', href: '/platform/lowcode' },
            { name: '平台介绍', href: '/platform/overview' },
            { name: '技术架构', href: '/platform/architecture' },
            { name: '十大引擎', href: '/platform/features' },
            { name: '报价', href: '/pricing/platform' },
            { name: '文档', href: '/docs' },
            { name: '视频', href: '/videos' },
          ],
        },
        {
          id: 'features',
          name: '平台功能',
          href: '/videos',
          items: [
            { name: '数据建模', href: '/videos/lesson-object' },
            { name: '权限引擎', href: '/videos/authority_management' },
            { name: '公式引擎', href: '/videos/formula-calculates' },
            { name: '规则引擎', href: '/videos/workflow_rules' },
            { name: '批准过程', href: '/videos/admin-contracts' },
            { name: '元数据同步', href: '/videos/lesson-metadata' },
            { name: 'DevOps', href: '/videos/live-course-devops' },
          ],
        },
        {
          id: 'solutions',
          name: '解决方案',
          href: '/solutions',
          items: [
            { name: '项目管理', href: '/solutions/project' },
            { name: '合同管理', href: '/solutions/contract' },
            { name: '在线商城', href: '/solutions/ecommerce' },
            { name: '行业PaaS平台', href: '/solutions/paas' },
            { name: 'PC-MES生产管理', href: '/solutions/pcmes' },
          ],
        },
      ],
    },
    {
      id: 'customer-success-stories',
      name: '客户',
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
          name: '客户案例',
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
          name: '伙伴案例',
          href: '/customer-success-stories/',
          items: [
            { name: '双汇集团智能工厂', href: '/customer-success-stories/yz' },
            { name: '抗疫平台', href: '/customer-success-stories/COVID-19' },
            { name: '梅斯医学SCRM销售管理', href: '/customer-success-stories/scrm' },
            { name: '梅斯医学CTMS临床研究管理', href: '/customer-success-stories/ctms' },
          ],
        },
        {
          id: 'about',
          name: '公司',
          href: '/company/about-us',
          items: [
            { name: '关于我们', href: '/company/about-us' },
            { name: '客户案例', href: '/customer-success-stories' },
            { name: '解决方案', href: '/solutions' },
            { name: '服务', href: '/collections/services' },
            { name: '联系我们', href: '/company/contact-us' },
          ],
        },
      ],
    },
   
  ],
  pages: [
    { name: '文档', href: '/docs/' },
    { name: '视频', href: '/videos/' },
    { name: '联系我们', href: '/company/contact-us' },
  ],
}