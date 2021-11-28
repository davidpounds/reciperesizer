interface Conversion {
    type: UNIT_TYPE,
    unit: UNIT,
    conversion: number,
    display?: string,
    dp: number,
}

interface UnitOption {
    label: string,
    value: UNIT
}

export enum SHAPE {
    CIRCLE = "circle",
    OVAL = "oval",
    SQUARE = "square",
    RECTANGLE = "rectangle",
};
export enum TIN_TYPE {
    RECIPE = "recipe",
    RESIZED = "resized",
};
export enum UNIT_TYPE {
    WEIGHT = "weight",
    LENGTH = "length",
    VOLUME = "volume",
    EGGS = "eggs",
}
export const NUMERIC_REGEXP = "[0-9.]+";
export const START_SIZE = 20;
export const START_AMOUNT = 100;

export enum TIN_SIZE_TYPE {
    WIDTH = 'width',
    LENGTH = 'length',
}

export enum UNIT {
    KG = "kilogram",
    G = "gram",
    LB = "pound",
    OZ = "ounce",
    CM = "cm",
    MM = "mm",
    IN = "inch",
    L = "litre",
    ML = "ml",
    UK_FL_OZ = "uk_fluid_ounce",
    US_FL_OZ = "us_fluid_ounce",
    UK_PINT = "uk_pint",
    US_PINT = "us_pint",
    US_CUP = "us_cup",
    TBSP = "tablespoon",
    TSP = "teaspoon",
    MD = "medium",
    LG = "large",
    SM = "small",
}

export enum TEMPERATURE_UNIT {
    F = "farenheit",
    C = "celsius",
    GM = "gas mark",
}

export interface TemperatureConversionResult {
    [TEMPERATURE_UNIT.F]: number;
    [TEMPERATURE_UNIT.C]: number;
    [TEMPERATURE_UNIT.GM]: string;
}

export const CONVERSIONS: Conversion[] = [
    { type: UNIT_TYPE.WEIGHT, unit: UNIT.KG, conversion: 1, dp: 3 },
    { type: UNIT_TYPE.WEIGHT, unit: UNIT.G, conversion: 1000, dp: 0 },
    { type: UNIT_TYPE.WEIGHT, unit: UNIT.LB, conversion: 2.2046226218, dp: 2 },
    { type: UNIT_TYPE.WEIGHT, unit: UNIT.OZ, conversion: 35.2739619496, dp: 1 },
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
    { type: UNIT_TYPE.EGGS, unit: UNIT.SM, conversion: 1.2083131948, dp: 1 },
    { type: UNIT_TYPE.LENGTH, unit: UNIT.CM, conversion: 1, dp: 1 },
    { type: UNIT_TYPE.LENGTH, unit: UNIT.MM, conversion: 10, dp: 0 },
    { type: UNIT_TYPE.LENGTH, unit: UNIT.IN, conversion: 0.3937007874, dp: 1 },
];

const isNumeric = (n: string): boolean => {
    const onlyAllowedCharacters = /^[0-9.]+$/.test(n);
    const decimalCheck = [...n.matchAll(/\./g)].length <= 1;
    return onlyAllowedCharacters && decimalCheck;
};

const isFraction = (n: string): RegExpMatchArray | null => n.match(/^(\d)\/(\d)$/);

export const amountToNumber = (amount: string): number => {
    const floatValue = Number.parseFloat(amount);
    if (!Number.isNaN(floatValue) && isNumeric(amount)) return floatValue;
    const fraction = isFraction(amount);
    if (fraction !== null) {
        const [, numerator, divisor] = fraction;
        const numeratorNumber = Number.parseInt(numerator, 10);
        const divisorNumber = Number.parseInt(divisor, 10);
        if (divisorNumber !== 0) return numeratorNumber / divisorNumber;
    }
    return 0;
}; 

export const ucFirst = (text: string) => text.substr(0, 1).toUpperCase() + text.substr(1);

export const getConversionsByUnitType = (unitType: UNIT_TYPE) => CONVERSIONS.filter(item => item.type === unitType);

const getUnitType = (unit: UNIT) => {
    const conversion = getConversionByUnit(unit);
    return conversion ? conversion.type : false;
};

export const getCompatibleUnits = (unit: UNIT) => {
    const unitType = getUnitType(unit);
    return unitType ? getUnits(unitType) : [];
};

export const getUnits = (unitType: UNIT_TYPE) => getConversionsByUnitType(unitType).map(item => item.unit);

const getConversionByUnit = (unit: UNIT) => CONVERSIONS.find(item => item.unit === unit) ?? false;

export const convert = (amount: number, fromUnit: UNIT, toUnit: UNIT) => {
    // First check that units are compatible.
    const from = getConversionByUnit(fromUnit);
    const to = getConversionByUnit(toUnit);
    if (from === false || to === false) return false;
    return from.type === to.type ? amount / from.conversion * to.conversion : false;
};

