import { fetchGraphql } from '@/lib/base'


export async function getMenu(menuId) {
    const query = `
        {
            site_menus(filters: ["_id","=","${menuId}"]){
                name,
                items:_related_site_menu_items_site_menu{
                    children,
                    link_collection,
                    link_post,
                    link_post__expand{
                        _id,
                        name,
                        slug
                    },
                    link_product,
                    name,
                    owner,
                    parent,
                    site_menu,
                    type,
                    url
                }
            }
        }
    `
    const result = await fetchGraphql(query);

    let menu = null;

    if (result.data && result.data.site_menus && result.data.site_menus.length > 0) {
        menu = result.data.site_menus[0];
    }
    return menu;
}


export async function getMenuItems(menuId){
    const query = `
        {
            site_menu_items(filters: ["site_menu","=","${menuId}"]){
                children,
                link_collection,
                link_post,
                link_product,
                name,
                owner,
                parent,
                site_menu,
                site_menu__expand{
                    name,
                    link_post,
                    link_post__expand{
                        name,
                        slug
                    }
                },
                type,
                url
            }
        }
    `
    const result = await fetchGraphql(query);

    let menuItems = null;

    if(result.data && result.data.site_menu_items){
        menuItems = result.data.site_menu_items;
    }
    return menuItems;
}
