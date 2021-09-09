import { useRouter } from 'next/router'
import Detail from '@/components/product/Detail'
import { getProduct } from '@/lib/product';

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

const ProductDetail = ({product}) => {
  const router = useRouter()
  if(!product){
    return {notFind: true}
  }
  return <Detail product={product}></Detail>
}

export default ProductDetail