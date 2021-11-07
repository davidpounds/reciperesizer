const TinShapeRadio = props => {
    const { 
        shape, 
        tinType, 
        label, 
        tinShape, 
        setTinShape, 
    } = props;
    const changeHandler = e => {
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
