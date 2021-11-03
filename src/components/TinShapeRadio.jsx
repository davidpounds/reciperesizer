import { useSelector, useDispatch } from 'react-redux';
import { getTinShape } from '../redux/selectors';
import { setTinShape } from '../redux/actions';

const TinShapeRadio = props => {
    const { shape, tinType, label } = props;
    const dispatch = useDispatch();
    const tinShape = useSelector(state => getTinShape(state, tinType));
    const changeHandler = e => {
        dispatch(setTinShape(tinType, shape));
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
