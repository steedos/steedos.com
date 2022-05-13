var syntax = require('micromark-extension-directive')
var fromMarkdown = require('mdast-util-directive/from-markdown')
var toMarkdown = require('mdast-util-directive/to-markdown')
var visit = require('unist-util-visit')

var warningIssued

module.exports.withRemarkDirective = function()  {
  var data = this.data()
  console.log(data)

  /* istanbul ignore next - old remark. */
  if (
    !warningIssued &&
    ((this.Parser &&
      this.Parser.prototype &&
      this.Parser.prototype.blockTokenizers) ||
      (this.Compiler &&
        this.Compiler.prototype &&
        this.Compiler.prototype.visitors))
  ) {
    warningIssued = true
    console.warn(
      '[remark-directive] Warning: please upgrade to remark 13 to use this plugin'
    )
  }

  add('micromarkExtensions', syntax())
  add('fromMarkdownExtensions', fromMarkdown)
  add('toMarkdownExtensions', toMarkdown)

  function add(field, value) {
    /* istanbul ignore if - other extensions. */
    if (data[field]) data[field].push(value)
    else data[field] = [value]
  }

  return (tree) => {
    visit(tree, (node) => {
      console.log(node)
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const data = node.data || (node.data = {})
        const hast = h(node.name, node.attributes)
    
        data.hName = hast.tagName
        data.hProperties = hast.properties
      }
    })
  }
}