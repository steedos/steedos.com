// Pages built in the Builder6 visual editor, carried over as-is: the HTML it
// rendered plus the Tailwind CSS it compiled for that page. They are meant to
// be rewritten into native components one by one; until then this keeps every
// URL and its content identical. Snapshots come from scripts/export-cms.mjs.
import redirects from '../../redirects.json';

interface Block {
  html?: string;
  tailwind?: string;
  sort?: number;
}
interface PageRecord {
  _id: string;
  name: string;
  description?: string;
  url: string;
  type: string;
  html?: string;
  tailwind?: string;
  builder?: string;
  project_id: string;
  blocks: Block[];
}

const SITE_PROJECT = 'steedos';

const records = import.meta.glob<PageRecord>('../../cms-export/pages/*/*.json', {
  eager: true,
  import: 'default',
});

export interface LegacyPage {
  path: string;
  project: string;
  title: string;
  description?: string;
  type: string;
  html: string;
  css: string;
  /** Builder6 scopes each compiled stylesheet under `.builder-component-<id>`;
   *  the markup must sit inside elements carrying those classes. */
  scopes: string[];
  record: PageRecord;
}

// Redirect sources win over pages (e.g. /solutions -> /resources/solutions).
const redirected = new Set(redirects.map((r) => r.source));

export const LEGACY_PAGES: LegacyPage[] = Object.entries(records)
  .map(([file, record]) => {
    const project = file.split('/').at(-2)!;
    const css = [record.tailwind ?? '', ...record.blocks.map((b) => b.tailwind ?? '')].join('\n');
    const path =
      project === SITE_PROJECT ? record.url : `/${project}${record.url === '/' ? '' : record.url}`;
    return {
      path,
      project,
      title: record.name,
      description: record.description || undefined,
      type: record.type,
      html: [record.html ?? '', ...record.blocks.map((b) => b.html ?? '')].join('\n'),
      css,
      scopes: [...new Set(css.match(/(?<=\.)builder-component-[\w-]+/g) ?? [])],
      record,
    };
  })
  .filter((p) => !redirected.has(p.path))
  .sort((a, b) => a.path.localeCompare(b.path));

export const legacyPage = (path: string) => LEGACY_PAGES.find((p) => p.path === path);
