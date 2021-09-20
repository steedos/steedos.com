import { fetchGraphql } from '@/lib/base'


/**
 * 获取Post
 * TODO 支持根据blogSlug + postSlug 查询
 * @param {*} blogSlug
 * @param {*} postSlug : post._id || post.slug(暂不支持)
 * @returns 
 */
export async function getDocument(docSlug){
    if (!docSlug)
        return null
    const query = `
        {
            documents(filters: [["slug","=","${docSlug}"]]){
              name
              body
              status
              pinned
              collection__expand {
                _id
                name
                description
              }
              child_documents: _related_documents_parent {
                _id
                name
              }
              _related_files {
                _id
                name
                size
              }
            } 
        }
    `
    const result = await fetchGraphql(query);

    let document = null;

    if(result.data && result.data.documents && result.data.documents.length > 0){
        document = result.data.documents[0];
    }

    return document;
}