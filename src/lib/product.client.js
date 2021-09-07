import { getFileSrc } from '@/lib/base.client';
import { groupBy, keys } from 'lodash';

export function getDefaultPrice(product){
    if(product && product.product_variants && product.product_variants.length > 0){
        return product.product_variants[0].price
    }
}

export function getMedia(product){
    const media = [];
    if(product && product.media){
        product.media.forEach(function(item){
            media.push({name: item.name, extention: item.extention, src: getFileSrc(item.versions[0])})
        })
    }
    console.log(`media`, product, media)
    return media;
}

export function getProductVariants(product){
    const variants = [];
    const {option1, option2, option3, product_variants } = product;
    if(option1){
        variants.push({name: option1, options: keys(groupBy(product_variants, 'option1'))})
    }
    if(option2){
        variants.push({name: option2, options: keys(groupBy(product_variants, 'option2'))})
    }
    if(option3){
        variants.push({name: option3, options: keys(groupBy(product_variants, 'option3'))})
    }
    console.log(`variants`, variants)
    return variants;
}