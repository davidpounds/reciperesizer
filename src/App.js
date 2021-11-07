import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTinAreaCm2,
  getAmount,
  getUnit,
} from './redux/selectors';
import { 
  setConversionRatio,
  setAmount,
} from './redux/actions';
import { TIN_TYPE, convert } from './utils';
import TinSelector from './components/TinSelector';
import Amount from './components/Amount';

const App = () => {
  const recipeTinArea = useSelector(state => getTinAreaCm2(state, TIN_TYPE.RECIPE));
  const recipeAmount = useSelector(state => getAmount(state, TIN_TYPE.RECIPE));
  const recipeUnit = useSelector(state => getUnit(state, TIN_TYPE.RECIPE));
  const resizedTinArea = useSelector(state => getTinAreaCm2(state, TIN_TYPE.RESIZED));
  const resizedAmount = useSelector(state => getAmount(state, TIN_TYPE.RESIZED));
  const resizedUnit = useSelector(state => getUnit(state, TIN_TYPE.RESIZED));
  const dispatch = useDispatch();

  useEffect(() => {
    const newConversionRatio = resizedTinArea / recipeTinArea;
    dispatch(setConversionRatio(newConversionRatio));
    const newAmount = convert(recipeAmount, recipeUnit, resizedUnit) * newConversionRatio;
    dispatch(setAmount(TIN_TYPE.RESIZED, newAmount.toPrecision(3)));
  },
  [
    recipeTinArea,
    recipeAmount,
    recipeUnit,
    resizedTinArea,
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
