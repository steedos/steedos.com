import { Fragment, useState } from 'react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import { isNumber, isFunction } from 'lodash';

export default function QuantityInput({quantity, index, merchandise, onChange}) {
    const [value, setValue] = useState(quantity || 1);
    const [onChangeTimeOutId, setOnChangeTimeOutId] = useState(null);

    const productName = merchandise.merchandise__expand.product__expand.name;

    const changeValue = (newValue, step)=>{
        let _value = value
        if(isNumber(newValue)){
            if(newValue < 1){
                return;
            }
            _value = newValue
        }else if(isNumber(step)){
            if(value + step < 1){
                return;
            }
            _value =  value + step
        }
        setValue(_value)
        if(isFunction(onChange)){
            if(onChangeTimeOutId){
                clearTimeout(onChangeTimeOutId)
            }
            setOnChangeTimeOutId(setTimeout(async ()=>{
                await onChange(_value, merchandise)
                setOnChangeTimeOutId(null);
            }, 500))
        }
    }
    
    const minusClick =  (params) => {
        changeValue(null, -1);
    }

    const plusClick =  (params) => {
        changeValue(null, 1);
    }

    return (
        <div className="quantity">
            <button className="quantity__button no-js-hidden" name="minus" type="button" onClick={minusClick}>
                <span className="sr-only">减少 {productName} 的数量</span>
                <MinusSmIcon className="h-6 w-6" aria-hidden="true"></MinusSmIcon>
            </button>
            <input className="quantity__input" type="number" name="updates[]" value={value} min="0" aria-label={`${productName} 的数量`} id={`Quantity-${index}`} data-index={index} />
            <button className="quantity__button no-js-hidden" name="plus" type="button" onClick={plusClick}>
                <span className="sr-only">增加 {productName} 的数量</span>
                <PlusSmIcon className="h-6 w-6" aria-hidden="true"></PlusSmIcon>
            </button>
        </div>
    )
}
