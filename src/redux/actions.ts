import { Action, ActionType } from './store';
import { TIN_TYPE } from "../utils";

export enum ACTION {
    TIN_AREA_CM2 = 'TIN_AREA_CM2',
    AMOUNT = 'AMOUNT',
    UNIT = 'UNIT',
    CONVERSION_RATIO = 'CONVERSION_RATIO',
}

const actionFactory = (type: ACTION) => (tinType: TIN_TYPE, data: ActionType): Action => ({ type, tinType, data });

export const setTinAreaCm2 = actionFactory(ACTION.TIN_AREA_CM2);
export const setAmount = actionFactory(ACTION.AMOUNT);
export const setUnit = actionFactory(ACTION.UNIT);
export const setConversionRatio = (data: number) => ({
    type: ACTION.CONVERSION_RATIO,
    data,
});
