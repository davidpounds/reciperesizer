import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTinShape,
  getTinWidth,
  getTinLength,
  getTinWidthUnits,
  getTinLengthUnits,
  getAmount,
  getUnit,
  getConversionRatio,
} from './redux/selectors';
import { 
  setConversionRatio,
  setAmount,
} from './redux/actions';
import { TIN_TYPE, getTinArea, convert } from './utils';
import TinSelector from './components/TinSelector';
import Amount from './components/Amount';

const App = () => {
  const recipeTinShape = useSelector(state => getTinShape(state, TIN_TYPE.RECIPE));
  const recipeTinWidth = useSelector(state => getTinWidth(state, TIN_TYPE.RECIPE));
  const recipeTinLength = useSelector(state => getTinLength(state, TIN_TYPE.RECIPE));
  const recipeTinWidthUnits = useSelector(state => getTinWidthUnits(state, TIN_TYPE.RECIPE));
  const recipeTinLengthUnits = useSelector(state => getTinLengthUnits(state, TIN_TYPE.RECIPE));
  const recipeAmount = useSelector(state => getAmount(state, TIN_TYPE.RECIPE));
  const recipeUnit = useSelector(state => getUnit(state, TIN_TYPE.RECIPE));
  const resizedTinShape = useSelector(state => getTinShape(state, TIN_TYPE.RESIZED));
  const resizedTinWidth = useSelector(state => getTinWidth(state, TIN_TYPE.RESIZED));
  const resizedTinLength = useSelector(state => getTinLength(state, TIN_TYPE.RESIZED));
  const resizedTinWidthUnits = useSelector(state => getTinWidthUnits(state, TIN_TYPE.RESIZED));
  const resizedTinLengthUnits = useSelector(state => getTinLengthUnits(state, TIN_TYPE.RESIZED));
  const resizedAmount = useSelector(state => getAmount(state, TIN_TYPE.RESIZED));
  const resizedUnit = useSelector(state => getUnit(state, TIN_TYPE.RESIZED));
  const dispatch = useDispatch();

  useEffect(() => {
    const recipeArea = getTinArea(recipeTinShape, recipeTinWidth, recipeTinWidthUnits, recipeTinLength, recipeTinLengthUnits);
    const resizedArea = getTinArea(resizedTinShape, resizedTinWidth, resizedTinWidthUnits, resizedTinLength, resizedTinLengthUnits);
    const newConversionRatio = resizedArea / recipeArea;
    dispatch(setConversionRatio(newConversionRatio));
    const newAmount = convert(recipeAmount, recipeUnit, resizedUnit) * newConversionRatio;
    dispatch(setAmount(TIN_TYPE.RESIZED, newAmount.toPrecision(3)));
  },
  [
    recipeTinShape,
    recipeTinWidth,
    recipeTinLength,
    recipeTinWidthUnits,
    recipeTinLengthUnits,
    recipeAmount,
    recipeUnit,
    resizedTinShape,
    resizedTinWidth,
    resizedTinLength,
    resizedTinWidthUnits,
    resizedTinLengthUnits,
    resizedAmount,
    resizedUnit,
    dispatch,
  ]);

  return (
    <div className="reciperesizer">
      <h1>Recipe resizer</h1>
      <TinSelector tinType={TIN_TYPE.RECIPE} />
      <TinSelector tinType={TIN_TYPE.RESIZED} />

      <div className="panel">
        <h2>Amount to be converted</h2>
        <Amount tinType={TIN_TYPE.RECIPE} />
        <Amount tinType={TIN_TYPE.RESIZED} />
      </div>
    </div>
  );
};

export default App;
