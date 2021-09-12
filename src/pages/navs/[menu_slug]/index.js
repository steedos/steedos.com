

export async function getServerSideProps({
  params,
}) {
  return {
    props: {
      meta: {
        title: 'Hello World',
        description: 'What it is?'
      },
    }
  }
}

export default function NavHome({ post, nav, mdxSource, tableOfContents }) {
  return (
    <div>Hello World</div>
  )
}
