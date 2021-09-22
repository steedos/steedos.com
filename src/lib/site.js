import { fetchGraphql } from '@/lib/base'

const QUERY_SITE_INFO = `
{
    name,
    menu_primary,
    menu_footer,
    logo,
    icon,
    announcement_url,
    announcement_title,
    announcement_closable,
    annoucement_enabled
}
`

export async function getSite(domain){
    const query = `
        {
            site_domains(filters:["domain","=", "${domain}"]){
                site__expand${QUERY_SITE_INFO}
            }
        }
    `
    const result = await fetchGraphql(query);

    let site = null;

    if(result.data && result.data.site_domains && result.data.site_domains.length > 0){
        site = result.data.site_domains[0].site__expand;
    }
    return site;
}