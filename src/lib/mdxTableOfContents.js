const { addImport, addExport } = require('../../remark/utils')
const slugify = (title) => {return title}//require('@sindresorhus/slugify')

module.exports.mdxTableOfContents = () => {
  return (tree) => {
    const contents = []

    for (let i = 0; i < tree.children.length; i++) {
      let node = tree.children[i]

      if (node.type === 'heading' && [2, 3].includes(node.depth)) {
        const level = node.depth
        const title = node.children
          .filter((n) => n.type === 'text')
          .map((n) => n.value)
          .join('')
        let slug = slugify(title)

        let allOtherSlugs = contents.flatMap((entry) => [
          entry.slug,
          ...entry.children.map(({ slug }) => slug),
        ])
        let i = 1
        while (allOtherSlugs.indexOf(slug) > -1) {
          slug = `${slugify(title)}-${i}`
          i++
        }

        node.type = 'jsx'
        if (node.children[0].type === 'jsx' && /^\s*<Heading[\s>]/.test(node.children[0].value)) {
          node.value =
            node.children[0].value.replace(
              /^\s*<Heading([\s>])/,
              `<Heading level={${level}} id="${slug}" toc={true}$1`
            ) +
            node.children
              .slice(1)
              .map((n) => n.value)
              .join('')
        } else {
          node.value = `<Heading level={${level}} id="${slug}" toc={true}>${node.children
            .map(({ value }) => value)
            .join('')}</Heading>`
        }

        if (level === 2) {
          contents.push({ title, slug, children: [] })
        } else if (contents[contents.length - 1]){
          contents[contents.length - 1].children.push({ title, slug })
        }
      } else if (
        node.type === 'jsx' &&
        /^\s*<Heading[\s>]/.test(node.value) &&
        !/^\s*<Heading[^>]*\sid=/.test(node.value)
      ) {
        const title = node.value
          .replace(/<[^>]+>/g, '')
          .replace(/\{(["'])((?:(?=(\\?))\3.)*?)\1\}/g, '$2')
        node.value = node.value.replace(/^\s*<Heading([\s>])/, `<Heading id="${slugify(title)}"$1`)
      }
    }

    addExport(tree, 'tableOfContents', contents)
  }
}
