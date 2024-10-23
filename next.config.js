const path = require('path')
const { createLoader } = require('simple-functional-loader')
const frontMatter = require('front-matter')
const withSmartQuotes = require('@silvenon/remark-smartypants')
const { withTableOfContents } = require('./remark/withTableOfContents')
const { withSyntaxHighlighting } = require('./remark/withSyntaxHighlighting')
const { withLinkRoles } = require('./rehype/withLinkRoles')
const minimatch = require('minimatch')


// const { withPrevalInstructions } = require('./remark/withPrevalInstructions')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const defaultConfig = require('tailwindcss/resolveConfig')(require('tailwindcss/defaultConfig'))

const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(
  [
    'react-markdown',
    'remark-gfm',
    'markdown-toc',
    'react-syntax-highlighter'
  ], {resolveSymlinks: true, debug: true,}); // pass the modules you would like to see transpiled

const {remarkPluginsWebpack} = require('./remark')
const {rehypePlugins} = require('./rehype')
  
const fallbackLayouts = {
  // 'src/pages/docs/protocol/*': ['@/layouts/ProtocolLayout', 'ProtocolLayout'],
  'src/pages/docs/**/*': ['@/layouts/DocumentationLayout', 'DocumentationLayout'],
}

const fallbackDefaultExports = {
  'src/pages/docs/**/*': ['@/layouts/ContentsLayout', 'ContentsLayout'],
  'src/pages/developer/**/*': ['@/layouts/ContentsLayout', 'ContentsLayout'],
  'src/pages/blog/**/*': ['@/layouts/BlogPostLayout', 'BlogPostLayout'],
}

const fallbackGetStaticProps = {
  'src/pages/blog/**/*': '@/layouts/BlogPostLayout',
}

