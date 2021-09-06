const ROOT_URL = process.env.NEXT_PUBLIC_STEEDOS_SERVER_ROOT_URL
const API_KEY = process.env.STEEDOS_SERVER_API_KEY

const GRAPHQL_API='/graphql'

async function fetchGraphql(query) {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    if (API_KEY) {
        headers[
            'Authorization'
        ] = `Bearer apikey,${API_KEY}`
    }else{
        throw new Error('Please configure the environment variable STEEDOS_SERVER_API_KEY');
    }

    const res = await fetch(`${ROOT_URL}${GRAPHQL_API}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({query: query})
      })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json
}

/**
 * 获取Post
 * TODO 支持根据blogSlug + postSlug 查询
 * @param {*} blogSlug
 * @param {*} postSlug : post._id || post.slug(暂不支持)
 * @returns 
 */
export async function getPost(blogSlug, postSlug){
    const query = `
        {
            site_posts(filters: [["_id","=","${postSlug}"], "or", [["blog","=","${blogSlug}"], ["slug","=","${postSlug}"]]]){
                _id,
                name,
                image,
                slug,
                tags,
                status,
                published,
                published_at,
                featured,
                body_html,
                blog,
                blog__expand{
                    _id,
                    authors,
                    commentable,
                    name,
                    owner,
                    sidebar,
                    site,
                    slug,
                    url
                }
                site
            } 
        }
    `
    const result = await fetchGraphql(query);

    let post = null;

    if(result.data && result.data.site_posts && result.data.site_posts.length > 0){
        post = result.data.site_posts[0];
    }

    return post;
}


// export async function getBlog(blogSlug){
//     const query = `
//         {
//             site_blogs(filters: [["_id","=","${blogSlug}"], "or", ["slug","=","${blogSlug}"]]){
//                 authors,
//                 commentable,
//                 name,
//                 owner,
//                 sidebar,
//                 site,
//                 slug,
//                 url
//             }
//         }
//     `
//     const result = await fetchGraphql(query);

//     let blog = null;

//     if(result.data && result.data.site_blogs && result.data.site_blogs.length > 0){
//         blog = result.data.site_blogs[0];
//     }

//     return blog;
// }

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

export function getPostUrl(blogSlug, post){
    return `/blog/${blogSlug}/post/${post._id}`
}

/**
 * 获取Blog左侧导航数据
 * TODO 支持各种类型的menu item type
 * TODO 支持文章slug
 * @param {*} blogSlug 
 * @param {*} menuId 
 * @returns 
 */
export async function getBlogSidebarLayoutNav(blogSlug, menuId){
    const menu = await getMenu(menuId);
    const key = menu.name
    const value = [];
    menu.items.forEach((item) => {
        value.push({
            title: item.name,
            href: getPostUrl(blogSlug,item.link_post__expand ), //item.link_post__expand.slug
        })
    });
    const nav = {[key]: value};
    console.log(`nav`, nav)
    return nav;
}


/**
 * 
 * @param {*} blogSlug 
 * @returns 
 */
export async function getBlog(blogSlug){
    const query = `
    {
        site_blogs(filters:["slug","=","${blogSlug}"]){
            _id,
            slug,
            name,
            sidebar,
            posts: _related_site_posts_blog(top:20){
                _id,
                name,
                slug,
                tags,
                image,
                status,
                published,
                published_at,
                featured,
                body_html,
                blog,
                blog__expand{
                    _id,
                    authors,
                    commentable,
                    name,
                    owner,
                    sidebar,
                    site,
                    slug,
                    url
                }
                site
            }
        } 
    }
    `
    const result = await fetchGraphql(query);

    let blog = null;

    if(result.data && result.data.site_blogs && result.data.site_blogs.length > 0){
        blog = result.data.site_blogs[0];
    }

    return blog;
}