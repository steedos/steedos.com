const path = require('path');
const fs = require('fs');

import BuilderJS from '@builder6/builder6.js' 

export const endpointUrl = process.env.B6_CLOUD_API
export const apiKey = process.env.B6_CLOUD_PROJECT_SECRET
export const adminBjs = new BuilderJS({endpointUrl, apiKey});

export const getProjectById = async (baseId: string, project_id:string) => {

  const base = await adminBjs.base(baseId);


  try {

    const project = (await base('b6_projects').find(project_id)).fields;
    console.log('Retrieved project', project._id, project.name);
    return project

  } catch (e) {
    console.log(e)
    return null
  }
}
  
export const getProjectBySlug = async (baseId: string, projectSlug:string) => {

  const base = await adminBjs.base(baseId);


  const projects = await base('b6_projects').select({
    'filterByFormula': `slug === "${projectSlug}"`
  }).firstPage();
  

  if (!projects || projects.length === 0) {
    return null;
  }

  const project = projects[0].fields;
  console.log('Retrieved project', project._id, project.name);

  return project
}
  
export const getProjectPageByUrl = async (baseId: string, projectId:string, pageUrl: string) => {

  const base = await adminBjs.base(baseId);

  const pages = await base("b6_pages").select({
    'filterByFormula': `AND(url === "${pageUrl}", project_id === "${projectId}")`
  }).firstPage();

  if (!pages || pages.length === 0) {
    return null;
  }
  
  const page = pages[0].fields
  console.log('Retrieved page', page._id, page.name);
  return page
}
  

  
export const getPageBlocks = async (baseId: string, pageId:string) => {

  const base = await adminBjs.base(baseId);

  const blocks = await base("b6_blocks").select({
    'filterByFormula': `page_id === "${pageId}"`
  }).firstPage();

  if (!blocks || blocks.length === 0) {
    return null;
  }
  
  console.log('Retrieved blocks', pageId, blocks.length);
  return blocks.map(block => block.fields) as any;
}
  
export const getDocumentById = async (baseId: string, documentId: string) => {

  if (!documentId) return null;

  const base = await adminBjs.base(baseId);

  try {
    const document = await base("b6_documents").find(documentId);  
  
    console.log('Retrieved page', document.fields._id, document.fields.name);
    return document.fields

  } catch (e) {
    console.error(e);
    return null;
  }
}
  
export const getDocumentByUrl = async (baseId: string, blogId: string, documentUrl: string) => {

  const base = await adminBjs.base(baseId);

  try {
    const documents = await base("b6_documents").select({
      'filterByFormula': `AND(url === "${documentUrl}", blog_id === "${blogId}")`
    }).firstPage();

  
    if (!documents || documents.length === 0) {
      return null;
    }
    
    console.log('Retrieved document', documents[0].fields._id, documents[0].fields.name);

    return documents[0].fields

  } catch (e) {
    console.error(e);
    return null;
  }
}

export const getBlogByUrl = async (baseId: string, blogUrl: string) => {

  const base = await adminBjs.base(baseId);


  try {
    const blogs = await base("b6_blogs").select({
      fields: ['_id', 'name', 'url', 'parent'],
      'filterByFormula': `url === "${blogUrl}"`
    }).firstPage();

    if (!blogs || blogs.length === 0) {
      return null;
    }

    const blog = blogs[0].fields;
  
    console.log('Retrieved blog', blog._id, blog.name);

    // const documents = await base("b6_documents").select({
    //   'filterByFormula': `blog_id === "${blog._id}"`
    // }).firstPage(); 

    // console.log('Retrieved blog documents', documents.length);

    // const docs = documents.map(document => document.fields) as any;
    // blog.documents = docs;
    // blog.documentsTree = buildTree(docs);
    console.log(blog)

    return blog

  } catch (e) {
    console.error(e);
    return null;
  }
}

export const getBlogDocuments = async (baseId: string, blogId: string) => {

  const base = await adminBjs.base(baseId);


  try {

    const documents = await base("b6_documents").select({
      'filterByFormula': `blog_id === "${blogId}"`
    }).firstPage(); 

    console.log('Retrieved blog documents', documents.length);

    const docs = documents.map(document => document.fields) as any;
   
    return docs

  } catch (e) {
    console.error(e);
    return null;
  }
}

export const getThemeSection = async (sectionName: string, theme = 'default') => {
  const fileName = path.join(process.cwd(), 'src', 'b6', 'themes', theme, 'sections', `${sectionName}.liquid`);
  const template = fs.readFileSync(fileName, 'utf8');
  return template
}

export const getComponent = async (baseId: string, api_name : string) => {

  const base = await adminBjs.base(baseId);

  const components = await base('b6_components').select({
    'filterByFormula': `api_name === "${api_name}"`
  }).firstPage();
  // console.log("getComponent", api_name, components)

  if (components && components.length === 1) {
    return components[0]?.fields
  }

  const component = {
    _id: "default",
    name: api_name,
    type: "liquid",
    tailwind: "",
    liquid_template: await getThemeSection(api_name, 'default')
  }

  return component
}

export const getComponentById = async (baseId: string, componentId : string) => {

  const base = await adminBjs.base(baseId);

  try {
    const component = (await base('b6_components').find(componentId));
  
    console.log('Retrieved component', component?.fields._id);
    return JSON.parse(component?.fields.builder as string);
  } catch (e) {
    console.error(e);
  }

  return null
}

