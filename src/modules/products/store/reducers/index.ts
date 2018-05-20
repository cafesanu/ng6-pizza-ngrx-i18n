import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {pizzasReducer, IPizzaState} from '@products/store/reducers/pizzas.reducer';
import {toppingsReducer, IToppingsState} from '@products/store/reducers/toppings.reducer';

export interface IProductsState {
    pizzas: IPizzaState;
    toppings: IToppingsState;
}

export const reducers: ActionReducerMap<IProductsState> = {
    pizzas: pizzasReducer,
    toppings: toppingsReducer
};

export const getProductState = createFeatureSelector<IProductsState>(
    'products'
);
