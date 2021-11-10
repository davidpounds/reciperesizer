import { 
    NUMERIC_REGEXP, 
    ucFirst,
} from '../utils'; 

const TinSize = props => {
    const {
        tinType, 
        sizeType,
        size,
        setSize,
        sizeUnits, 
        setSizeUnits,
        lengthUnits,
    } = props;

    const tinSizeChangeHandler = e => {
        setSize(e.target.value);
    };

    const tinUnitChangeHandler = e => {
        setSizeUnits(e.target.value);
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
