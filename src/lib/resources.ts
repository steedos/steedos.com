import { getCollection, type CollectionEntry } from 'astro:content';
import blogs from '../../content/resources/_blogs.json';

export type Blog = (typeof blogs)[number];
export type Doc = CollectionEntry<'resources'>;

export const BLOGS: Blog[] = blogs;

export const blogPath = (blog: string) => `/resources/${blog}`;
export const docPath = (doc: Doc) => `/resources/${doc.data.blog}/${doc.data.slug}`;

export function blogByUrl(url: string): Blog | undefined {
  return BLOGS.find((b) => b.url === url);
}

/** Every document, hidden ones included: their URLs stayed reachable on the old site. */
export async function getAllDocs(): Promise<Doc[]> {
  return getCollection('resources');
}

/** Listed documents of one blog, in the order they were created in the CMS. */
export async function getBlogDocs(blog: string): Promise<Doc[]> {
  return (await getCollection('resources'))
    .filter((d) => d.data.blog === blog && d.data.status === 'published')
    .sort((a, b) => a.data.created.getTime() - b.data.created.getTime());
}

export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
