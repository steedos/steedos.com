import { useRouter } from 'next/router'
import Detail from '@/components/product/Detail'
import { getProducts } from '@/lib/product';

export async function getServerSideProps(context) {
  const products = await getProducts()

  if (!products) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      products: products
    }
  }
}

const ProductDetail = ({products}) => {
  const router = useRouter()
  const { name } = router.query
  if(!products){return <></>}
  const product = products.find((_product) =>{
    return _product._id === name.join('/')
  })
  if(!product){
    return {notFind: true}
  }
  return <Detail product={product} posts={products}></Detail>
}

export default ProductDetail