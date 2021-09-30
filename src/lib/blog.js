import { fetchGraphql } from '@/lib/base'
import { getMenu } from './menu';


/**
 * 获取Post
 * TODO 支持根据blogSlug + postSlug 查询
 * @param {*} blogSlug
 * @param {*} postSlug : post._id || post.slug(暂不支持)
 * @returns 
 */
export async function getPost(blogSlug, postSlug){
    if (!blogSlug || !postSlug)
        return null;
    const blog = await getBlog(blogSlug);
    if (!blog)
        return null;
    const query = `
        {
            site_posts(filters: [["slug","=","${postSlug}"], ["blog","=","${blog._id}"]]){
                _id,
                name,
                summary,
                image,
                slug,
                tags,
                status,
                published_at,
                featured,
                body,
                blog__expand {
                    _id,
                    name,
                    slug,
                }
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


export function getPostUrl(blogSlug, post){
    if (!post)
        return `/${blogSlug}/`
    else
        return `/${blogSlug}/${post.slug}`
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
    if (!menuId)
        return null
    const menu = await getMenu(menuId);
    if (!menu)
        return null
    menu.items.forEach((item) => {
        item.title = item.name;
        item.href = getPostUrl(blogSlug,item.link_post__expand );

        item.items && item.items.forEach((subitem) => {
            subitem.title = subitem.name;
            subitem.href = getPostUrl(blogSlug,subitem.link_post__expand );
            
        });
    });
    return menu;
}

/**
 * 
 * @param {*} blogSlug 
 * @returns 
 */
export async function getPosts(){
        
    const query = `
    {
        site_posts {
            _id,
            name,
            slug,
            blog__expand {
                _id
                name
                slug
            }
        } 
    }
    `
    const result = await fetchGraphql(query);

    let posts = null;

    if(result.data && result.data.site_posts){
        posts = result.data.site_posts;
    }

    return posts;
}

/**
 * 
 * @param {*} blogSlug 
 * @returns 
 */
export async function getBlogPosts(blogId){
        
    const query = `
    {
        site_posts(filters:["blog","=","${blogId}"]){
            _id,
            name,
            summary,
            slug,
            tags,
            image,
            status,
            published_at,
            featured,
            owner__expand {
                name,
                avatar
            }
            blog__expand {
                _id
                name
                slug
            }
        } 
    }
    `
    const result = await fetchGraphql(query);

    let posts = null;

    if(result.data && result.data.site_posts){
        posts = result.data.site_posts;
    }

    return posts;
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
            body,
            menu: menu_primary__expand{
              name
              items: _related_site_menu_items_site_menu(filters: ["parent", "=", null]) {
                name
                url
              }
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