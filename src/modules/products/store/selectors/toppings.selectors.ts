import * as fromToppings from '@products/store/reducers/toppings.reducer';
import {getProductState, IProductsState} from '@products/store/reducers';
import {createSelector} from '@ngrx/store';

export const getToppingsState = createSelector(
    getProductState,
    (state: IProductsState) => state.toppings
);

export const getToppingsEntities = createSelector(
    getToppingsState,
    fromToppings.getToppingsEntities
);

export const getToppingsLoaded = createSelector(
    getToppingsState,
    fromToppings.getToppingsLoaded
);

export const getAllToppings = createSelector(
    getToppingsEntities,
    (entities) => Object.keys(entities).map((id: string) => entities[parseInt(id, 10)])
);

export const getToppingsLoading = createSelector(
    getToppingsState,
    fromToppings.getToppingsLoading
);

export const getSelectedToppings = createSelector(
    getToppingsState,
    fromToppings.getSelectedToppings
);
