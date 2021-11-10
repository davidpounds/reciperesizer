import { createSelector } from 'reselect';
import { CONVERSIONS, TIN_TYPE } from '../utils';

export const getRecipeTinAreaCm2 = state => state[TIN_TYPE.RECIPE].tinAreaCm2;
export const getResizedTinAreaCm2 = state => state[TIN_TYPE.RESIZED].tinAreaCm2;
export const getRecipeAmount = state => state[TIN_TYPE.RECIPE].amount;
export const getResizedAmount = state => state[TIN_TYPE.RESIZED].amount;
export const getRecipeUnit = state => state[TIN_TYPE.RECIPE].unit;
export const getResizedUnit = state => state[TIN_TYPE.RESIZED].unit;
export const getConversionRatio = state => state?.conversionRatio ?? 1;

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
