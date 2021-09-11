import { fetchGraphql } from '@/lib/base'

/**
 * 
 * @param {*} slug 
 * @returns 
 */
export async function getSubsite(slug){
    const query = `
    {
        site_subsites(filters:["slug","=","${slug}"]){
            _id,
            slug,
            name,
            menu_primary,
            home_post {
              name,
              slug,
              tags,
              image,
              body
            }
        } 
    }
    `
    const result = await fetchGraphql(query);

    let subsite = null;

    if(result.data && result.data.site_subsites && result.data.site_subsites.length > 0){
      subsite = result.data.site_subsites[0];
    }

    return subsite;
}