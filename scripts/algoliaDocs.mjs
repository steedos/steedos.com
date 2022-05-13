import dotenv from 'dotenv-flow'
import globby from 'globby';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import algoliasearch from 'algoliasearch';

dotenv.config(process.cwd());

const pages = await globby([
  path.join(process.cwd(), 'src', 'pages', 'developer', '*.mdx')
]);

const objects = pages.map(page => {
  const fileContents = fs.readFileSync(page, 'utf8')
  const {data, content} = matter(fileContents)
  const pagePath = page.replace('.mdx', '');
  let slug = pagePath.replace(path.join(process.cwd(), 'src', 'pages'), '');
  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + slug 
  return {
    objectID: slug,
    url,
    content,
    frontmatter: {
      ...data
    }
  }
})

console.log(objects)

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY,
);
const index = client.initIndex("steedos-com")
index.saveObjects(objects, {
  autoGenerateObjectIDIfNotExist: true
});