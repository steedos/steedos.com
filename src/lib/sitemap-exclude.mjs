// Paths that exist (old URLs keep working) but should not be advertised in
// the sitemap. Plain Node so astro.config.mjs can import it.
import fs from 'node:fs';
import path from 'node:path';

const RESOURCES = path.resolve('content/resources');

function hiddenDocumentPaths() {
  const paths = [];
  const blogs = JSON.parse(fs.readFileSync(path.join(RESOURCES, '_blogs.json'), 'utf8'));
  for (const blog of blogs) {
    const dir = path.join(RESOURCES, blog.url);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      const text = fs.readFileSync(path.join(dir, file), 'utf8');
      if (!/^status: "hidden"$/m.test(text)) continue;
      const slug = JSON.parse(text.match(/^slug: (".*")$/m)[1]);
      paths.push(`/resources/${blog.url}/${slug}`);
    }
  }
  return paths;
}

const videos = JSON.parse(fs.readFileSync(path.resolve('content/videos.json'), 'utf8'));

export const hiddenPaths = new Set([
  ...hiddenDocumentPaths(),
  ...videos.flatMap((c) => c.videos.map((v) => `/embed/videos/${v.slug}`)),
  '/appexchange',
  '/platform/forms/lowcode/success',
]);
