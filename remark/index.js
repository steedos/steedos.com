const withSmartQuotes = require('@silvenon/remark-smartypants')
const withAdmonitions = require('remark-admonitions')
const { withTableOfContents } = require('./withTableOfContents')
const { withSyntaxHighlighting } = require('./withSyntaxHighlighting')
const { withProse } = require('./withProse')
const { withNextLinks } = require('./withNextLinks')
const withCodeSamples = require('./withCodeSamples')

module.exports.remarkPlugins = [
  withSmartQuotes,
  withAdmonitions,
  withCodeSamples,
  withProse,
  withTableOfContents({isWebpack: false}),
  withSyntaxHighlighting,
  withNextLinks,
]
