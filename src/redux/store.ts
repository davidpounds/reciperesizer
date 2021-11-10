import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { 
    START_SIZE,
    START_AMOUNT,
    UNIT,
    TIN_TYPE,
} from '../utils';
import { ACTION } from './actions';

interface TinStore {
    tinAreaCm2: number,
    amount: number,
    unit: UNIT,
}

export interface Store {
    [TIN_TYPE.RECIPE]: TinStore,
    [TIN_TYPE.RESIZED]: TinStore,
    conversionRatio: number,
}

export interface Action {
    type: ACTION,
    tinType: TIN_TYPE,
    data: ActionType,
}

export type ActionType = number | UNIT;

const initialState: Store = {
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

const newState = (state: Store, tinType: TIN_TYPE, property: string, value: ActionType): Store => ({
    ...state,
    [tinType]: {
        ...state[tinType],
        [property]: value,
    }
});

const reducer = (state: Store = initialState, action: Action): Store => {
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
                conversionRatio: data as number,
            };
        default:
            return state;
    }
};

const store = createStore(reducer, composeWithDevTools());

export default store;
