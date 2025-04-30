
export const headerNav = {
  categories: [
    {
      id: 'platform',
      name: '平台',
      featured: [
        {
          name: '华炎魔方将人工智能技术融入真实的业务场景中',
          href: '/resources/artificial-intelligence',
          imageSrc: 'https://console.steedos.cn/api/files/images/3TNS6p46atnntJE4y',
          imageAlt:'华炎魔方将人工智能技术融入真实的业务场景中，为企业提供更加智能、高效的解决方案，以提升企业的生产力和创造力。',
        },
        {
          name: '探索华炎魔方如何助力你的企业实现成功',
          href: '/resources/customer-success-stories',
          imageSrc: 'https://console.steedos.cn/api/files/images/ER8tP4Yvu8fDfvFkR',
          imageAlt: '华炎魔方十大引擎',
        },
      ],
      sections: [
        {
          id: 'platform',
          name: '平台',
          href: '/platform/',
          items: [
            { name: '华炎魔方概览', href: '/platform/' },
            { name: '核心功能', href: '/platform/features' },
            { name: '解决方案', href: '/platform/solutions' },
            { name: '人工智能', href: '/resources/artificial-intelligence' },
            { name: '低代码', href: '/platform/lowcode' },
            { name: '报价', href: '/platform/pricing' },
          ],
        },
        {
          id: 'features',
          name: '核心功能',
          href: '/platform/features/',
          items: [
            { name: '数据建模', href: '/resources/features/model-builder' },
            { name: '页面设计', href: '/resources/features/page-builder' },
            { name: '数据分析', href: '/resources/features/analytics' },     
            { name: '流程设计', href: '/resources/features/workflow' },    
            { name: '安全与合规', href: '/resources/features/security' },        
            { name: '自动化', href: '/resources/features/automation' },    
            { name: '协同开发', href: '/resources/features/developer-experience' },
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
          name: '以 AI 驱动审核革新，百事食品构建安全合规的内容生态',
          href: '/resources/customer-success-stories/pepsico',
          imageSrc: 'https://builder6.steedos.cn/api/files/images/6810a39e5c7a28060df69595',
        },
        {
          name: '低代码驱动地产创新：华炎魔方赋能海泰地产管理升级',
          href: '/resources/customer-success-stories/hitime',
          imageSrc: 'https://builder6.steedos.cn/api/files/images/68119f8f5c7a28060df695c7',
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
            { name: '生产管理', href: '/resources/solutions/pcmes' },
            { name: '全部解决方案', href: '/resources/solutions' },
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
            { name: '全部 AI 解决方案', href: '/resources/artificial-intelligence' },
          ],
        },
        {
          id: 'customer-cases',
          name: '客户案例',
          href: '/resources/customer-success-stories/',
          items: [
            { name: '百事食品', href: '/resources/customer-success-stories/pepsico' },
            { name: '中国石油', href: '/resources/customer-success-stories/cnpc-media' },
            { name: '海泰地产', href: '/resources/customer-success-stories/hitime' },
            { name: '大众公用', href: '/resources/customer-success-stories/dzug' },
            { name: '广东省二院', href: '/resources/customer-success-stories/gd2h' },
            { name: '清华大学', href: '/resources/customer-success-stories/tsinghua' },
            { name: '建华建材', href: '/resources/customer-success-stories/jianhuabm' },
            { name: '全部案例', href: '/resources/artificial-intelligence' },
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
