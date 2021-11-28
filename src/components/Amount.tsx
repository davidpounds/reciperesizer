import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    NUMERIC_REGEXP,
    TIN_TYPE,
    UNIT,
    getAmountUnitOptions,
    amountToNumber,
} from "../utils";
import {
    getRecipeAmount,
    getResizedAmount,
    getRecipeUnit,
    getResizedUnit,
    getResizedCompatibleUnits,
} from '../redux/selectors';
import {
    setAmount,
    setUnit,
} from '../redux/actions';

interface Props {
    tinType: TIN_TYPE,
}

const Amount: React.FC<Props> = (props) => {
    const { tinType } = props;
    const isResized = tinType === TIN_TYPE.RESIZED;
    const isRecipe = tinType === TIN_TYPE.RECIPE;
    const dispatch = useDispatch();
    const [getAmount, getUnit] = isRecipe ? [getRecipeAmount, getRecipeUnit] : [getResizedAmount, getResizedUnit];
    const amount = useSelector(getAmount);
    const amountUnit = useSelector(getUnit);
    const resizedAmountUnitOptions = useSelector(getResizedCompatibleUnits);
    const [fieldAmount, setFieldAmount] = useState(amount.toString());
    const amountInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isResized) return;
        setFieldAmount(amount.toString());
    }, [isResized, amount]);

    const recalculate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>  {
        const value = amountInput?.current?.value ?? '';
        setFieldAmount(value);
        const newAmount = amountToNumber(value);
        dispatch(setAmount(tinType, newAmount));
    };

    const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFieldAmount(e.target.value);
    };

    const amountUnitChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatch(setUnit(tinType, e.target.value as UNIT));
    };

    const amountUnitOptions = getAmountUnitOptions();

    return (
        <div className="form-group">
            <label htmlFor={`${tinType}_amount`}>
                {isRecipe && <>Enter the recipe amount</>}
                {isResized && <>Resized amount</>}
            </label>
            <input 
                id={`${tinType}_amount`} 
                type="text" 
                className="numeric" 
                pattern={NUMERIC_REGEXP} 
                value={fieldAmount}
                size={6}
                maxLength={6}
                ref={amountInput}
                onChange={amountChangeHandler}
                readOnly={isResized}
            />

            <label htmlFor={`${tinType}_amount_unit`} className="off-screen">
                Unit for {tinType} amount
            </label>
            <select 
                id={`${tinType}_amount_unit`} 
                value={amountUnit}
                onChange={amountUnitChangeHandler}
            >
                {isRecipe && amountUnitOptions.map(optGroup => (
                    <optgroup label={optGroup.label} key={optGroup.label}>
                        {optGroup.children.map(opt => (
                            <option value={opt.value} key={opt.value}>{opt.label}</option>
                        ))}
                    </optgroup>
                ))}
                {isResized && resizedAmountUnitOptions.map(opt => (
                    <option value={opt.value} key={opt.value}>{opt.label}</option>
                ))}
            </select>
            {isRecipe && (
                <button onClick={recalculate}>Calculate</button>
            )}
        </div>
    );
};

export default Amount;
