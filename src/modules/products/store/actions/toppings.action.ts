import {Action} from '@ngrx/store';
import {ITopping} from '@products/models/topping.model';

export const LOAD_TOPPINGS = '[Products] Load Toppings';
export const LOAD_TOPPINGS_FAIL = '[Products] Load Toppings Fail';
export const LOAD_TOPPINGS_SUCCESS = '[Products] Load Toppings Success';
export const VISUALIZE_TOPPINGS = '[Products] Visualize Toppings';

export class LoadToppings implements Action {
    public readonly type: string = LOAD_TOPPINGS; // tslint:disable-line no-reserved-keywords
}

export class LoadToppingsFail implements Action {
    public readonly type: string = LOAD_TOPPINGS_FAIL; // tslint:disable-line no-reserved-keywords

    constructor(public payload: any) {}// tslint:disable-line no-any
}

export class LoadToppingsSuccess implements Action {
    public readonly type: string = LOAD_TOPPINGS_SUCCESS; // tslint:disable-line no-reserved-keywords

    constructor(public payload: ITopping[]) {}
}

export class VisualizeToppings implements Action {
    public readonly type: string = VISUALIZE_TOPPINGS; // tslint:disable-line no-reserved-keywords

    constructor(public payload: number[]) {}
}

export type ToppingsAction =
    | LoadToppings
    | LoadToppingsFail
    | LoadToppingsSuccess
    | VisualizeToppings;
