import { fetchAPI, ROOT_URL } from '@/lib/base.client';
import { getSession, signOut } from 'next-auth/react';

function getRedirectUrl(href = window.location.href){
	const redirect = href.replace("/steedos/sign-in", "").replace("/accounts/a/#/logout", "");
	const u = new URL(redirect);
	u.searchParams.delete('no_redirect');
	u.searchParams.delete('X-Space-Id');
	u.searchParams.delete('X-Auth-Token');
	u.searchParams.delete('X-User-Id');
	return u.toString();
}

export async function authValidate(){
    const data = await fetchAPI(`/api/v4/users/validate`, {method: 'POST', body: JSON.stringify({})})
    return data;
}

export function goLogin(router){
    window.location.href = `/login?callbackUrl=${getRedirectUrl()}`;
    // router.replace(`/login?callbackUrl=${getRedirectUrl()}`, null, {shallow: true})
    // window.location.href = `${ROOT_URL}/accounts/a/#/login?redirect_uri=${getRedirectUrl()}`
}

export function goSignup(router){
    window.location.href = `${ROOT_URL}/accounts/a/#/signup?redirect_uri=${getRedirectUrl()}`
}

export function goLogout(router){
    signOut({callbackUrl: getRedirectUrl()})
    //window.location.href = `${ROOT_URL}/accounts/a/#/logout?redirect_uri=${getRedirectUrl()}`
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

export async function getAuthorization(){
    try {
        const session = await getSession()
        if(!session || !session.steedos){
            return ;
        }
        let spaceId = session.steedos.space;
        let token = session.steedos.token;

        // if (window.location.search && !spaceId && !token) {
        //     var searchParams = new URLSearchParams(window.location.search);
        //     spaceId = searchParams.get('X-Space-Id');
        //     token = searchParams.get('X-Auth-Token');
        // }
        if (!spaceId || !token) {
            return null;
        }
        return `Bearer ${spaceId},${token}`;
    } catch (error) {
        console.error(error)
    }
}