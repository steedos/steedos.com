import { fetchAPI } from '@/lib/base.client';
export async function changeCart(variantId, quantity){
    const data = await fetchAPI(`/api/api/shop/cart`, {method: 'POST', body: JSON.stringify({variantId, quantity})})
    return data;
}

export async function getCart(){
    const data = await fetchAPI(`/api/api/shop/cart`, {method: 'get'})
    return data;
}