
export const headerNav = {
  categories: [
    {
      id: 'platform',
      name: '平台介绍',
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
          name: '低代码平台',
          href: '/platform/overview',
          items: [
            { name: '什么是低代码？', href: '/platform/lowcode' },
            { name: '平台介绍', href: '/platform/overview' },
            { name: '技术架构', href: '/platform/architecture' },
            { name: '十大引擎', href: '/platform/features' },
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
            { name: '元数据引擎', href: '/videos/lesson-metadata' },
            { name: '审批王', href: '/videos/admin-contracts' },
            { name: 'DevOps', href: '/videos/live-course-devops' },
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
      ],
    },
    {
      id: 'solution',
      name: '解决方案',
      href: '/collections/steedos-packages',
      featured: [
        {
          name: '项目管理解决方案',
          href: '/solutions/project',
          imageSrc: 'https://console.steedos.cn/api/files/images/AnNW9yDQZmTgWAAo7',
          imageAlt:'项目管理解决方案',
        },
        {
          name: 'PC-MES生产管理解决方案',
          href: '/solutions/pcmes',
          imageSrc: 'https://console.steedos.cn/api/files/images/raAaARPycouLJwFd2',
          imageAlt: 'PC-MES生产管理解决方案',
        },
      ],
      sections: [
        {
          id: 'platform',
          name: '场景解决方案',
          href: '/solutions',
          items: [
            { name: '项目管理解决方案', href: '/solutions/project' },
            { name: '合同管理解决方案', href: '/solutions/contract' },
            { name: '在线商城解决方案', href: '/solutions/ecommerce' },
            { name: 'PC-MES生产管理解决方案', href: '/solutions/pcmes' },
          ],
        },
        {
          id: 'cloud',
          name: '行业解决方案',
          href: '/solutions',
          items: [
            { name: '行业PaaS平台解决方案', href: '/solutions/paas' },
          ],
        }
      ],
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
        }
      ],
    },
    {
      id: 'docs&videos',
      name: '文档视频',
      featured: [
        {
          name: '华炎魔方项目解决方案线上分享会',
          href: '/videos/course-project',
          imageSrc: 'https://console.steedos.cn/api/files/images/hqujpwHACBDxmMYyu',
          imageAlt:
            '华炎魔方项目解决方案线上分享会。',
        },
        {
          name: '低代码训练营系列课程之业务建模',
          href: '/videos/course-object',
          imageSrc: 'https://console.steedos.cn/api/files/images/nob6cAXKMSiS8BBZP',
          imageAlt:
            '低代码训练营系列课程之业务建模',
        },
      ],
      sections: [
        {
          id: 'docs',
          name: '配置文档',
          href: '/docs/',
          items: [
            { name: '安装部署', href: '/docs/deploy/getting-started' },
            { name: '开发向导', href: '/docs/developer/getting-started' },
            { name: '用户向导', href: '/docs/user/getting-started' },
            { name: '管理员向导', href: '/docs/admin/getting-started' },
            { name: '可视化建模', href: '/docs/admin/object' },
            { name: '自动化流程', href: '/docs/admin/auto_process' },
            { name: '页面设计', href: '/docs/amis/getting-started' },
          ],
        },
        {
          id: 'docs',
          name: '开发文档',
          href: '/docs/',
          items: [
            { name: '元数据介绍', href: '/docs/protocol/metadata-object' },
            { name: '平台API', href: '/docs/developer/api-validate' },
            { name: '平台微服务', href: '/docs/developer/service-objectql' },
            { name: '微服务开发', href: '/docs/developer/service' },
            { name: '集成插件', href: '/docs/plugins/node-red' },
            { name: '元数据介绍', href: '/docs/protocol/metadata-object' },
          ],
        },
        {
          id: 'video',
          name: '培训视频',
          href: '/videos',
          items: [
            { name: '关于华炎魔方', href: '/videos' },
            { name: '可视化开发教程', href: '/videos' },
            { name: '低代码训练营课程回顾', href: '/videos' },
            { name: '华炎魔方低代码DevOps平台', href: '/videos' },
          ],
        }
      ],
    }
  ],
  pages: [
    { name: '购买服务', href: '/services/feature_pricing' },
    { name: '关于我们', href: '/company/about-us' },
  ],
}