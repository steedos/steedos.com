// Site-wide constants and navigation, ported from the old src/navs/*.js
// (with the "/reources" typos and trailing slashes fixed).

export const SITE = {
  name: '华炎魔方',
  brand: 'Steedos',
  company: '上海华炎软件科技有限公司',
  shortCompany: '华炎软件',
  titleSuffix: 'Steedos',
  description:
    '华炎魔方是可编程的低代码平台，将低代码技术与企业业务场景结合，助力企业在最短时间内开发数字化解决方案。',
  icp: '沪ICP备09089283号',
  phone: '400-820-1612',
  docsUrl: 'https://docs.steedos.com/zh-CN/getting-started/',
  demoUrl: 'https://demo.steedos.cn/',
  githubUrl: 'https://github.com/steedos/steedos-platform/',
  gaId: 'G-XVSWFLK780',
  baiduTongjiId: '71df50f1349009234f7e11d247f4c5db',
};

export type NavItem = { label: string; href: string; external?: boolean };
export type NavSection = { label: string; href?: string; items: NavItem[] };
export type NavGroup = { id: string; label: string; sections: NavSection[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'platform',
    label: '产品',
    sections: [
      {
        label: '产品',
        href: '/platform',
        items: [
          { label: '华炎魔方概览', href: '/platform' },
          { label: '核心功能', href: '/platform/features' },
          { label: '解决方案', href: '/platform/solutions' },
          { label: '人工智能', href: '/resources/artificial-intelligence' },
          { label: '低代码', href: '/platform/lowcode' },
          { label: '报价', href: '/platform/pricing' },
        ],
      },
      {
        label: '核心功能',
        href: '/platform/features',
        items: [
          { label: '模型驱动开发', href: '/resources/features/model-builder' },
          { label: '页面设计器', href: '/resources/features/page-builder' },
          { label: '仪表盘与报表分析', href: '/resources/features/analytics' },
          { label: '可视化流程设计', href: '/resources/features/workflow' },
          { label: '安全与合规', href: '/resources/features/security' },
          { label: '自动化与集成', href: '/resources/features/automation' },
          { label: '协同开发与版本管理', href: '/resources/features/developer-experience' },
        ],
      },
      {
        label: '视频',
        href: '/videos',
        items: [
          { label: '数据建模', href: '/videos/lesson-object' },
          { label: '权限引擎', href: '/videos/authority_management' },
          { label: '公式引擎', href: '/videos/formula-calculates' },
          { label: '规则引擎', href: '/videos/workflow_rules' },
          { label: '批准过程', href: '/videos/admin-contracts' },
          { label: '元数据同步', href: '/videos/lesson-metadata' },
          { label: 'DevOps', href: '/videos/live-course-devops' },
        ],
      },
    ],
  },
  {
    id: 'solutions',
    label: '解决方案',
    sections: [
      {
        label: '解决方案',
        href: '/resources/solutions',
        items: [
          { label: '客户关系管理', href: '/resources/solutions/crm' },
          { label: '项目管理', href: '/resources/solutions/project' },
          { label: '合同管理', href: '/resources/solutions/contract' },
          { label: '费控管理', href: '/resources/solutions/cost' },
          { label: '人力资源管理', href: '/resources/solutions/hr' },
          { label: '采购管理', href: '/resources/solutions/purchase' },
          { label: '生产管理', href: '/resources/solutions/pcmes' },
        ],
      },
      {
        label: '人工智能',
        href: '/resources/artificial-intelligence',
        items: [
          { label: 'AI 协同写作', href: '/resources/artificial-intelligence/ai-word' },
          { label: 'AI 内容审核', href: '/resources/artificial-intelligence/ai-review' },
          { label: 'AI 知识库', href: '/resources/artificial-intelligence/ai-kb' },
          { label: 'AI 自动化', href: '/resources/artificial-intelligence/ai-automation' },
        ],
      },
      {
        label: '客户案例',
        href: '/resources/customer-success-stories',
        items: [
          { label: '百事食品', href: '/resources/customer-success-stories/pepsico' },
          { label: '中国石油', href: '/resources/customer-success-stories/cnpc-media' },
          { label: '海泰地产', href: '/resources/customer-success-stories/hitime' },
          { label: '大众公用', href: '/resources/customer-success-stories/dzug' },
          { label: '招商银行', href: '/resources/customer-success-stories/cmbchina-poc' },
          { label: '清华大学', href: '/resources/customer-success-stories/tsinghua' },
          { label: '建华建材', href: '/resources/customer-success-stories/jianhuabm' },
        ],
      },
    ],
  },
];

export const NAV_LINKS: NavItem[] = [
  { label: '报价', href: '/platform/pricing' },
  { label: '文档', href: SITE.docsUrl, external: true },
  { label: '公司', href: '/company/about-us' },
];

export const FOOTER_SECTIONS: NavSection[] = [
  {
    label: '低代码',
    href: '/platform/overview',
    items: [
      { label: '华炎魔方', href: '/platform' },
      { label: '模型驱动开发', href: '/resources/features/model-builder' },
      { label: '页面设计器', href: '/resources/features/page-builder' },
      { label: '仪表盘与报表分析', href: '/resources/features/analytics' },
      { label: '可视化流程设计', href: '/resources/features/workflow' },
      { label: '安全与合规', href: '/resources/features/security' },
      { label: '自动化与集成', href: '/resources/features/automation' },
      { label: '协同开发与版本管理', href: '/resources/features/developer-experience' },
    ],
  },
  NAV_GROUPS[1].sections[1],
  NAV_GROUPS[1].sections[0],
  NAV_GROUPS[1].sections[2],
];

export const FOOTER_LINKS: NavItem[] = [
  { label: '关于我们', href: '/company/about-us' },
  { label: '联系我们', href: '/company/contact-us' },
  { label: '隐私条款', href: '/company/privacy' },
  { label: '视频教程', href: '/videos' },
  { label: '文档', href: SITE.docsUrl, external: true },
  { label: 'GitHub', href: SITE.githubUrl, external: true },
];

/** "<title> - <section> - Steedos", the title format the old site used. */
export function pageTitle(...parts: (string | undefined | null)[]): string {
  return [...parts.filter(Boolean), SITE.titleSuffix].join(' - ');
}
