import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { 
    START_SIZE,
    START_AMOUNT,
    UNIT,
    TIN_TYPE,
 } from '../utils';
 import { ACTION } from './actions';

const initialState = {
    [TIN_TYPE.RECIPE]: {
        tinAreaCm2: Math.PI * START_SIZE * START_SIZE / 4 ,
        amount: START_AMOUNT,
        unit: UNIT.G,
    },
    [TIN_TYPE.RESIZED]: {
        tinAreaCm2: Math.PI * START_SIZE * START_SIZE / 4 ,
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
        case ACTION.TIN_AREA_CM2:
            return newState(state, tinType, 'tinAreaCm2', data);
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
