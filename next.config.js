const path = require('path')
const querystring = require('querystring')
const { createLoader } = require('simple-functional-loader')
const frontMatter = require('front-matter')
const minimatch = require('minimatch')
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })


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
  
const withMDX = require(`@next/mdx`)({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins,
    remarkPlugins: remarkPluginsWebpack
  },
})


// const withMdxEnhanced = require('next-mdx-enhanced')

// const fallbackLayouts = {
//   'src/pages/docs/**/*': ['@/layouts/DocumentationLayout', 'DocumentationLayout'],
//   'src/pages/components/**/*': ['@/layouts/ComponentsLayout', 'ComponentsLayout'],
//   'src/pages/platform/**/*': ['@/layouts/PlatformLayout', 'PlatformLayout'],
//   'src/pages/pricing/**/*': ['@/layouts/PricingLayout', 'PricingLayout'],
//   'src/pages/course/**/*': ['@/layouts/CourseLayout', 'CourseLayout'],
// }

// const fallbackDefaultExports = {
//   'src/pages/{docs,components,pricing,platform}/**/*': ['@/layouts/ContentsLayout', 'ContentsLayout'],
//   'src/pages/course/**/*': ['@/layouts/VideoLayout', 'VideoLayout'],
// }
let NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL_HOSTNAME = null;
try {
  if(process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL){
    let parsedSrc = new URL(process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL);
    NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL_HOSTNAME = parsedSrc.hostname
  }
} catch (err) {
  console.error(err);
}

module.exports = 
  withPlugins(
  [
  //   // withBundleAnalyzer({
  //   //   enabled: process.env.ANALYZE === `true`,
  //   // }),
  //   // withMdxEnhanced({
  //   //   layoutPath: 'layouts',
  //   //   defaultLayout: true,
  //   //   fileExtensions: ['mdx'],
  //   //   remarkPlugins,
  //   //   rehypePlugins,
  //   //   usesSrc: true,
  //   //   extendFrontMatter: {
  //   //     process: (mdxContent, frontMatter) => {},
  //   //     phase: 'prebuild|loader|both',
  //   //   },
  //   //   reExportDataFetching: false,
  //   // })
    withMDX,
    withTM
  ], 
  {
  target: 'serverless',
  env: {
    STEEDOS_SERVER_API_KEY: process.env.STEEDOS_SERVER_API_KEY,
  },
  webpack5: true,
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  experimental: {
    modern: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'huayan.steedos.cn', 'console.dev.steedos.cn', 'console.steedos.cn', NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL_HOSTNAME],
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

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        { loader: '@svgr/webpack', options: { svgoConfig: { plugins: { removeViewBox: false } } } },
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    // config.module.rules.push({
    //   test: /\.mdx/,
    //   use: [
    //     options.defaultLoaders.babel,
    //     {
    //       loader: '@mdx-js/loader',
    //       options: {
    //         remarkPlugins,
    //         rehypePlugins,
    //       },
    //     },
    //   ],
    // })

    // config.module.rules.push({
    //   test: /\.mdx$/,
    //   use: [
    //     options.defaultLoaders.babel,
    //     createLoader(function (source) {
    //       if (source.includes('/*START_META*/')) {
    //         const [meta] = source.match(/\/\*START_META\*\/(.*?)\/\*END_META\*\//s)
    //         return 'export default ' + meta
    //       }
    //       return (
    //         source.replace(/export const/gs, 'const') + `\nMDXContent.layoutProps = layoutProps\n`
    //       )
    //     }),
    //     {
    //       loader: '@mdx-js/loader',
    //       options: {
    //         remarkPlugins,
    //         rehypePlugins,
    //       },
    //     },
    //     createLoader(function (source) {
    //       let { meta: fields } = querystring.parse(this.resourceQuery.substr(1))
    //       let { attributes: meta, body } = frontMatter(source)
    //       if (fields) {
    //         for (let field in meta) {
    //           if (!fields.split(',').includes(field)) {
    //             delete meta[field]
    //           }
    //         }
    //       }

    //       let extra = []
    //       let resourcePath = path.relative(__dirname, this.resourcePath)

    //       if (!/^\s*export\s+(var|let|const)\s+Layout\s+=/m.test(source)) {
    //         for (let glob in fallbackLayouts) {
    //           if (minimatch(resourcePath, glob)) {
    //             extra.push(
    //               `import { ${fallbackLayouts[glob][1]} as _Layout } from '${fallbackLayouts[glob][0]}'`,
    //               'export const Layout = _Layout'
    //             )
    //             break
    //           }
    //         }
    //       }

    //       if (!/^\s*export\s+default\s+/m.test(source.replace(/```(.*?)```/gs, ''))) {
    //         for (let glob in fallbackDefaultExports) {
    //           if (minimatch(resourcePath, glob)) {
    //             extra.push(
    //               `import { ${fallbackDefaultExports[glob][1]} as _Default } from '${fallbackDefaultExports[glob][0]}'`,
    //               'export default _Default'
    //             )
    //             break
    //           }
    //         }
    //       }

    //       return [
    //         ...(typeof fields === 'undefined' ? extra : []),
    //         typeof fields === 'undefined' ? body : '',
    //         typeof fields === 'undefined'
    //           ? `export const meta = ${JSON.stringify(meta)}`
    //           : `export const meta = /*START_META*/${JSON.stringify(meta || {})}/*END_META*/`,
    //       ].join('\n\n')
    //     }),
    //   ],
    // })

    return config
  },
});