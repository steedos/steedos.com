import { fetchAPI, ROOT_URL } from '@/lib/auth.client';

export async function authValidate(){
    const data = await fetchAPI(`/api/v4/users/validate`, {method: 'POST', body: JSON.stringify({})})
    return data;
}

export function goLogin(){
    window.location.href = `${ROOT_URL}/accounts/a/#/login?redirect_uri=${window.location.href}`
}

export function goSignup(){
    window.location.href = `${ROOT_URL}/accounts/a/#/signup?redirect_uri=${window.location.href}`
}

export function goLogout(){
    window.location.href = `${ROOT_URL}/accounts/a/#/logout?redirect_uri=${window.location.href}`
}