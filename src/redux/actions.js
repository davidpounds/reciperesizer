export const ACTION = Object.freeze({
    TIN_SHAPE: 'TIN_SHAPE',
    TIN_WIDTH: 'TIN_WIDTH',
    TIN_LENGTH: 'TIN_LENGTH',
    TIN_WIDTH_UNITS: 'TIN_WIDTH_UNITS',
    TIN_LENGTH_UNITS: 'TIN_LENGTH_UNITS',
    AMOUNT: 'AMOUNT',
    UNIT: 'UNIT',
    CONVERSION_RATIO: 'CONVERSION_RATIO',
});

const actionFactory = type => (tinType, data) => ({ type, tinType, data });

export const setTinShape = actionFactory(ACTION.TIN_SHAPE);
export const setTinWidth = actionFactory(ACTION.TIN_WIDTH);
export const setTinLength = actionFactory(ACTION.TIN_LENGTH);
export const setTinWidthUnits = actionFactory(ACTION.TIN_WIDTH_UNITS);
export const setTinLengthUnits = actionFactory(ACTION.TIN_LENGTH_UNITS);
export const setAmount = actionFactory(ACTION.AMOUNT);
export const setUnit = actionFactory(ACTION.UNIT);
export const setConversionRatio = data => ({
    type: ACTION.CONVERSION_RATIO,
    data,
});
