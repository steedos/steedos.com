import { getFileSrc } from '@/lib/base.client';
import { groupBy, keys, each } from 'lodash';

export function formatPrice(price){
    if(!price){
        return `¥0.00`
    }else{
        return `¥${price.toFixed(2)}`
    }
}

export function getPrice(productVariant){
    if(productVariant){
        return productVariant.price
    }
}

export function getDefaultPrice(product){
    if(product && product.product_variants && product.product_variants.length > 0){
        return product.product_variants[0].price
    }
}

export function getMedia(product){
    const media = [];
    if(product && product.media){
        product.media.forEach(function(item){
            media.push({_id: item._id, name: item.name, extention: item.extention, src: getFileSrc(item.versions[0])})
        })
    }
    return media;
}

export function getProductVariants(product){
    const variants = [];
    const { product_variants } = product;
    each(['option1','option2','option3'], (key)=>{
        const optionItem = product[key];
        if(optionItem){
            variants.push({key: key, name: optionItem, options: keys(groupBy(product_variants, key))})
        }
    })
    return variants;
}