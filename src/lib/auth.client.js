import { fetchAPI, ROOT_URL } from '@/lib/base.client';

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
    removeAuthInfo()
    window.location.href = `${ROOT_URL}/accounts/a/#/logout?redirect_uri=${window.location.href}`
}

export function saveAuthInfo(userId, spaceId, authToken){
    localStorage.setItem("steedos:userId", userId);
    localStorage.setItem("steedos:spaceId", spaceId);
    localStorage.setItem("steedos:token", authToken);
}

export function removeAuthInfo(){
    localStorage.removeItem("steedos:userId");
    localStorage.removeItem("steedos:spaceId");
    localStorage.removeItem("steedos:token");
}

export function getAuthorization(){
    const spaceId = localStorage.getItem('steedos:spaceId');
    const token = localStorage.getItem('steedos:token');
    return `Bearer ${spaceId},${token}`;
}