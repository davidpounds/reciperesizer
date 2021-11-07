import { createSelector } from 'reselect';
import { CONVERSIONS } from '../utils';

const selectorFactory = property => createSelector(
    state => state,
    (_, tinType) => tinType,
    (state, tinType) => state?.[tinType]?.[property] ?? null
);

export const getTinAreaCm2 = selectorFactory('tinAreaCm2');
export const getAmount = selectorFactory('amount');
export const getUnit = selectorFactory('unit');
export const getConversionRatio = state => state?.conversionRatio ?? 1;

export const getUnitType = createSelector(
    state => state,
    (_, tinType) => tinType,
    (state, tinType) => {
        const unit = getUnit(state, tinType);
        return CONVERSIONS.find(conv => conv.unit === unit)?.type ?? null;
    }
);

export const getCompatibleUnits = createSelector(
    state => state,
    (_, tinType) => tinType,
    (state, tinType) => {
        const unitType = getUnitType(state, tinType);
        if (unitType === null) return [];
        return CONVERSIONS.filter(conv => conv.type === unitType).map(conv => ({
            value: conv.unit,
            label: conv.display || conv.unit,
        }));
    }
);
