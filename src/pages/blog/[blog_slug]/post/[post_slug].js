import { DocumentationLayout } from '@/layouts/DocumentationLayout'
import tinytime from 'tinytime'
import Editor from "rich-markdown-editor";
import { getPost, getBlogSidebarLayoutNav } from '@/lib/blog';

export async function getServerSideProps(context) {
  const { blog_slug, post_slug } = context.params;
  const post = await getPost(blog_slug, post_slug);
  const nav = await getBlogSidebarLayoutNav(blog_slug, post.blog__expand.sidebar)
  return {
    props: {
      post: post,
      nav: nav
    }
  }
}

const formatDate = tinytime('{MM} {DD}, {YYYY}').render

export default function Post({ post, nav }) {
  return (
    <div className="px-4 sm:px-6 xl:px-8 pt-10 pb-16">
      <Editor key={post.slug}
        defaultValue={post.body_html}
        readOnly={true}
        readOnlyWriteCheckboxes={true}
        className="steedos-rich-markdown-editor"
      />
    </div>
  )
}

Post.getLayoutProps = (page, pageProps) => {
  return {
    meta: {
      title: pageProps.post.name,
      description: pageProps.post.description,
    },
    nav: pageProps.nav,
    Layout: DocumentationLayout,
  }
}
