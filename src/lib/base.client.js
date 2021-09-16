import { getAuthorization } from '@/lib/auth.client';

export const ROOT_URL = process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL

export async function fetchAPI(api, options = {credentials: 'include'}) {
    const headers = { 'Content-Type': 'application/json' }
    const AUTHORIZATION = getAuthorization()
    if (AUTHORIZATION) {
        headers[
            'Authorization'
        ] = AUTHORIZATION
    }

    options.headers = Object.assign({}, headers, options.headers);

    const res = await fetch(`${ROOT_URL}${api}`, options)
    
    if(res.status === 401){
        throw new Error(401)
    }

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