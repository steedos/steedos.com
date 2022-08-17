require('dotenv-flow').config(process.cwd());
const { Main } = require('next/document');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');


const ROOT_URL = process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL
const API_KEY = process.env.STEEDOS_SERVER_API_KEY


const GRAPHQL_API = '/graphql'

function getAuthHeaders() {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    if (API_KEY) {
        headers[
            'Authorization'
        ] = `Bearer apikey,${API_KEY}`
    } else {
        throw new Error('Please configure the environment variable STEEDOS_SERVER_API_KEY');
    }
    return headers;
}

async function fetchGraphql(query) {
    const headers = getAuthHeaders()

    const res = await fetch(`${ROOT_URL}${GRAPHQL_API}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ query: query })
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json
}

async function getCollections(siteId){
  //TODO：按站点获取数据 , filters:["site","=","${siteId}"]
  const query = `
  {
      document_collections(sort: "sort_no"){
          _id,
          slug,
          name,
          description,
    			documents: _related_documents_collection(sort: "sort_no"){
            _id,
            slug,
            name,
            image,
            summary,
            body
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

async function sync(){
  const collections = await getCollections();
  console.log(collections)
  collections.forEach(collection => {
    const dirname = path.join(process.cwd(), 'contents', 'docs', collection.slug)
    if (!fs.statSync(dirname, {throwIfNoEntry:false}))
      fs.mkdirSync(dirname)
    collection.documents.forEach(doc => {
      const filename = path.join(dirname, doc.slug + '.mdx')
      const content = 
`---
title: ${doc.name}
description: ${doc.summary}
---

${doc.body}`
      fs.writeFileSync(filename, content)
    })
  });
}

sync()