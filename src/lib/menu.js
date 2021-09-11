import { fetchGraphql } from '@/lib/base'


export async function getMenu(menuId) {
    const query = `
      {
        site_menus(filters: ["_id", "=", ${menuId}]) {
          name,
          items: _related_site_menu_items_site_menu(filters: ["parent", "=", null]) {
            _id,
            name,
            type,
            items: children__expand{
              _id,
              name
              type,
              link_post__expand{
                _id,
                name,
                slug
              },
            },
            link_post__expand{
              _id,
              name,
              slug
            },
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

