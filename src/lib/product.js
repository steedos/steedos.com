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
            product_type,
            product_type__expand{
                name,
                code
            }
            status,
            tags,
            vender,
            vender__expand{
                name,
                logo
            }
            media:_related_files{
                name,
              	_id,
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
            }
        }
    }
    `
    const result = await fetchGraphql(query);

    let products = null;

    if(result.data && result.data.shop_products && result.data.shop_products){
        products = result.data.shop_products;
    }
    return products;
}