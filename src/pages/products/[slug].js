import { useRouter } from 'next/router'
import Detail from '@/components/product/Detail'
import { getProduct } from '@/lib/product';
import { DocumentationLayout } from '@/layouts/DocumentationLayout'

export async function getServerSideProps(context) {
  const { slug } = context.query
  const product = await getProduct(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

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
  return <Detail product={product}></Detail>
}

ProductDetail.getLayoutProps = (page, pageProps)=>{
  return {
    meta: {
      title: pageProps.product?.name,
      description: pageProps.product?.description,
    },
    nav: pageProps.nav,
    Layout: DocumentationLayout,
  }
}