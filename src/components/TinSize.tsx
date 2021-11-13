import React from 'react';
import { 
    TIN_TYPE,
    TIN_SIZE_TYPE,
    UNIT,
    NUMERIC_REGEXP, 
    ucFirst,
} from '../utils'; 

interface TinSizeProps {
    tinType: TIN_TYPE, 
    sizeType: TIN_SIZE_TYPE,
    size: number,
    setSize: React.Dispatch<React.SetStateAction<number>>,
    sizeUnits: UNIT, 
    setSizeUnits: React.Dispatch<React.SetStateAction<UNIT>>,
    lengthUnits: UNIT[],
}

const TinSize: React.FC<TinSizeProps> = (props: TinSizeProps) => {
    const {
        tinType, 
        sizeType,
        size,
        setSize,
        sizeUnits, 
        setSizeUnits,
        lengthUnits,
    } = props;

    const tinSizeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSize(+e.target.value);
    };

    const tinUnitChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>)=> {
        setSizeUnits(e.target.value as UNIT);
    };

    return (
        <div className="form-group-pair">
            <label htmlFor={`${tinType}_${sizeType}`}>
                {ucFirst(sizeType)} of tin
            </label>
            <input 
                id={`${tinType}_${sizeType}`} 
                type="text" 
                className="numeric" 
                pattern={NUMERIC_REGEXP} 
                value={size} 
                onChange={tinSizeChangeHandler}
                size={5}
                maxLength={5}
            />

            <label htmlFor={`${tinType}_${sizeType}_unit`} className="off-screen">
                Unit for tin {sizeType}
            </label>
            <select id={`${tinType}_${sizeType}_unit`} value={sizeUnits} onChange={tinUnitChangeHandler}>
                {lengthUnits.map(unit => (
                    <option value={unit} key={unit}>{unit}</option>
                ))}
            </select>
        </div>
    );
};

export default TinSize;
