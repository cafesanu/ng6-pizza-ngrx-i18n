import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as pizzaActions from '@products/store/actions';
import {map, switchMap, catchError} from 'rxjs/operators';
import * as fromServices from '@products/services';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs';
import {IPizza} from '@products/models/pizza.model';
import {Go} from '@app/store';

@Injectable()
export class PizzasEffects {
    @Effect()
    public loadPizzas$: Observable<pizzaActions.LoadPizzasSuccess | pizzaActions.LoadPizzasFail>;

    @Effect()
    public createPizza$: Observable<pizzaActions.CreatePizzaSuccess | pizzaActions.CreatePizzaFail>;

    @Effect()
    public createPizzaSuccess$: Observable<Go>;

    @Effect()
    public updatePizza$: Observable<pizzaActions.UpdatePizzaSuccess | pizzaActions.UpdatePizzaFail>;

    @Effect()
    public removePizza$: Observable<pizzaActions.RemovePizzaSuccess | pizzaActions.RemovePizzaFail>;

    @Effect()
    public removeUpdatePizzaSucess$: Observable<Go>;

    constructor(
        private actions$: Actions,
        private pizzaService: fromServices.PizzasService
    ) {
        this.loadPizzas$ = this.actions$
            .ofType(pizzaActions.LOAD_PIZZAS)
            .pipe(
                switchMap(() => {
                    return this.pizzaService
                        .getPizzas()
                        .pipe(
                            map((pizzas) => new pizzaActions.LoadPizzasSuccess(pizzas)),
                            catchError((error) => of(new pizzaActions.LoadPizzasFail(error)))
                        );
                })
            );

        this.createPizza$ = this.actions$
            .ofType(pizzaActions.CREATE_PIZZA)
            .pipe(
                map((action: pizzaActions.CreatePizza) => action.payload),
                switchMap((pizza) => {
                    return this.pizzaService
                        .createPizza(pizza)
                        .pipe(
                            map((newPizza) => new pizzaActions.CreatePizzaSuccess(newPizza)),
                            catchError((error) => of(new pizzaActions.CreatePizzaFail(error)))
                        );
                })
            );

        this.createPizzaSuccess$ = this.actions$
            .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
            .pipe(
                map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
                map((pizza: IPizza) => {
                    return new Go({
                        path: ['/products', pizza.id]
                    });
                })
            );

        this.updatePizza$ = this.actions$
            .ofType(pizzaActions.UPDATE_PIZZA)
            .pipe(
                map((action: pizzaActions.UpdatePizza) => action.payload),
                switchMap((pizza) => {
                    return this.pizzaService
                        .updatePizza(pizza)
                        .pipe(
                            map((updatedPizza) => new pizzaActions.UpdatePizzaSuccess(updatedPizza)),
                            catchError((error) => of(new pizzaActions.UpdatePizzaFail(error)))
                        );
                })
            );

        this.removePizza$ = this.actions$
            .ofType(pizzaActions.REMOVE_PIZZA)
            .pipe(
                map((action: pizzaActions.RemovePizza) => action.payload),
                switchMap((pizza) => {
                    return this.pizzaService
                        .removePizza(pizza)
                        .pipe(
                            map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
                            catchError((error) => of(new pizzaActions.RemovePizzaFail(error)))
                        );
                })
            );

        this.removeUpdatePizzaSucess$ = this.actions$
            .ofType(
                pizzaActions.UPDATE_PIZZA_SUCCESS,
                pizzaActions.REMOVE_PIZZA_SUCCESS
            )
            .pipe(
                map(() => new Go({
                    path: ['/products']
                }))
            );
    }
}
