import { fetchGraphql } from '@/lib/base'


/**
 * 获取Post
 * TODO 支持根据blogSlug + postSlug 查询
 * @param {*} blogSlug
 * @param {*} postSlug : post._id || post.slug(暂不支持)
 * @returns 
 */
export async function getDocument(collectionSlug, documentSlug){
    if (!collectionSlug || !documentSlug)
      return null;
    const collection = await getCollection(collectionSlug)
    if (!collection)
      return null; 
    const query = `
        {
            documents(sort: "sort_no", filters: [["collection", "=", "${collection._id}"], ["slug","=","${documentSlug}"]]){
              name
              slug
              body
              status
              pinned
              image
              summary
              collection__expand {
                _id
                name
                description
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


export async function getDocuments(){
  const query = `
    {
      documents{
        _id
        name
        slug
        collection__expand {
          _id
          name
          slug
        }
      } 
    }
  `
  const result = await fetchGraphql(query);

  let documents = null;

  if(result.data && result.data.documents && result.data.documents.length > 0){
      documents = result.data.documents;
  }

  return documents;
}

/**
 * 
 * @param {*} blogSlug 
 * @returns 
 */
export async function getCollection(slug){
  const query = `
  {
      document_collections(sort: "sort_no", filters:["slug","=","${slug}"]){
          _id,
          slug,
          name,
          description,
    			documents: _related_documents_collection(sort: "sort_no"){
            _id,
            slug,
            name,
            image,
            summary
          }
      } 
  }
  `
  const result = await fetchGraphql(query);

  let collection = null;

  if(result.data && result.data.document_collections && result.data.document_collections.length > 0){
    collection = result.data.document_collections[0];
  }

  return collection;
}

export async function getCollections(siteId){
  //TODO：按站点获取数据 , filters:["site","=","${siteId}"]
  const query = `
  {
      document_collections(sort: "sort_no"){
          _id,
          slug,
          name,
          description,
    			documents: _related_documents_collection(sort: "sort_no", filters:["status","=","published"]){
            _id,
            slug,
            name,
            image,
            summary
          }
      } 
  }
  `
  const result = await fetchGraphql(query);

  let collections = null;

  if(result.data && result.data.document_collections){
    collections = result.data.document_collections;
  }
  return collections;
}