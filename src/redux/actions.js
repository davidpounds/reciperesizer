export const ACTION = Object.freeze({
    TIN_AREA_CM2: 'TIN_AREA_CM2',
    AMOUNT: 'AMOUNT',
    UNIT: 'UNIT',
    CONVERSION_RATIO: 'CONVERSION_RATIO',
});

const actionFactory = type => (tinType, data) => ({ type, tinType, data });

export const setTinAreaCm2 = actionFactory(ACTION.TIN_AREA_CM2);
export const setAmount = actionFactory(ACTION.AMOUNT);
export const setUnit = actionFactory(ACTION.UNIT);
export const setConversionRatio = data => ({
    type: ACTION.CONVERSION_RATIO,
    data,
});
