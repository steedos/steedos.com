import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { getProductVariants } from '@/lib/product.client'
import { isFunction, map, each, find } from 'lodash'

export default function VariantRadios({ product, onChange, productVariant }) {
    const variants = getProductVariants(product);
    
    let initValues = {};
    each(variants, (item)=>{
        if(productVariant){
            initValues[item.key] = productVariant[item.key]
        }else{
            initValues[item.key] = item.options[0]
        }
    })
    const [values, setValues] = useState(initValues);
    return (
        <>
            {variants.map((variant)=>(
                <VariantRadio defValue={initValues[variant.key]} key={variant.key} productVariant={variant} onChange={(value)=>{
                    const newValues = Object.assign({}, values, {[variant.key]: value})
                    setValues(newValues)
                    if(onChange && isFunction(onChange)){
                        onChange(newValues)
                    }
                }}></VariantRadio>
            ))}
        </>
    )
}

function VariantRadio({ productVariant, onChange, defValue }) {
    const [selected, setSelected] = useState(defValue || productVariant.options[0])
    return (
        <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">{productVariant.name}</h2>
                </div>

                <RadioGroup value={selected} onChange={(value)=>{
                    setSelected(value);
                    if(onChange && isFunction(onChange)){
                        onChange(value)
                    }
                }} className="mt-2">
                    <RadioGroup.Label className="sr-only">{productVariant.name}</RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                        {productVariant.options.map((option) => (
                            <RadioGroup.Option
                                key={option}
                                value={option}
                                className={({ active, checked }) =>
                                    `${active
                                        ? 'ring-2 ring-offset-2 ring-sky-500'
                                        : ''
                                    }
                    ${checked ? 'bg-white text-sky-600 hover:bg-gray-50' : 'bg-white text-gray-900 hover:bg-gray-50'
                                    }
                                    border-gray-200 border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1`
                                }
                            >
                                <RadioGroup.Label as="p">{option}</RadioGroup.Label>
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>

        </div>
    )
}