/*
 * @Author: yinlianghui@steedos.com
 * @Date: 2022-05-25 17:29:51
 * @LastEditors: yinlianghui@steedos.com
 * @LastEditTime: 2022-07-11 14:28:36
 * @Description: 
 */
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

async function getBlogs(siteId){
  //TODO：按站点获取数据 , filters:["site","=","${siteId}"]
  const query = `
  {
      site_blogs {
          _id,
          slug,
          name,
    			posts: _related_site_posts_blog{
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

  let site_blogs = null;

  if(result.data && result.data.site_blogs){
    site_blogs = result.data.site_blogs;
  }

  return site_blogs;
}

async function sync(){
  const site_blogs = await getBlogs();
  console.log(site_blogs)
  site_blogs.forEach(blog => {
    const dirname = path.join(process.cwd(), 'contents', 'blogs', blog.slug)
    const exists = fs.existsSync(dirname);
    if (!exists){
      fs.mkdirSync(dirname)
    }
    blog.posts.forEach(doc => {
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