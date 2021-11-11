import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTinAreaCm2 } from '../redux/actions';
import { 
    TIN_TYPE, 
    SHAPE, 
    TIN_SIZE_TYPE,
    START_SIZE,
    UNIT,
    UNIT_TYPE,
    ucFirst,
    getTinArea,
    getUnits,
} from '../utils';
import TinShapeRadio from './TinShapeRadio';
import TinSize from './TinSize';

const TinSelector = (props: { tinType: TIN_TYPE }) => {
    const { tinType } = props;

    const dispatch = useDispatch();
    const [tinShape, setTinShape] = useState(SHAPE.CIRCLE);
    const [tinWidth, setTinWidth] = useState(START_SIZE);
    const [tinWidthUnits, setTinWidthUnits] = useState(UNIT.CM);
    const [tinLength, setTinLength] = useState(START_SIZE);
    const [tinLengthUnits, setTinLengthUnits] = useState(UNIT.CM);
    const [tinArea, setTinArea] = useState(getTinArea(tinShape, tinWidth, tinWidthUnits, tinLength, tinLengthUnits));

    useEffect(() => {
        const newTinArea = getTinArea(tinShape, tinWidth, tinWidthUnits, tinLength, tinLengthUnits);
        setTinArea(newTinArea);
        dispatch(setTinAreaCm2(tinType, newTinArea));
    }, [
        tinShape,
        tinWidth,
        tinWidthUnits,
        tinLength,
        tinLengthUnits,
        tinType,
        dispatch,
    ]);

    const showLength = [SHAPE.OVAL, SHAPE.RECTANGLE].includes(tinShape);
    const displayArea = (area: number): string => Number.isNaN(area) ? '0' : area.toFixed(0);
    const lengthUnits = getUnits(UNIT_TYPE.LENGTH);

    return (
        <div className="panel">

            <h2>
                What shape and size tin 
                {tinType === TIN_TYPE.RECIPE && <> does the recipe </>}
                {tinType === TIN_TYPE.RESIZED && <> do you want to </>}
                use?
            </h2>

            <TinShapeRadio 
                shape={SHAPE.CIRCLE} 
                label={ucFirst(SHAPE.CIRCLE)} 
                tinType={tinType} 
                tinShape={tinShape}
                setTinShape={setTinShape} 
            />
            <TinShapeRadio 
                shape={SHAPE.OVAL} 
                label={ucFirst(SHAPE.OVAL)} 
                tinType={tinType} 
                tinShape={tinShape}
                setTinShape={setTinShape} 
            />
            <TinShapeRadio 
                shape={SHAPE.SQUARE} 
                label={ucFirst(SHAPE.SQUARE)} 
                tinType={tinType} 
                tinShape={tinShape}
                setTinShape={setTinShape} 
            />
            <TinShapeRadio 
                shape={SHAPE.RECTANGLE} 
                label={ucFirst(SHAPE.RECTANGLE)} 
                tinType={tinType} 
                tinShape={tinShape}
                setTinShape={setTinShape} 
            />

            <div className="form-group">
                <TinSize 
                    tinType={tinType} 
                    sizeType={TIN_SIZE_TYPE.WIDTH} 
                    size={tinWidth}
                    setSize={setTinWidth}
                    sizeUnits={tinWidthUnits} 
                    setSizeUnits={setTinWidthUnits}
                    lengthUnits={lengthUnits}
                />
                {showLength && (
                    <TinSize 
                        tinType={tinType} 
                        sizeType={TIN_SIZE_TYPE.LENGTH} 
                        size={tinLength}
                        setSize={setTinLength}
                        sizeUnits={tinLengthUnits} 
                        setSizeUnits={setTinLengthUnits}
                        lengthUnits={lengthUnits}
                    />
                )}
            </div>

            <p className="tinarea">Tin area: {displayArea(tinArea)}cm<sup>2</sup></p>

        </div>
    );
};

export default TinSelector;
