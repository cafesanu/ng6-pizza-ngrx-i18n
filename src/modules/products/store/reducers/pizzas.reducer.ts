import {IPizza} from '@products/models/pizza.model';
import {
    LOAD_PIZZAS_FAIL,
    LOAD_PIZZAS_SUCCESS, PizzaAction,
    LOAD_PIZZAS,
    CREATE_PIZZA_SUCCESS,
    UPDATE_PIZZA_SUCCESS,
    LoadPizzasSuccess,
    CreatePizzaSuccess,
    REMOVE_PIZZA_SUCCESS,
    RemovePizzaSuccess
} from '@products/store/actions/pizzas.action';

export type PizzaEntities = {[id: number]: IPizza};

export interface IPizzaState {
    entities: PizzaEntities;
    loaded: boolean;
    loading: boolean;
}

export const initialState: IPizzaState = {
    entities: {},
    loaded: false,
    loading: false
};

export function pizzasReducer(state: IPizzaState = initialState, action: PizzaAction): IPizzaState {
    switch (action.type) {
        case LOAD_PIZZAS: {
            return {
                ...state,
                loading: true
            };
        }
        case LOAD_PIZZAS_SUCCESS: {
            const pizzas = (<LoadPizzasSuccess> action).payload;

            const entities = pizzas.reduce(
                (ent: PizzaEntities, pizza: IPizza) => {
                    return {
                        ...ent,
                        [String(pizza.id)]: pizza
                    };
                }, {
                    ...state.entities

                });

            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            };
        }
        case LOAD_PIZZAS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        case UPDATE_PIZZA_SUCCESS:
        case CREATE_PIZZA_SUCCESS: {
            const pizza = (<CreatePizzaSuccess> action).payload;
            const entities = {
                ...state.entities,
                [String(pizza.id)]: pizza
            };

            return {
                ...state,
                entities
            };
        }
        case REMOVE_PIZZA_SUCCESS: {
            const pizza = (<RemovePizzaSuccess> action).payload;
            // Immutably, remove item... es6 magic
            const {[String(pizza.id)]: removed, ...entities}: PizzaEntities = state.entities; // tslint:disable-line no-unused

            return {
                ...state,
                entities
            };
        }
        default:
    }

    return state;
}

export function getPizzasEntities(state: IPizzaState): PizzaEntities {
    return state.entities;
}

export function getPizzasLoading(state: IPizzaState): boolean {
    return state.loading;
}

export function getPizzasLoaded(state: IPizzaState): boolean {
    return state.loaded;
}
