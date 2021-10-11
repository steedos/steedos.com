import { fetchGraphql } from '@/lib/base'

const QUERY_SITE_MENUS = `
{
    name,
    items: _related_site_menu_items_site_menu{
      _id,
      name,
      children,
      link_collection,
      link_post,
      link_product,
      parent,
      site_menu,
      type,
      url
    }
}
`

const QUERY_SITE_INFO = `
{
    name,
    menu_primary,
    menu_footer,
    logo,
    icon,
    menus:_related_site_menus_site${QUERY_SITE_MENUS}
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