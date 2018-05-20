import {ITopping} from '@products/models/topping.model';
import {
    ToppingsAction,
    LOAD_TOPPINGS,
    LOAD_TOPPINGS_FAIL,
    LOAD_TOPPINGS_SUCCESS,
    LoadToppingsSuccess,
    VisualizeToppings,
    VISUALIZE_TOPPINGS
} from '@products/store/actions/toppings.action';

export type ToppingEntities = {[id: number]: ITopping};

export interface IToppingsState {
    entities: ToppingEntities;
    loaded: boolean;
    loading: boolean;
    selectedToppings: number[];
}

export const initialState: IToppingsState = {
    entities: {},
    loaded: false,
    loading: false,
    selectedToppings: []
};

export function toppingsReducer(
    state: IToppingsState = initialState,
    action: ToppingsAction
): IToppingsState {
    switch (action.type) {
        case VISUALIZE_TOPPINGS: {
            const selectedToppings = (<VisualizeToppings> action).payload;

            return {
                ...state,
                selectedToppings
            };
        }
        case LOAD_TOPPINGS: {
            return {
                ...state,
                loading: true
            };
        }
        case LOAD_TOPPINGS_SUCCESS: {
            let toppings = (<LoadToppingsSuccess> action).payload;

            const entities = toppings.reduce(
                (ent: ToppingEntities, topping: ITopping) => {
                    return {
                        ...ent,
                        [String(topping.id)]: topping
                    };
                }, {
                    ...state.entities

                });

            return {
                ...state,
                loaded: true,
                loading: false,
                entities
            };
        }
        case LOAD_TOPPINGS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        default:
    }

    return state;
}

export function getToppingsEntities(state: IToppingsState): ToppingEntities {
    return state.entities;
}

export function getToppingsLoading(state: IToppingsState): boolean {
    return state.loading;
}

export function getToppingsLoaded(state: IToppingsState): boolean {
    return state.loaded;
}

export function getSelectedToppings(state: IToppingsState): number[] {
    return state.selectedToppings;
}
