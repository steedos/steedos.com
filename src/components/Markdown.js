
import RMarkdown from 'react-markdown';
import { ROOT_URL } from '@/lib/base';
const {remarkPlugins} = require('remark');
const imgLinks = require("@pondorasti/remark-img-links")

export function Markdown({body, _remarkPlugins }) {

  const __remarkPlugins = [remarkPlugins, [imgLinks, {absolutePath: ROOT_URL}]]

  if(_remarkPlugins){
    __remarkPlugins.push(_remarkPlugins)
  }

  return (
    <>
        {body && (
        <RMarkdown remarkPlugins={__remarkPlugins} className="prose dark:prose-dark mt-1 sm:text-base text-sm">
          {body}
        </RMarkdown>
      )}
    </>
  )
}
