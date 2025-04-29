
export const headerNav = {
  categories: [
    {
      id: 'platform',
      name: '平台',
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
          href: '/platform/',
          items: [
            { name: '华炎魔方概览', href: '/platform/' },
            { name: '什么是低代码？', href: '/platform/lowcode' },
            { name: '技术架构', href: '/platform/architecture' },
            { name: '十大引擎', href: '/platform/features' },
            { name: '报价', href: '/platform/pricing' },
          ],
        },
        {
          id: 'features',
          name: '平台功能',
          href: '/platform/features/',
          items: [
            { name: '模型驱动开发', href: '/resources/features/model-builder' },
            { name: '页面设计器', href: '/resources/features/page-builder' },
            { name: '仪表盘与报表分析', href: '/resources/features/analytics' },     
            { name: '可视化流程设计', href: '/resources/features/workflow' },
            { name: '自动化与集成', href: '/resources/features/automation' },        
            { name: '安全与合规', href: '/resources/features/security' },        
            { name: '协同开发与版本管理', href: '/resources/features/developer-experience' },
          ],
        },
        {
          id: 'solutions',
          name: '视频',
          href: '/videos/',
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
      ],
    },
    {
      id: 'solutions',
      name: '解决方案',
      featured: [
        {
          name: '华炎魔方助力招商银行探索产品低代码化转型',
          href: '/resources/customer-success-stories/cmbchina-poc',
          imageSrc: 'https://console.steedos.cn/api/files/images/6440ac94671028003e760f11',
          imageAlt:
            '薪福通3.0借助华炎魔方平台向低代码赛道转型。',
        },
        {
          name: '华炎魔方助力清华大学搭建图书馆资产管理系统',
          href: '/resources/customer-success-stories/tsinghua',
          imageSrc: 'https://console.steedos.cn/api/files/images/6440acbd671028003e760f13',
          imageAlt:
            '2022年9月清华大学图书馆联合上海华炎软件，使用华炎魔方低代码开发平台进行了应用系统生命周期管理软件的研发，通过1个月的时间，完成了整个系统的建设。',
        },
      ],
      sections: [
        {
          id: 'solutions',
          name: '解决方案',
          href: '/resources/solutions',
          items: [
            { name: '客户关系管理', href: '/resources/solutions/crm' },
            { name: '项目管理', href: '/resources/solutions/project' },
            { name: '合同管理', href: '/resources/solutions/contract' },
            { name: '费控管理', href: '/resources/solutions/cost'},
            { name: '人力资源管理', href: '/resources/solutions/hr'},
            { name: '采购管理', href: '/resources/solutions/purchase'},
            { name: '生产管理', href: '/resources/solutions/pcmes' },
          ],
        },
        {
          id: 'ai',
          name: '人工智能',
          href: '/resources/artificial-intelligence',
          items: [
            { name: 'AI 协同写作', href: '/resources/artificial-intelligence/ai-word' },
            { name: 'AI 内容审核', href: '/resources/artificial-intelligence/ai-review' },
            { name: 'AI 知识库', href: '/resources/artificial-intelligence/ai-kb' },
            { name: 'AI 自动化', href: '/resources/artificial-intelligence/ai-automation' },
          ],
        },
        {
          id: 'customer-cases',
          name: '客户案例',
          href: '/resources/customer-success-stories/',
          items: [
            { name: '百事视频', href: '/resources/customer-success-stories/pepsico' },
            { name: '中国石油', href: '/resources/customer-success-stories/cnpc-media' },
            { name: '海泰地产', href: '/resources/customer-success-stories/hitime' },
            { name: '大众公用', href: '/resources/customer-success-stories/dzug' },
            { name: '招商银行', href: '/resources/customer-success-stories/cmbchina-poc' },
            { name: '清华大学', href: '/resources/customer-success-stories/tsinghua' },
            { name: '建华建材', href: '/resources/customer-success-stories/jianhuabm' },
          ],
        },
      ],
    },

  ],
  pages: [
    { name: '报价', href: '/platform/pricing' },
    { name: '文档', href: 'https://docs.steedos.com/zh-CN/getting-started/', target: "steedos-docs" },
    { name: '公司', href: '/company/about-us' },
  ],
}
