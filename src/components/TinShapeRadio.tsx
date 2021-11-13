import React from 'react';
import { SHAPE, TIN_TYPE } from '../utils';

interface TinShapeRadioProps {
    shape: SHAPE, 
    tinType: TIN_TYPE, 
    label: string, 
    tinShape: SHAPE, 
    setTinShape: React.Dispatch<React.SetStateAction<SHAPE>>, 
}

const TinShapeRadio: React.FC<TinShapeRadioProps> = (props: TinShapeRadioProps) => {
    const { 
        shape, 
        tinType, 
        label, 
        tinShape, 
        setTinShape, 
    } = props;
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTinShape(shape);
    };

    return (
        <div className={`radio ${shape}`}>
            <input 
                type="radio" 
                name={`shape_${tinType}`} 
                id={`${tinType}_shape_${shape}`} 
                value={shape} 
                className="off-screen" 
                checked={tinShape === shape} 
                onChange={changeHandler}
            />
            <label htmlFor={`${tinType}_shape_${shape}`}>
                {label}
            </label>
        </div>
    );
};

export default TinShapeRadio;
