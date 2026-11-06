#!/usr/bin/env node
/**
 * Export every piece of website content out of the cloud CMS into the repo,
 * as the first step of migrating steedos.com to a static (Astro) site.
 *
 * Sources
 *   - Builder6 (api.builder6.com, base spc-66722b5a71056405ab198b56):
 *     b6_projects (应用), b6_pages (页面), b6_blocks, b6_blogs (知识库),
 *     b6_documents (知识), b6_components (组件)
 *   - Videos: the Steedos GraphQL API needs STEEDOS_SERVER_API_KEY, so they are
 *     read from the __NEXT_DATA__ embedded in the live /videos pages instead.
 *
 * Output
 *   cms-export/raw/<table>.json           untouched Builder6 records
 *   cms-export/pages/<project>/<url>.*    per-page snapshot (.html/.md/.json)
 *   cms-export/images.json                remote image URL -> local path
 *   cms-export/urls.csv                   every known URL + live status/SEO
 *   content/resources/_blogs.json         blog (知识库) metadata
 *   content/resources/<blog>/<doc>.md     documents (plain Markdown, not MDX:
 *                                       some bodies contain "<placeholder>"
 *                                       text MDX would parse as JSX)
 *   content/videos.json                   video collections with full details
 *   public/images/cms/<id>.webp           images, re-encoded as WebP (max 1920px)
 *   cms-export/.cache/images/             original images (gitignored)
 *
 * Usage
 *   node scripts/export-cms.mjs                  # everything
 *   node scripts/export-cms.mjs --no-images      # keep remote image URLs
 *   node scripts/export-cms.mjs --no-check       # skip live URL check
 *
 * Image optimization needs sharp: `npm i --prefix scripts` once.
 * Reads B6_CLOUD_API / B6_CLOUD_PROJECT_SECRET from the environment or .env.
 * The script only reads from the CMS; it never writes to it.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://www.steedos.cn'
const BASE_ID = 'spc-66722b5a71056405ab198b56'
const SITE_PROJECT_SLUG = 'steedos'
const TABLES = ['b6_projects', 'b6_pages', 'b6_blocks', 'b6_blogs', 'b6_documents', 'b6_components']
const PAGE_SIZE = 100

const args = new Set(process.argv.slice(2))
const DOWNLOAD_IMAGES = !args.has('--no-images')
const CHECK_LIVE = !args.has('--no-check')

const out = (...p) => path.join(ROOT, ...p)

async function loadEnv() {
  const env = { ...process.env }
  try {
    const text = await fs.readFile(out('.env'), 'utf8')
    for (const line of text.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (m && env[m[1]] === undefined) env[m[1]] = m[2]
    }
  } catch {}
  if (!env.B6_CLOUD_PROJECT_SECRET) throw new Error('B6_CLOUD_PROJECT_SECRET is not set')
  return { api: env.B6_CLOUD_API || 'https://api.builder6.com', key: env.B6_CLOUD_PROJECT_SECRET }
}

async function writeFile(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, typeof data === 'string' || Buffer.isBuffer(data) ? data : JSON.stringify(data, null, 2) + '\n')
}

async function fetchRetry(url, opts = {}, tries = 3, timeout = 30000) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { ...opts, signal: AbortSignal.timeout(timeout) })
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`)
      return res
    } catch (e) {
      if (i >= tries) throw new Error(`${url}: ${e.message}`)
      await new Promise((r) => setTimeout(r, 1000 * i))
    }
  }
}

async function pool(items, size, fn) {
  const results = new Array(items.length)
  let next = 0
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const i = next++
        results[i] = await fn(items[i], i)
      }
    })
  )
  return results
}

// ---------------------------------------------------------------- Builder6

// The `offset` returned by Builder6 is always 0, but passing a numeric offset
// works as "skip N", so page until a short page comes back.
async function fetchTable({ api, key }, table) {
  const records = []
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const url = `${api}/v0/${BASE_ID}/${table}?pageSize=${PAGE_SIZE}&offset=${offset}`
    const res = await fetchRetry(url, { headers: { Authorization: `Bearer ${key}` } })
    if (!res.ok) throw new Error(`${table}: HTTP ${res.status} ${await res.text()}`)
    const page = (await res.json()).records || []
    records.push(...page)
    if (page.length < PAGE_SIZE) break
  }
  return records
}

// ---------------------------------------------------------------- videos

function nextData(html) {
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s)
  return m ? JSON.parse(m[1]).props.pageProps : null
}

async function fetchVideos() {
  const res = await fetchRetry(`${SITE}/videos`)
  const collections = nextData(await res.text())?.videos || []
  const slugs = collections.flatMap((c) => (c.videos || []).map((v) => v.slug))
  const details = await pool(slugs, 6, async (slug) => {
    const r = await fetchRetry(`${SITE}/videos/${encodeURIComponent(slug)}`)
    return r.ok ? nextData(await r.text()) : null
  })
  const bySlug = Object.fromEntries(details.filter(Boolean).map((d) => [d.slug, d]))
  return collections.map((c) => ({
    _id: c._id,
    slug: (c.slug || '').trim(),
    name: c.name,
    description: c.description,
    sort_no: c.sort_no,
    videos: (c.videos || []).map((v) => {
      const d = bySlug[v.slug] || {}
      return {
        _id: v._id,
        slug: v.slug,
        name: d.name || v.name,
        title: d.title || null,
        summary: d.summary || v.summary || null,
        body: d.body || null,
        duration: d.duration || null,
        published_at: d.published_at || null,
        is_free: d.is_free ?? null,
        hls_url: d.hls_url || null,
        download_url: d.download_url || null,
        subtitles_url: d.subtitles_url || null,
        thumb_image: v.thumb_image ? `https://console.steedos.cn/api/files/images/${v.thumb_image}` : null,
        author: d.owner__expand?.name || null,
      }
    }),
  }))
}

// ---------------------------------------------------------------- images

const IMAGE_RE = /https?:\/\/(?:console|builder6)\.steedos\.cn\/api\/files\/(?:images|files)\/[A-Za-z0-9]+/g
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/webp': 'webp', 'image/svg+xml': 'svg', 'image/avif': 'avif' }

// Originals (≈420MB, mostly 1080p/4K screen-recording GIFs and PNGs) go to a
// gitignored cache; only a WebP copy, capped at MAX_WIDTH, lands in public/.
// GIFs stay animated. Both steps skip work already done, so reruns resume.
const CACHE_DIR = out('cms-export', '.cache', 'images')
const MAX_WIDTH = 1920

async function listById(dir) {
  const files = {}
  try {
    for (const f of await fs.readdir(dir)) files[f.replace(/\.\w+$/, '')] = f
  } catch {}
  return files
}

async function loadSharp() {
  try {
    return (await import('sharp')).default
  } catch {
    throw new Error('sharp is missing: run `npm i --prefix scripts` (or pass --no-images)')
  }
}

async function downloadImages(urls) {
  const sharp = await loadSharp()
  const map = {}
  const failed = []
  const cached = await listById(CACHE_DIR)
  const optimized = await listById(out('public', 'images', 'cms'))
  await pool([...urls].sort(), 4, async (url) => {
    const id = url.split('/').pop()
    try {
      if (!cached[id]) {
        const res = await fetchRetry(url, {}, 3, 180000)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const type = (res.headers.get('content-type') || '').split(';')[0].trim()
        const ext = EXT[type]
        if (!ext) throw new Error(`not an image: ${type || 'unknown type'}`)
        cached[id] = `${id}.${ext}`
        await writeFile(path.join(CACHE_DIR, cached[id]), Buffer.from(await res.arrayBuffer()))
      }
      const src = path.join(CACHE_DIR, cached[id])
      const name = cached[id].endsWith('.svg') ? cached[id] : `${id}.webp`
      if (optimized[id] !== name) {
        const dest = out('public', 'images', 'cms', name)
        await fs.mkdir(path.dirname(dest), { recursive: true })
        if (name.endsWith('.svg')) await fs.copyFile(src, dest)
        else
          await sharp(src, { animated: true, limitInputPixels: false })
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({ quality: 80, effort: 4 })
            .toFile(dest)
      }
      map[url] = `/images/cms/${name}`
    } catch (e) {
      failed.push({ url, error: e.message })
    }
  })
  return { map, failed }
}

const rewriteImages = (text, map) => (text ? text.replace(IMAGE_RE, (u) => map[u] || u) : text)

// ---------------------------------------------------------------- content

const yamlString = (v) => JSON.stringify(String(v)) // JSON strings are valid YAML

function frontmatter(obj) {
  const lines = Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}: ${typeof v === 'string' ? yamlString(v) : v}`)
  return `---\n${lines.join('\n')}\n---\n`
}

// Document urls may contain "/" or "@" (e.g. "@steedos-labs/template-hr2").
const safeName = (s) => s.replace(/^@/, '').replace(/[\/\\]+/g, '--').replace(/[^\w.\-]+/g, '-') || 'index'
const pageFileName = (url) => (url === '/' ? 'index' : url.replace(/^\/+|\/+$/g, '').replace(/\//g, '__'))

async function exportPages(pages, blocks, projects, imageMap) {
  const projectById = Object.fromEntries(projects.map((p) => [p._id, p]))
  for (const page of pages) {
    const project = projectById[page.project_id]?.slug || '_unknown'
    const base = out('cms-export', 'pages', project, pageFileName(page.url || page._id))
    const pageBlocks = blocks.filter((b) => b.page_id === page._id).sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    if (page.html) {
      const html = [page.html, ...pageBlocks.map((b) => b.html || '')].join('\n')
      await writeFile(`${base}.html`, rewriteImages(html, imageMap))
    }
    if (page.markdown) await writeFile(`${base}.md`, rewriteImages(page.markdown, imageMap))
    await writeFile(`${base}.json`, { ...page, blocks: pageBlocks })
  }
}

async function exportDocuments(docs, blogs, imageMap) {
  const blogById = Object.fromEntries(blogs.map((b) => [b._id, b]))
  await writeFile(
    out('content', 'resources', '_blogs.json'),
    blogs
      .map((b) => ({ _id: b._id, url: b.url, name: b.name, description: b.description || null }))
      .sort((a, b) => a.url.localeCompare(b.url))
  )
  const files = []
  for (const doc of docs) {
    const blog = blogById[doc.blog_id]
    const dir = blog ? blog.url : '_orphans'
    const file = path.join('content', 'resources', dir, `${safeName(doc.url || doc._id)}.md`)
    const cover = doc.cover ? `https://builder6.steedos.cn/api/files/images/${doc.cover}` : null
    const fm = frontmatter({
      title: doc.name,
      description: doc.summary,
      slug: doc.url,
      blog: blog?.url,
      status: doc.status === 'hidden' ? 'hidden' : 'published',
      cover: cover && (imageMap[cover] || cover),
      created: doc.created,
      modified: doc.modified,
      b6_id: doc._id,
    })
    await writeFile(out(file), `${fm}\n${rewriteImages(doc.markdown || '', imageMap).trim()}\n`)
    files.push({ doc, blog, file })
  }
  return files
}

// ---------------------------------------------------------------- URL inventory

async function navHrefs() {
  const hrefs = new Set()
  for (const f of ['header.js', 'footer.js', 'documentation.js']) {
    try {
      const text = await fs.readFile(out('src', 'navs', f), 'utf8')
      for (const m of text.matchAll(/href:\s*['"`](\/[^'"`]*)['"`]/g)) hrefs.add(m[1])
    } catch {}
  }
  return hrefs
}

function buildInventory({ projects, pages, blogs, docFiles, videos, redirects, nav }) {
  const rows = new Map()
  const add = (url, row) => {
    url = url.length > 1 ? url.replace(/\/+$/, '') : url
    if (!rows.has(url)) rows.set(url, { url, ...row })
  }
  const projectById = Object.fromEntries(projects.map((p) => [p._id, p]))

  // Pages of the site project are served at their own url; other projects'
  // pages go through /[projectSlug]/[[...slug]], i.e. "/<slug><url>".
  for (const p of pages) {
    const proj = projectById[p.project_id]
    const url = proj?.slug === SITE_PROJECT_SLUG ? p.url : `/${proj?.slug}${p.url === '/' ? '' : p.url}`
    add(url, { kind: proj?.slug === SITE_PROJECT_SLUG ? 'page' : 'project-page', title: p.name, status: 'published', source: `b6_pages:${p._id}`, file: `cms-export/pages/${proj?.slug}/${pageFileName(p.url)}.json` })
  }
  for (const b of blogs) add(`/resources/${b.url}`, { kind: 'blog-index', title: b.name, status: 'published', source: `b6_blogs:${b._id}`, file: 'content/resources/_blogs.json' })
  for (const { doc, blog, file } of docFiles) {
    if (!blog) continue
    add(`/resources/${blog.url}/${doc.url}`, { kind: 'document', title: doc.name, status: doc.status === 'hidden' ? 'hidden' : 'published', source: `b6_documents:${doc._id}`, file })
  }
  add('/videos', { kind: 'video-index', title: '视频', status: 'published', source: 'videos', file: 'content/videos.json' })
  for (const c of videos)
    for (const v of c.videos) {
      add(`/videos/${v.slug}`, { kind: 'video', title: v.name, status: 'published', source: `site_videos:${v._id}`, file: 'content/videos.json' })
      add(`/embed/videos/${v.slug}`, { kind: 'video-embed', title: v.name, status: 'published', source: `site_videos:${v._id}`, file: 'content/videos.json' })
    }
  for (const r of redirects) {
    if (r.source.includes(':')) continue
    add(r.source, { kind: 'redirect', title: '', status: r.permanent ? '301' : '302', source: 'redirects.json', file: '', target: r.destination })
  }
  for (const href of nav) add(href, { kind: 'nav-link', title: '', status: '', source: 'src/navs', file: '' })
  return [...rows.values()].sort((a, b) => a.url.localeCompare(b.url))
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")

async function checkLive(rows) {
  await pool(rows, 8, async (row) => {
    try {
      const url = SITE + row.url.split('/').map((s) => encodeURIComponent(decodeURIComponent(s))).join('/')
      const res = await fetchRetry(url, { redirect: 'manual' })
      row.live_status = res.status
      row.live_location = res.headers.get('location') || ''
      if (res.status === 200) {
        const html = await res.text()
        row.live_title = decode(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] || '')
        row.live_description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '')
      }
    } catch (e) {
      row.live_status = 'ERR'
      row.live_location = e.message
    }
  })
}

function toCsv(rows) {
  const cols = ['url', 'kind', 'status', 'title', 'source', 'file', 'target', 'live_status', 'live_location', 'live_title', 'live_description']
  const cell = (v) => {
    const s = v === undefined || v === null ? '' : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  return [cols.join(','), ...rows.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\n') + '\n'
}

// ---------------------------------------------------------------- main

async function main() {
  const env = await loadEnv()

  console.log('Fetching Builder6 tables…')
  const raw = {}
  for (const t of TABLES) {
    raw[t] = await fetchTable(env, t)
    await writeFile(out('cms-export', 'raw', `${t}.json`), raw[t])
    console.log(`  ${t}: ${raw[t].length}`)
  }
  const fields = (t) => raw[t].map((r) => r.fields)
  const [projects, pages, blocks, blogs, docs, components] = TABLES.map(fields)

  console.log('Fetching videos from the live site…')
  const videos = await fetchVideos()
  console.log(`  ${videos.length} collections, ${videos.reduce((n, c) => n + c.videos.length, 0)} videos`)

  let imageMap = {}
  if (DOWNLOAD_IMAGES) {
    const urls = new Set()
    const scan = (v) => JSON.stringify(v).replace(/\\\//g, '/').match(IMAGE_RE)?.forEach((u) => urls.add(u))
    scan([pages, blocks, docs, components])
    docs.forEach((d) => d.cover && urls.add(`https://builder6.steedos.cn/api/files/images/${d.cover}`))
    videos.forEach((c) => c.videos.forEach((v) => v.thumb_image && urls.add(v.thumb_image)))
    console.log(`Downloading ${urls.size} images…`)
    const { map, failed } = await downloadImages(urls)
    imageMap = map
    await writeFile(out('cms-export', 'images.json'), { images: map, failed })
    console.log(`  ok ${Object.keys(map).length}, failed ${failed.length}`)
  }

  console.log('Writing content…')
  await exportPages(pages, blocks, projects, imageMap)
  const docFiles = await exportDocuments(docs, blogs, imageMap)
  await writeFile(
    out('content', 'videos.json'),
    videos.map((c) => ({ ...c, videos: c.videos.map((v) => ({ ...v, thumb_image: imageMap[v.thumb_image] || v.thumb_image })) }))
  )
  console.log(`  ${pages.length} pages, ${docFiles.length} documents (${docFiles.filter((f) => !f.blog).length} without a blog)`)

  const redirects = JSON.parse(await fs.readFile(out('redirects.json'), 'utf8'))
  const rows = buildInventory({ projects, pages, blogs, docFiles, videos, redirects, nav: await navHrefs() })
  if (CHECK_LIVE) {
    console.log(`Checking ${rows.length} URLs against ${SITE}…`)
    await checkLive(rows)
    const tally = rows.reduce((t, r) => ((t[r.live_status] = (t[r.live_status] || 0) + 1), t), {})
    console.log('  ' + Object.entries(tally).map(([k, v]) => `${k}: ${v}`).join(', '))
  }
  await writeFile(out('cms-export', 'urls.csv'), toCsv(rows))
  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
