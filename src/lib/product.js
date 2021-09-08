import { fetchGraphql } from '@/lib/base'

export async function getProducts(){
    const query = `
    {
        shop_products{
            _id,
            name,
            sku,
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
                name,
                code
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
            version,
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
                product
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
    }
    `
    const result = await fetchGraphql(query);

    let products = null;

    if(result.data && result.data.shop_products){
        products = result.data.shop_products;
    }
    return products;
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
                        name,
                        code
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
    console.log(`query`, query)
    const result = await fetchGraphql(query);

    let productsVariant = null;

    if(result.data && result.data.product_variants){
        productsVariant = result.data.product_variants;
    }
    return productsVariant;
}