import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { getProductVariants } from '@/lib/product.client'
const plans = [
    {
        name: 'Startup',
        ram: '12GB',
        cpus: '6 CPUs',
        disk: '160 GB SSD disk',
    },
    {
        name: 'Business',
        ram: '16GB',
        cpus: '8 CPUs',
        disk: '512 GB SSD disk',
    },
    {
        name: 'Enterprise',
        ram: '32GB',
        cpus: '12 CPUs',
        disk: '1024 GB SSD disk',
    },
]
export default function VariantRadios({ product }) {
    const variants = getProductVariants(product);
    const [selected, setSelected] = useState(plans[0])
    return (
        <>
            {variants.map((variant)=>(
                <VariantRadio key={variant.name} productVariant={variant}></VariantRadio>
            ))}
        </>
    )
}

function VariantRadio({ productVariant }) {
    const [selected, setSelected] = useState(plans[0])
    return (
        <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">{productVariant.name}</h2>
                </div>

                <RadioGroup value={selected} onChange={setSelected} className="mt-2">
                    <RadioGroup.Label className="sr-only">{productVariant.name}</RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {productVariant.options.map((option) => (
                            <RadioGroup.Option
                                key={option}
                                value={option}
                                className={({ active, checked }) =>
                                    `${active
                                        ? 'ring-2 ring-offset-2 ring-indigo-500'
                                        : ''
                                    }
                    ${checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                                    }
                                    border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1`
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

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}