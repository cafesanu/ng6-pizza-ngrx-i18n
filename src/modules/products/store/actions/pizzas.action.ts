import {Action} from '@ngrx/store';
import {IPizza} from '@products/models/pizza.model';

// Load pizza
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';

export class LoadPizzas implements Action {
    public readonly type: string = LOAD_PIZZAS; // tslint:disable-line no-reserved-keywords
}

export class LoadPizzasFail implements Action {
    public readonly type: string = LOAD_PIZZAS_FAIL; // tslint:disable-line no-reserved-keywords

    constructor(public payload: any) {} // tslint:disable-line no-any
}

export class LoadPizzasSuccess implements Action {
    public readonly type: string = LOAD_PIZZAS_SUCCESS; // tslint:disable-line no-reserved-keywords

    constructor(public payload: IPizza[]) {}
}

// Create pizza
export const CREATE_PIZZA = '[Products] Create Pizzas';
export const CREATE_PIZZA_FAIL = '[Products] Create Pizzas Fail';
export const CREATE_PIZZA_SUCCESS = '[Products] Create Pizzas Success';

export class CreatePizza implements Action {
    public readonly type: string = CREATE_PIZZA; // tslint:disable-line no-reserved-keywords

    constructor(public payload: IPizza) {} // tslint:disable-line no-any
}

export class CreatePizzaFail implements Action {
    public readonly type: string = CREATE_PIZZA_FAIL; // tslint:disable-line no-reserved-keywords

    constructor(public payload: any) {} // tslint:disable-line no-any
}

export class CreatePizzaSuccess implements Action {
    public readonly type: string = CREATE_PIZZA_SUCCESS; // tslint:disable-line no-reserved-keywords

    constructor(public payload: IPizza) {}
}

// Update pizza
export const UPDATE_PIZZA = '[Products] Update Pizzas';
export const UPDATE_PIZZA_FAIL = '[Products] Update Pizzas Fail';
export const UPDATE_PIZZA_SUCCESS = '[Products] Update Pizzas Success';

export class UpdatePizza implements Action {
    public readonly type: string = UPDATE_PIZZA; // tslint:disable-line no-reserved-keywords

    constructor(public payload: IPizza) {} // tslint:disable-line no-any
}

export class UpdatePizzaFail implements Action {
    public readonly type: string = UPDATE_PIZZA_FAIL; // tslint:disable-line no-reserved-keywords

    constructor(public payload: any) {} // tslint:disable-line no-any
}

export class UpdatePizzaSuccess implements Action {
    public readonly type: string = UPDATE_PIZZA_SUCCESS; // tslint:disable-line no-reserved-keywords

    constructor(public payload: IPizza) {}
}

// Remove pizza
export const REMOVE_PIZZA = '[Products] Remove Pizzas';
export const REMOVE_PIZZA_FAIL = '[Products] Remove Pizzas Fail';
export const REMOVE_PIZZA_SUCCESS = '[Products] Remove Pizzas Success';

export class RemovePizza implements Action {
    public readonly type: string = REMOVE_PIZZA; // tslint:disable-line no-reserved-keywords

    constructor(public payload: IPizza) {} // tslint:disable-line no-any
}

export class RemovePizzaFail implements Action {
    public readonly type: string = REMOVE_PIZZA_FAIL; // tslint:disable-line no-reserved-keywords

    constructor(public payload: any) {} // tslint:disable-line no-any
}

export class RemovePizzaSuccess implements Action {
    public readonly type: string = REMOVE_PIZZA_SUCCESS; // tslint:disable-line no-reserved-keywords

    constructor(public payload: IPizza) {}
}

export type PizzaAction =
    | LoadPizzas
    | LoadPizzasSuccess
    | LoadPizzasFail
    | CreatePizza
    | CreatePizzaSuccess
    | CreatePizzaFail
    | UpdatePizza
    | UpdatePizzaSuccess
    | UpdatePizzaFail
    | RemovePizza
    | RemovePizzaSuccess
    | RemovePizzaFail
;
