import {createSelector} from '@ngrx/store';
import {getProductState, IProductsState} from '@products/store/reducers';
import * as fromPizzas from '@products/store/reducers/pizzas.reducer';
import * as fromToppings from '@products/store/selectors/toppings.selectors';
import {getRouterState} from '@app/store';
import {IPizza} from '@products/models/pizza.model';
import {ITopping} from '@products/models/topping.model';

export const getPizzaState = createSelector(
    getProductState,
    (state: IProductsState) => state.pizzas
);

export const getPizzasEntities = createSelector(
    getPizzaState,
    fromPizzas.getPizzasEntities
);

export const getPizzasLoaded = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoaded
);

export const getAllPizzas = createSelector(
    getPizzasEntities,
    (entities) => Object.keys(entities).map((id: string) => entities[parseInt(id, 10)])
);

export const getSelectedPizza = createSelector(
    getPizzasEntities,
    getRouterState,
    (entities, router): IPizza => {
        return router.state && entities[router.state.params.pizzaId];
    }
);

export const getPizzaVisualized = createSelector(
    getSelectedPizza,
    fromToppings.getToppingsEntities,
    fromToppings.getSelectedToppings,
    (pizza, toppingEntities, selectedToppings): IPizza => {
        const toppings: ITopping[] = selectedToppings.map((id) => toppingEntities[id]);

        return {
            ...pizza,
            toppings
        };
    }
);

export const getPizzassLoading = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoading
);
