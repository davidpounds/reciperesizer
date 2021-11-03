import { useSelector } from 'react-redux';
import { 
    TIN_TYPE, 
    SHAPE, 
    UNIT_TYPE, 
    TIN_SIZE_TYPE,
    getUnits, 
    ucFirst,
    getTinArea,
} from '../utils';
import {
    getTinShape,
    getTinWidth,
    getTinWidthUnits,
    getTinLength,
    getTinLengthUnits,
} from '../redux/selectors';
import TinShapeRadio from './TinShapeRadio';
import TinSize from './TinSize';

const TinSelector = props => {

    const { tinType } = props;
    const tinShape = useSelector(state => getTinShape(state, tinType));
    const tinWidth = useSelector(state => getTinWidth(state, tinType));
    const tinWidthUnits = useSelector(state => getTinWidthUnits(state, tinType));
    const tinLength = useSelector(state => getTinLength(state, tinType));
    const tinLengthUnits = useSelector(state => getTinLengthUnits(state, tinType));

    const lengthUnits = getUnits(UNIT_TYPE.LENGTH);
    const tinArea = getTinArea(tinShape, tinWidth, tinWidthUnits, tinLength, tinLengthUnits);
    const showLength = [SHAPE.OVAL, SHAPE.RECTANGLE].includes(tinShape);
    const displayArea = area => Number.isNaN(area) ? 0 : area.toFixed(0);

    return (
        <div className="panel">

            <h2>
                What shape and size tin 
                {tinType === TIN_TYPE.RECIPE && <> does the recipe </>}
                {tinType === TIN_TYPE.RESIZED && <> do you want to </>}
                use?
            </h2>

            <TinShapeRadio shape={SHAPE.CIRCLE} label={ucFirst(SHAPE.CIRCLE)} tinType={tinType} />
            <TinShapeRadio shape={SHAPE.OVAL} label={ucFirst(SHAPE.OVAL)} tinType={tinType} />
            <TinShapeRadio shape={SHAPE.SQUARE} label={ucFirst(SHAPE.SQUARE)} tinType={tinType} />
            <TinShapeRadio shape={SHAPE.RECTANGLE} label={ucFirst(SHAPE.RECTANGLE)} tinType={tinType} />

            <div className="form-group">
                <TinSize tinType={tinType} sizeType={TIN_SIZE_TYPE.WIDTH} lengthUnits={lengthUnits} />
                {showLength && <TinSize tinType={tinType} sizeType={TIN_SIZE_TYPE.LENGTH} lengthUnits={lengthUnits} />}
            </div>

            <p className="tinarea">Tin area: {displayArea(tinArea)}cm<sup>2</sup></p>

        </div>
    );
};

export default TinSelector;