const moduleExports = 
  withPlugins(
  [
  //   // withBundleAnalyzer({
  //   //   enabled: process.env.ANALYZE === `true`,
  //   // }),
    withTM
  ], 
  {
  env: {
    NEXT_PUBLIC_DEPLOYMENT_URL: process.env.NEXT_PUBLIC_DEPLOYMENT_URL,
    NEXT_PUBLIC_STEEDOS_ROOT_URL: process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL,
    STEEDOS_SERVER_API_KEY: process.env.STEEDOS_SERVER_API_KEY,
    NEXT_STATIC_PROPS_REVALIDATE: process.env.NEXT_STATIC_PROPS_REVALIDATE,
    KEYCLOAK_ID: process.env.KEYCLOAK_ID,
    KEYCLOAK_SECRET: process.env.KEYCLOAK_SECRET,
    KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    STEEDOS_IDENTITY_JWT_SECRET:process.env.STEEDOS_IDENTITY_JWT_SECRET,
  },
  // target: "serverless",
  webpack5: true,
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  experimental: {
    // modern: true,
    // esmExternals: true
    newNextLinkBehavior: true,
    scrollRestoration: true,
    images: { allowFutureImage: true }
  },
  
  async redirects() {
    return require('./redirects.json')
  },
  webpack(config, options) {
    // if (!options.dev) {
    //   options.defaultLoaders.babel.options.cache = false
    // }
    config.module.rules.push({
      test: /.node$/,
      loader: 'node-loader',
    })
    // config.module.rules.push({
    //   test: /\.(png|jpe?g|gif|webp)$/i,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         publicPath: '/_next',
    //         name: 'static/media/[name].[hash].[ext]',
    //       },
    //     },
    //   ],
    // })

    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: [
    //     { loader: '@svgr/webpack', options: { svgoConfig: { plugins: { removeViewBox: false } } } },
    //     'url-loader',
    //   ],
    // })

    // config.module.rules.push({
    //   test: /\.(png|jpe?g|gif|webp|avif|mp4)$/i,
    //   issuer: /\.(jsx?|tsx?|mdx)$/,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         publicPath: '/_next',
    //         name: 'static/media/[name].[hash].[ext]',
    //       },
    //     },
    //   ],
    // })

    config.resolve.alias['defaultConfig$'] = require.resolve('tailwindcss/defaultConfig')
    config.module.rules.push({
      test: require.resolve('tailwindcss/defaultConfig'),
      use: createLoader(function (_source) {
        return `export default ${JSON.stringify(defaultConfig)}`
      }),
    })

    let mdx = (plugins = []) => [
      {
        loader: '@mdx-js/loader',
        options: {
          remarkPlugins: [
            // withPrevalInstructions,
            // withExamples,
            withTableOfContents,
            withSyntaxHighlighting,
            // withNextLinks,
            withSmartQuotes,
            ...plugins,
          ],
          rehypePlugins: [withLinkRoles],
        },
      },
      createLoader(function (source) {
        let pathSegments = this.resourcePath.split(path.sep)
        let slug =
          pathSegments[pathSegments.length - 1] === 'index.mdx'
            ? pathSegments[pathSegments.length - 2]
            : pathSegments[pathSegments.length - 1].replace(/\.mdx$/, '')
        return source + `\n\nexport const slug = '${slug}'`
      }),
    ]

    config.module.rules.push({
      test: { and: [/\.mdx$/, /snippets/] },
      resourceQuery: { not: [/rss/, /preview/] },
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [withSyntaxHighlighting],
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.mdx$/,
      resourceQuery: /rss/,
      use: [options.defaultLoaders.babel, ...mdx()],
    })

    config.module.rules.push({
      test: /\.mdx$/,
      resourceQuery: /preview/,
      use: [
        options.defaultLoaders.babel,
        createLoader(function (src) {
          const [preview] = src.split('<!--/excerpt-->')
          return preview.replace('<!--excerpt-->', '')
        }),
        ...mdx([
          () => (tree) => {
            let firstParagraphIndex = tree.children.findIndex((child) => child.type === 'paragraph')
            if (firstParagraphIndex > -1) {
              tree.children = tree.children.filter((child, index) => {
                if (child.type === 'import' || child.type === 'export') {
                  return true
                }
                return index <= firstParagraphIndex
              })
            }
          },
        ]),
      ],
    })

    config.module.rules.push({
      test: { and: [/\.mdx$/], not: [/snippets/] },
      resourceQuery: { not: [/rss/, /preview/] },
      use: [
        options.defaultLoaders.babel,
        createLoader(function (source) {
          if (source.includes('/*START_META*/')) {
            const [meta] = source.match(/\/\*START_META\*\/(.*?)\/\*END_META\*\//s)
            return 'export default ' + meta
          }
          return (
            source.replace(/export const/gs, 'const') + `\nMDXContent.layoutProps = layoutProps\n`
          )
        }),
        ...mdx(),
        createLoader(function (source) {
          let fields = new URLSearchParams(this.resourceQuery.substr(1)).get('meta') ?? undefined
          let { attributes: meta, body } = frontMatter(source)
          if (fields) {
            for (let field in meta) {
              if (!fields.split(',').includes(field)) {
                delete meta[field]
              }
            }
          }

          let extra = []
          let resourcePath = path.relative(__dirname, this.resourcePath)

          if (!/^\s*export\s+(var|let|const)\s+Layout\s+=/m.test(source)) {
            for (let glob in fallbackLayouts) {
              if (minimatch(resourcePath, glob)) {
                extra.push(
                  `import { ${fallbackLayouts[glob][1]} as _Layout } from '${fallbackLayouts[glob][0]}'`,
                  'export const Layout = _Layout'
                )
                break
              }
            }
          }

          if (!/^\s*export\s+default\s+/m.test(source.replace(/```(.*?)```/gs, ''))) {
            for (let glob in fallbackDefaultExports) {
              if (minimatch(resourcePath, glob)) {
                extra.push(
                  `import { ${fallbackDefaultExports[glob][1]} as _Default } from '${fallbackDefaultExports[glob][0]}'`,
                  'export default _Default'
                )
                break
              }
            }
          }

          if (
            !/^\s*export\s+(async\s+)?function\s+getStaticProps\s+/m.test(
              source.replace(/```(.*?)```/gs, '')
            )
          ) {
            for (let glob in fallbackGetStaticProps) {
              if (minimatch(resourcePath, glob)) {
                extra.push(`export { getStaticProps } from '${fallbackGetStaticProps[glob]}'`)
                break
              }
            }
          }

          let metaExport
          if (!/export\s+(const|let|var)\s+meta\s*=/.test(source)) {
            metaExport =
              typeof fields === 'undefined'
                ? `export const meta = ${JSON.stringify(meta)}`
                : `export const meta = /*START_META*/${JSON.stringify(meta || {})}/*END_META*/`
          }

          return [
            ...(typeof fields === 'undefined' ? extra : []),
            typeof fields === 'undefined'
              ? body.replace(/<!--excerpt-->.*<!--\/excerpt-->/s, '')
              : '',
            metaExport,
          ]
            .filter(Boolean)
            .join('\n\n')
        }),
      ],
    })

    return config
  },
});

module.exports = moduleExports