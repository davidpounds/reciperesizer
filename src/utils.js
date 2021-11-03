export const SHAPE = Object.freeze({
    CIRCLE: "circle",
    OVAL: "oval",
    SQUARE: "square",
    RECTANGLE: "rectangle",
});
export const TIN_TYPE = Object.freeze({
    RECIPE: "recipe",
    RESIZED: "resized",
});
export const UNIT_TYPE = Object.freeze({
    WEIGHT: "weight",
    LENGTH: "length",
    VOLUME: "volume",
    EGGS: "eggs",
});
export const NUMERIC_REGEXP = "[0-9.]+";
export const START_SIZE = 20;
export const START_AMOUNT = 100;

export const TIN_SIZE_TYPE = Object.freeze({
    WIDTH: 'width',
    LENGTH: 'length',
});

export const UNIT = Object.freeze({
    KG: "kilogram",
    G: "gram",
    LB: "pound",
    OZ: "ounce",
    CM: "cm",
    MM: "mm",
    IN: "inch",
    L: "litre",
    ML: "ml",
    UK_FL_OZ: "uk_fluid_ounce",
    US_FL_OZ: "us_fluid_ounce",
    UK_PINT: "uk_pint",
    US_PINT: "us_pint",
    US_CUP: "us_cup",
    TBSP: "tablespoon",
    TSP: "teaspoon",
    MD: "medium",
    LG: "large",
    SM: "small",
});

export const CONVERSIONS = Object.freeze([
    { type: UNIT_TYPE.WEIGHT, unit: UNIT.KG, conversion: 1, dp: 3 },
    { type: UNIT_TYPE.WEIGHT, unit: UNIT.G, conversion: 1000, dp: 0 },
    { type: UNIT_TYPE.WEIGHT, unit: UNIT.LB, conversion: 2.2046226218, dp: 2 },
    { type: UNIT_TYPE.WEIGHT, unit: UNIT.OZ, conversion: 35.2739619496, dp: 1 },
    { type: UNIT_TYPE.LENGTH, unit: UNIT.CM, conversion: 1, dp: 1 },
    { type: UNIT_TYPE.LENGTH, unit: UNIT.MM, conversion: 10, dp: 0 },
    { type: UNIT_TYPE.LENGTH, unit: UNIT.IN, conversion: 0.3937007874, dp: 1 },
    { type: UNIT_TYPE.VOLUME, unit: UNIT.L, conversion: 1, dp: 3 },
    { type: UNIT_TYPE.VOLUME, unit: UNIT.ML, conversion: 1000, dp: 0 },
    { type: UNIT_TYPE.VOLUME, unit: UNIT.UK_FL_OZ, conversion: 35.198873636, display: "UK fluid ounce", dp: 1 },
    { type: UNIT_TYPE.VOLUME, unit: UNIT.US_FL_OZ, conversion: 33.8140227018, display: "US fluid ounce", dp: 1 },
    { type: UNIT_TYPE.VOLUME, unit: UNIT.UK_PINT, conversion: 1.7605633803, display: "UK pint", dp: 2 },
    { type: UNIT_TYPE.VOLUME, unit: UNIT.US_PINT, conversion: 2.1133764189, display: "US pint", dp: 2 },
    { type: UNIT_TYPE.VOLUME, unit: UNIT.US_CUP, conversion: 4.2267528377, display: "US cup", dp: 1 },
    { type: UNIT_TYPE.VOLUME, unit: UNIT.TBSP, conversion: 66.6666666667, dp: 1 },
    { type: UNIT_TYPE.VOLUME, unit: UNIT.TSP, conversion: 200, dp: 1 },
    { type: UNIT_TYPE.EGGS, unit: UNIT.MD, conversion: 1, dp: 1 },
    { type: UNIT_TYPE.EGGS, unit: UNIT.LG, conversion: 0.8529512112, dp: 1 },
    { type: UNIT_TYPE.EGGS, unit: UNIT.SM, conversion: 1.2083131948, dp: 1 }
]);

export const ucFirst = text => text.substr(0, 1).toUpperCase() + text.substr(1);

export const getConversionsByUnitType = unitType => CONVERSIONS.filter(item => item.type === unitType);

const getUnitType = unit => {
    const conversion = getConversionByUnit(unit);
    return conversion ? conversion.type : false;
};

export const getCompatibleUnits = unit => {
    const unitType = getUnitType(unit);
    return getUnits(unitType);
};

export const getUnits = unitType => getConversionsByUnitType(unitType).map(item => item.unit);

const getConversionByUnit = unit => CONVERSIONS.find(item => item.unit === unit) ?? false;

export const convert = (amount, fromUnit, toUnit) => {
    // First check that units are compatible.
    const from = getConversionByUnit(fromUnit);
    const to = getConversionByUnit(toUnit);
    return from.type === to.type ? amount / from.conversion * to.conversion : false;
};

export const getTinArea = (tinShape, width, widthUnit, length, lengthUnit) => {
    const widthInCm = convert(width, widthUnit, UNIT.CM);
    const lengthInCm = convert(length, lengthUnit, UNIT.CM);
    const sizes = {
        [SHAPE.CIRCLE]: Math.PI * widthInCm * widthInCm / 4, // π * d^2 / 2 ^ 2
        [SHAPE.OVAL]: Math.PI * widthInCm * lengthInCm / 4,
        [SHAPE.SQUARE]: widthInCm * widthInCm,
        [SHAPE.RECTANGLE]: widthInCm * lengthInCm,
    };
    return sizes?.[tinShape] ?? 0;
};

export const getAmountUnitOptions = () => {
    const unitTypes = [...new Set(CONVERSIONS.map(conversion => conversion.type))];
    return unitTypes.map(unitType => {
        const children = getConversionsByUnitType(unitType).map(conversion => ({
            label: conversion.display || conversion.unit, 
            value: conversion.unit
        }));
        return {
            label: unitType, 
            children,
        };
    });
};

export const getResizedAmountUnitOptions = amountUnit => {
    const compatibleUnits = getCompatibleUnits(amountUnit);
    const compatibleConversions = CONVERSIONS.filter(conversion => compatibleUnits.includes(conversion.unit));
    return compatibleConversions.map(conversion => ({label: conversion.display || conversion.unit, value: conversion.unit}));
};

