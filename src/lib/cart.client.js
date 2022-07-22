import { fetchAPI } from '@/lib/base.client';
import { goLogin } from '@/lib/auth.client'
export async function changeCart(variantId, quantity, router){
    try {
        const data = await fetchAPI(`/api/api/shop/cart`, {method: 'POST', body: JSON.stringify({variantId, quantity})})
        return data;
    } catch (Exception) {
        if(Exception.message === '401'){
            goLogin(router)
        }
    }
}

export async function getCart(){
    const data = await fetchAPI(`/api/api/shop/cart`, {method: 'get'})
    return data;
}