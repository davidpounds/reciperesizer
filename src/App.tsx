import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getRecipeTinAreaCm2,
  getResizedTinAreaCm2,
  getRecipeAmount,
  getResizedAmount,
  getRecipeUnit,
  getResizedUnit,
} from './redux/selectors';
import { 
  setConversionRatio,
  setAmount,
  setUnit,
} from './redux/actions';
import { TIN_TYPE, convert } from './utils';
import TinSelector from './components/TinSelector';
import Amount from './components/Amount';

const App: React.FC<{}> = () => {
  const recipeTinArea = useSelector(getRecipeTinAreaCm2);
  const resizedTinArea = useSelector(getResizedTinAreaCm2);
  const recipeAmount = useSelector(getRecipeAmount);
  const resizedAmount = useSelector(getResizedAmount);
  const recipeUnit = useSelector(getRecipeUnit);
  const resizedUnit = useSelector(getResizedUnit);
  const dispatch = useDispatch();

  useEffect(() => {
    const newConversionRatio = resizedTinArea / recipeTinArea;
    dispatch(setConversionRatio(newConversionRatio));
    const convertedAmount = convert(recipeAmount, recipeUnit, resizedUnit);
    if (convertedAmount !== false) {
      const newAmount = convertedAmount * newConversionRatio;
      dispatch(setAmount(TIN_TYPE.RESIZED, +newAmount.toPrecision(3)));
    }
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

  useEffect(() => {
    dispatch(setUnit(TIN_TYPE.RESIZED, recipeUnit));
  },
  [
    recipeUnit,
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
