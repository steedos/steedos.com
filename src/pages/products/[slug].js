import { useRouter } from 'next/router'
import {NextSeo} from 'next-seo'
import Detail from '@/components/product/Detail'
import { getProduct, getProducts } from '@/lib/product';

export async function getStaticProps({params, query}) {
  const { slug } = params
  const product = await getProduct(slug)

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product: product
    }
  }
}


export async function getStaticPaths() {
  const products = await getProducts()

  // Get the paths we want to pre-render based on posts
  const paths = products.map((product) => ({
    params: { 
      slug: product.slug },
  }))
  console.log('Building Products...');
  console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default function ProductDetail({product}){
  const router = useRouter()
  if(!product){
    return {notFind: true}
  }

  const url = process.env.NEXT_PUBLIC_DEPLOYMENT_URL + router.asPath
  const imageUrl = product.image?process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL + `/api/files/images/${product.image}` : null

  return (
    <>
        <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          title: product.name,
          description: product.description,
          url,
          images: [
            {
              url: imageUrl,
              alt: product.name,
            },
          ],
        }}
        // twitter={{
        //   cardType: seo.cardType || 'summary_large_image',
        //   site: seo.site || 'eggheadio',
        //   handle: seo.handle,
        // }}
        // canonical={canonicalUrl}
      />
      <Detail product={product}></Detail>
    </>
  )
}