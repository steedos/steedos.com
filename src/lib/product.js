import { fetchGraphql } from '@/lib/base'

const QUERY_PRODUCT_INFO = `
{
    _id,
    name,
    sku,
    slug,
    rating,
    description,
    html,
    image,
    keywords,
    product_collection,
    product_collection__expand{
        _id,
        name
    },
    product_type,
    product_type__expand{
        _id,
        name
    },
    status,
    tags,
    vender,
    vender__expand{
        _id,
        name,
        logo
    }
    media:_related_files{
        _id,
        name,
        extention,
        versions
    },
    option1,
    option2,
    option3
    product_variants: _related_shop_product_variants_product{
        _id,
        sku,
        barcode,
        image,
        inventory_quantity,
        name,
        option1,
        option2,
        option3
        price,
        product,
        product__expand{
            _id,
            name,
            slug,
            option1,
            option2,
            option3,
        }
    },
    reviews:_related_shop_reviews_product{
        _id,
        name,
        rating,
        status,
        created,
        owner,
        owner__expand{
            name
        }
    }
}
`

export async function getProducts(){
    const query = `
    {
        shop_products(filters: ["status","=", "published"])${QUERY_PRODUCT_INFO}
    }
    `
    const result = await fetchGraphql(query);

    let products = null;

    if(result.data && result.data.shop_products){
        products = result.data.shop_products;
    }
    return products;
}

/**
 * 获取指定系列下的所有产品
 * @param {*} slug 
 */
export async function getCollectionProducts(slug){
    const query = `
    {
        shop_collections(filters:["slug","=", "${slug}"]){
            name,
            slug,
            image,
            body,
            products:_related_shop_products_product_collection(filters: ["status","=", "published"])${QUERY_PRODUCT_INFO}
        }   
    }
    `
    const result = await fetchGraphql(query);

    let collection = null;

    if(result.data && result.data.shop_collections && result.data.shop_collections.length > 0){
        collection = result.data.shop_collections[0];
    }
    return collection;
}


export async function getProductsVariant(ids){
    const query = `
        {
            product_variants: shop_product_variants(filters:["_id","in", ["${ids.join('","')}"]]){
                _id,
                sku,
                barcode,
                image,
                inventory_quantity,
                name,
                option1,
                option2,
                option3
                price,
                product,
                product__expand{
                    _id,
                    name,
                    sku,
                    slug,
                    rating,
                    description,
                    html,
                    image,
                    keywords,
                    product_collection,
                    product_collection__expand{
                        _id,
                        name
                    },
                    product_type,
                    product_type__expand{
                        _id,
                        name
                    },
                    status,
                    tags,
                    vender,
                    vender__expand{
                        _id,
                        name,
                        logo
                    },
                    option1,
                    option2,
                    option3,
                }
            }
        }
    `
    const result = await fetchGraphql(query);

    let productsVariant = null;

    if(result.data && result.data.product_variants){
        productsVariant = result.data.product_variants;
    }
    return productsVariant;
}


export async function getProduct(slug){
    const query = `
    {
        shop_products(filters:["slug","=", "${slug}"])${QUERY_PRODUCT_INFO}
    }
    `
    const result = await fetchGraphql(query);

    let product = null;

    if(result.data && result.data.shop_products && result.data.shop_products.length > 0){
        product = result.data.shop_products[0];
    }
    return product;
}