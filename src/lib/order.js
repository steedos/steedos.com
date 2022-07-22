/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-05-10 13:24:28
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-07-22 09:41:15
 * @Description: 
 */
import { fetchAPI, ROOT_URL } from '@/lib/base.client'
import { goLogin } from '@/lib/auth.client'
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
        if(data.status === 'unpaid'){
            window.location.href = `${ROOT_URL}/api/pay/weixin/${data.payment_id}?redirect_uri=${`${window.location.origin}/store/payment-success?order=${data._id}`}`
        }else{
            router.push(`/store/payment-success?order=${data._id}`);
        }
    } catch (Exception) {
        if(Exception.message === '401'){
            goLogin(router)
        }else{
            router.push(`/store/payment-fail`)
        }
    }
}