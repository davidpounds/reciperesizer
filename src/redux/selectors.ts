import { createSelector } from 'reselect';
import { CONVERSIONS, TIN_TYPE } from '../utils';
import { Store } from './store';

export const getRecipeTinAreaCm2 = (state: Store) => state[TIN_TYPE.RECIPE].tinAreaCm2;
export const getResizedTinAreaCm2 = (state: Store) => state[TIN_TYPE.RESIZED].tinAreaCm2;
export const getRecipeAmount = (state: Store) => state[TIN_TYPE.RECIPE].amount;
export const getResizedAmount = (state: Store) => state[TIN_TYPE.RESIZED].amount;
export const getRecipeUnit = (state: Store) => state[TIN_TYPE.RECIPE].unit;
export const getResizedUnit = (state: Store) => state[TIN_TYPE.RESIZED].unit;
export const getConversionRatio = (state: Store) => state?.conversionRatio ?? 1;

export const getRecipeUnitType = createSelector(
    [getRecipeUnit],
    (recipeUnit) => CONVERSIONS.find(conv => conv.unit === recipeUnit)?.type ?? null
);

export const getResizedUnitType = createSelector(
    [getResizedUnit],
    (resizedUnit) => CONVERSIONS.find(conv => conv.unit === resizedUnit)?.type ?? null
);

export const getResizedCompatibleUnits = createSelector(
    [getResizedUnitType],
    (resizedUnitType) => CONVERSIONS.filter(conv => conv.type === resizedUnitType).map(conv => ({
        value: conv.unit,
        label: conv.display || conv.unit,
    }))
);
