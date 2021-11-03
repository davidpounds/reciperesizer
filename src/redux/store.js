import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { 
    SHAPE,
    START_SIZE,
    START_AMOUNT,
    UNIT,
    TIN_TYPE,
 } from '../utils';
 import { ACTION } from './actions';

const initialState = {
    [TIN_TYPE.RECIPE]: {
        tinShape: SHAPE.CIRCLE,
        tinWidth: START_SIZE,
        tinLength: START_SIZE,
        tinWidthUnits: UNIT.CM,
        tinLengthUnits: UNIT.CM,
        amount: START_AMOUNT,
        unit: UNIT.G,
    },
    [TIN_TYPE.RESIZED]: {
        tinShape: SHAPE.CIRCLE,
        tinWidth: START_SIZE,
        tinLength: START_SIZE,
        tinWidthUnits: UNIT.CM,
        tinLengthUnits: UNIT.CM,
        amount: START_AMOUNT,
        unit: UNIT.G,
    },
    conversionRatio: 1,
};

const newState = (state, tinType, property, value) => ({
    ...state,
    [tinType]: {
        ...state[tinType],
        [property]: value,
    }
});

const reducer = (state = initialState, action = {}) => {
    const { type, tinType, data } = action;
    
    switch (type) {
        case ACTION.TIN_SHAPE:
            return newState(state, tinType, 'tinShape', data);
        case ACTION.TIN_WIDTH:
            return newState(state, tinType, 'tinWidth', data);
        case ACTION.TIN_LENGTH:
            return newState(state, tinType, 'tinLength', data);
        case ACTION.TIN_WIDTH_UNITS:
            return newState(state, tinType, 'tinWidthUnits', data);
        case ACTION.TIN_LENGTH_UNITS:
            return newState(state, tinType, 'tinLengthUnits', data);
        case ACTION.AMOUNT:
            return newState(state, tinType, 'amount', data);
        case ACTION.UNIT:
            return newState(state, tinType, 'unit', data);
        case ACTION.CONVERSION_RATIO:
            return {
                ...state, 
                conversionRatio: data,
            };
        default:
            return state;
    }
};

const store = createStore(reducer, composeWithDevTools());

export default store;
