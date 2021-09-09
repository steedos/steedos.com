import { serialize } from 'next-mdx-remote/serialize'

const withSmartQuotes = require('@silvenon/remark-smartypants')
const { mdxTableOfContents } = require('./mdxTableOfContents')
const { withSyntaxHighlighting } = require('../../remark/withSyntaxHighlighting')
const { withProse } = require('../../remark/withProse')
const { withNextLinks } = require('../../remark/withNextLinks')
const withCodeSamples = require('../../remark/withCodeSamples')

module.exports.mdxSerialize = async function(mdx) {
  const mdxSource = await serialize(mdx, {
    mdxOptions: {
      remarkPlugins: [
        withCodeSamples,
        withProse,
        mdxTableOfContents,
        withSyntaxHighlighting,
        withNextLinks,
      ]
    }
  })
  return mdxSource;
}