export const getTinArea = (tinShape: SHAPE, width: number, widthUnit: UNIT, length: number, lengthUnit: UNIT) => {
    const widthInCm = convert(width, widthUnit, UNIT.CM);
    const lengthInCm = convert(length, lengthUnit, UNIT.CM);
    if (widthInCm === false || lengthInCm === false) return 0;
    const sizes = {
        [SHAPE.CIRCLE]: Math.PI * widthInCm * widthInCm / 4, // π * d^2 / 2 ^ 2
        [SHAPE.OVAL]: Math.PI * widthInCm * lengthInCm / 4,
        [SHAPE.SQUARE]: widthInCm * widthInCm,
        [SHAPE.RECTANGLE]: widthInCm * lengthInCm,
    };
    return sizes?.[tinShape] ?? 0;
};

export const getAmountUnitOptions = () => {
    const unitTypes = Array.from(new Set<UNIT_TYPE>(CONVERSIONS.map(conversion => conversion.type)));
    return unitTypes.map(unitType => {
        const children: UnitOption[] = getConversionsByUnitType(unitType).map(conversion => ({
            label: conversion.display || conversion.unit, 
            value: conversion.unit
        }));
        return {
            label: unitType, 
            children,
        };
    });
};

export const getResizedAmountUnitOptions = (amountUnit: UNIT): UnitOption[] => {
    const compatibleUnits = getCompatibleUnits(amountUnit);
    const compatibleConversions = CONVERSIONS.filter(conversion => compatibleUnits.includes(conversion.unit));
    return compatibleConversions.map(conversion => ({label: conversion.display || conversion.unit, value: conversion.unit}));
};

// Temperatures
const roundToNearestTen = (value: number): number => Math.round(value / 10) * 10;
const roundToNearestFive = (value: number): number => Math.round(value / 20) * 20;
const cToF = (c: number): number => c * 9 / 5 + 32;
const fToC = (f: number): number => (f - 32) * 5 / 9;

export const TEMPERATURE_RANGE = Object.freeze({
    [TEMPERATURE_UNIT.C]: {
        min: 100,
        max: 240,
    },
    [TEMPERATURE_UNIT.F]: {
        min: 210,
        max: 460,
    }
});

export const temperatureConversions = Object.freeze([
    { celsius: 100, gasMark: '< ¼' },
    { celsius: 110, gasMark: '¼' },
    { celsius: 120, gasMark: '¼ - ½' },
    { celsius: 130, gasMark: '½' },
    { celsius: 140, gasMark: '1' },
    { celsius: 150, gasMark: '2' },
    { celsius: 160, gasMark: '2½' },
    { celsius: 170, gasMark: '3' },
    { celsius: 180, gasMark: '4' },
    { celsius: 190, gasMark: '5' },
    { celsius: 200, gasMark: '6' },
    { celsius: 210, gasMark: '6½' },
    { celsius: 220, gasMark: '7' },
    { celsius: 230, gasMark: '8' },
    { celsius: 240, gasMark: '9' },
]);

export const TEMPERATURE_OUT_OF_RANGE = 'Out of range';

export const convertTemperature = (fromValue: number | string, fromUnit: TEMPERATURE_UNIT): TemperatureConversionResult => {
    const conversion: TemperatureConversionResult = {
        [TEMPERATURE_UNIT.F]: 0,
        [TEMPERATURE_UNIT.C]: 0,
        [TEMPERATURE_UNIT.GM]: '',
    };
    if (fromUnit === TEMPERATURE_UNIT.C) {
        const roundedC = roundToNearestTen(fromValue as number);
        conversion[TEMPERATURE_UNIT.C] = fromValue as number;
        conversion[TEMPERATURE_UNIT.F] = roundToNearestFive(cToF(fromValue as number));
        conversion[TEMPERATURE_UNIT.GM] = temperatureConversions.find(tc => tc.celsius === roundedC)?.gasMark ?? TEMPERATURE_OUT_OF_RANGE;
    }
    if (fromUnit === TEMPERATURE_UNIT.F) {
        const c = fToC(fromValue as number);
        conversion[TEMPERATURE_UNIT.C] = roundToNearestFive(c);
        conversion[TEMPERATURE_UNIT.F] = fromValue as number;
        conversion[TEMPERATURE_UNIT.GM] = temperatureConversions.find(tc => tc.celsius === roundToNearestTen(c))?.gasMark ?? TEMPERATURE_OUT_OF_RANGE;
    }
    if (fromUnit === TEMPERATURE_UNIT.GM) {
        const c = temperatureConversions.find(tc => tc.gasMark === fromValue as string)?.celsius ?? 0;
        conversion[TEMPERATURE_UNIT.C] = roundToNearestFive(c);
        conversion[TEMPERATURE_UNIT.F] = roundToNearestFive(cToF(c));
        conversion[TEMPERATURE_UNIT.GM] = fromValue as string;
    }
    return conversion;
}
