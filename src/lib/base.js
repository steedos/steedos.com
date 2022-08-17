export const ROOT_URL = process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL
export const API_KEY = process.env.STEEDOS_SERVER_API_KEY

const GRAPHQL_API = '/graphql'

export function getAuthHeaders() {
    if (!API_KEY) {
        throw new Error('Please configure the environment variable STEEDOS_SERVER_API_KEY');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer apikey,${API_KEY}`
    }
    return headers;
}

export async function fetchGraphql(query) {
    const headers = getAuthHeaders()

    const res = await fetch(`${ROOT_URL}${GRAPHQL_API}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ query: query })
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json
}