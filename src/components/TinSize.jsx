import { useSelector, useDispatch } from 'react-redux';
import { 
    TIN_SIZE_TYPE,
    NUMERIC_REGEXP, 
    ucFirst,
} from '../utils'; 
import { 
    getTinWidth, 
    getTinWidthUnits,
    getTinLength, 
    getTinLengthUnits, 
} from '../redux/selectors';
import {
    setTinWidth, 
    setTinWidthUnits,
    setTinLength, 
    setTinLengthUnits, 
} from '../redux/actions';

const TinSize = props => {
    const {
        tinType, 
        sizeType,
        lengthUnits,
    } = props;

    const dispatch = useDispatch();
    const getTinSize = sizeType === TIN_SIZE_TYPE.WIDTH ? getTinWidth : getTinLength;
    const setTinSize = sizeType === TIN_SIZE_TYPE.WIDTH ? setTinWidth : setTinLength;
    const getTinSizeUnits = sizeType === TIN_SIZE_TYPE.WIDTH ? getTinWidthUnits : getTinLengthUnits;
    const setTinSizeUnits = sizeType === TIN_SIZE_TYPE.WIDTH ? setTinWidthUnits : setTinLengthUnits;
    const tinSize = useSelector(state => getTinSize(state, tinType));
    const sizeUnit = useSelector(state => getTinSizeUnits(state, tinType));

    const tinSizeChangeHandler = e => {
        dispatch(setTinSize(tinType, e.target.value));
    };

    const tinUnitChangeHandler = e => {
        dispatch(setTinSizeUnits(tinType, e.target.value));
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
                value={tinSize} 
                onChange={tinSizeChangeHandler}
                size={5}
                maxLength={5}
            />

            <label htmlFor={`${tinType}_${sizeType}_unit`} className="off-screen">
                Unit for tin {sizeType}
            </label>
            <select id={`${tinType}_${sizeType}_unit`} value={sizeUnit} onChange={tinUnitChangeHandler}>
                {lengthUnits.map(unit => (
                    <option value={unit} key={unit}>{unit}</option>
                ))}
            </select>
        </div>
    );
};

export default TinSize;
