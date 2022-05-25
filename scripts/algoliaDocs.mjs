import dotenv from 'dotenv-flow'
import globby from 'globby';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import algoliasearch from 'algoliasearch';

dotenv.config(process.cwd());

const pages = await globby([
  path.join(process.cwd(), 'src', 'pages', 'docs', '**/*.mdx')
]);

console.log(pages)
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
  'TL0K9Y2YIH',
  '4112cbe8b5affd27883cf29b1df73ad4',
);
const index = client.initIndex("steedos")
const result = await index.saveObjects(objects, {
  autoGenerateObjectIDIfNotExist: true
});
console.log(result)