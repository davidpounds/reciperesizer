import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    NUMERIC_REGEXP,
    TIN_TYPE,
    getAmountUnitOptions,
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
    const dispatch = useDispatch();
    const [getAmount, getUnit] = tinType === TIN_TYPE.RECIPE ? [getRecipeAmount, getRecipeUnit] : [getResizedAmount, getResizedUnit];
    const amount = useSelector(getAmount);
    const amountUnit = useSelector(getUnit);
    const resizedAmountUnitOptions = useSelector(getResizedCompatibleUnits);

    const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setAmount(tinType, +e.target.value));
    };
    const amountUnitChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setUnit(tinType, +e.target.value));
    };

    const amountUnitOptions = getAmountUnitOptions();

    return (
        <div className="form-group">
            <label htmlFor={`${tinType}_amount`}>
                {tinType === TIN_TYPE.RECIPE && <>Enter the recipe amount</>}
                {tinType === TIN_TYPE.RESIZED && <>Resized amount</>}
            </label>
            <input 
                id={`${tinType}_amount`} 
                type="text" 
                className="numeric" 
                pattern={NUMERIC_REGEXP} 
                value={amount}
                size={6}
                maxLength={6}
                onChange={amountChangeHandler}
                readOnly={tinType === TIN_TYPE.RESIZED}
            />

            <label htmlFor={`${tinType}_amount_unit`} className="off-screen">
                Unit for {tinType} amount
            </label>
            <select 
                id={`${tinType}_amount_unit`} 
                value={amountUnit}
                onChange={amountUnitChangeHandler}
            >
                {tinType === TIN_TYPE.RECIPE && amountUnitOptions.map(optGroup => (
                    <optgroup label={optGroup.label} key={optGroup.label}>
                        {optGroup.children.map(opt => (
                            <option value={opt.value} key={opt.value}>{opt.label}</option>
                        ))}
                    </optgroup>
                ))}
                {tinType === TIN_TYPE.RESIZED && resizedAmountUnitOptions.map(opt => (
                    <option value={opt.value} key={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
};

export default Amount;
