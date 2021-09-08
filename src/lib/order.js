import { fetchAPI, ROOT_URL } from '@/lib/base.client'

/**
 * 
 * @param {
 *  variants: [{
 *      _id,
 *      quantity
 *  }]
 * } orderInfo 
 */
export async function submitOrder(orderInfo, router){
    try {
        const data =  await fetchAPI('/api/shop/order/submitOrder', {method: 'POST', body: JSON.stringify(orderInfo)})
        console.log(`data`, data)
        if(data.status === 'unpaid'){
            window.location.href = `${ROOT_URL}/api/pay/weixin/${data.payment_id}?redirect_uri=${`${window.location.origin}/product/payment-success`}`
        }else{
            router.push(`/product/payment-success`)
            
        }
    } catch (Exception) {
        router.push(`/product/payment-fail`)
    }
}