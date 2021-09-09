import { goLogin } from '@/lib/auth.client'
export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

export const ROOT_URL = process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL

export async function fetchAPI(api, options = {}) {
    const headers = { 'Content-Type': 'application/json' }
    const AUTHORIZATION = getCookie('X-Space-Token')
    if (AUTHORIZATION) {
        headers[
            'Authorization'
        ] = `Bearer ${AUTHORIZATION}`
    }else{
        const authToken = getCookie('X-Auth-Token');
        const userId = getCookie('X-User-Id');
        headers['X-User-Id'] =  userId;
        headers['X-Auth-Token'] =  authToken;
    }

    options.headers = Object.assign({}, headers, options.headers);

    const res = await fetch(`${ROOT_URL}${api}`, options)
    
    // if(res.status === 401){
    //     return goLogin()
    // }

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json
}

export function getFileSrc(fileId){
    return `${ROOT_URL}/api/files/files/${fileId}`
}

export function getImageSrc(fileId){
    return `${ROOT_URL}/api/files/images/${fileId}`
}