import { fetchGraphql } from '@/lib/base'
import { getMenu } from './menu';


/**
 * 获取Post
 * TODO 支持根据blogSlug + postSlug 查询
 * @param {*} blogSlug
 * @param {*} postSlug : post._id || post.slug(暂不支持)
 * @returns 
 */
export async function getPost(postSlug){
    if (!postSlug)
        return null
    const slugSplit = postSlug.split('-');
    if (slugSplit.length == 0)
        return null;
    const postId = slugSplit[slugSplit.length-1]
    const query = `
        {
            site_posts(filters: [["_id","=","${postId}"]]){
                _id,
                name,
                image,
                slug,
                tags,
                status,
                published_at,
                featured,
                body,
                blog,
                blog__expand{
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
        return `/blogs/${blogSlug}`
    else
        return `/blogs/${blogSlug}/${post.name}-${post._id}`
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
export async function getBlog(blogSlug){
    const query = `
    {
        site_blogs(filters:["slug","=","${blogSlug}"]){
            _id,
            slug,
            name,
            menu_primary,
            posts: _related_site_posts_blog(top:20){
                _id,
                name,
                slug,
                tags,
                image,
                status,
                published_at,
                featured,
            }
        } 
    }
    `
    const result = await fetchGraphql(query);
    console.log(result)

    let blog = null;

    if(result.data && result.data.site_blogs && result.data.site_blogs.length > 0){
        blog = result.data.site_blogs[0];
    }

    return blog;
}