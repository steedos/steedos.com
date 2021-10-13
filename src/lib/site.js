import { fetchGraphql } from '@/lib/base'

export async function getSiteByDomain(domain){
    const query = `
        {
            site_domains(filters:["domain","=", "${domain}"]){
                site,
                site__expand {
                    name,
                    logo,
                    icon,
                    homepage: post_homepage__expand {
                        name,
                        summary,
                        image,
                        body
                    }
                }
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


export async function getSite(){
    const query = `
        {
            sites {
                name,
                logo,
                icon,
                homepage: post_homepage__expand {
                    name,
                    summary,
                    image,
                    body
                }
            }
        }
    `
    const result = await fetchGraphql(query);

    let site = null;

    if(result.data && result.data.sites && result.data.sites.length > 0){
        site = result.data.sites[0];
    }
    return site;
}

export async function getSiteDomains(){
    const query = `
        {
            site_domains{
                name: domain
                site__expand {
                    name,
                    logo,
                    icon,
                }
            }
        }
    `
    const result = await fetchGraphql(query);

    let site_domains = null;

    if(result.data && result.data.site_domains){
        site_domains = result.data.site_domains
    }
    return site_domains;
}