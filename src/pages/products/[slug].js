import { useRouter } from 'next/router'
import {NextSeo} from 'next-seo'
import Detail from '@/components/product/Detail'
import { getProduct } from '@/lib/product';

export async function getServerSideProps(context) {
  const { slug } = context.query
  const product = await getProduct(slug)

  if (!product) {
    return {
      notFound: true,
    }
  }

  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate')
  return {
    props: {
      product: product
    }
  }
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