import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {
    IProductsState,
    LoadPizzas,
    getPizzasLoaded,
    getPizzasEntities
} from '@products/store';
import {Observable} from 'rxjs/Observable';
import {map, tap, filter, take, switchMap} from 'rxjs/operators';
import {PizzaEntities} from '@products/store/reducers/pizzas.reducer';

@Injectable()
export class PizzaExistsGuards implements CanActivate {
    constructor(private store: Store<IProductsState>) {}

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => {
                let pizzaId = parseInt(route.params.pizzaId, 10);

                return this.hasPizza(pizzaId);
            })
        );
    }

    private hasPizza(pizzaId: number): Observable<boolean> {
        return this.store
            .select(getPizzasEntities)
            .pipe(
                map((entities: PizzaEntities) => Boolean(entities[pizzaId])),
                take(1)
            );
    }

    private checkStore(): Observable<boolean> {
        return this.store.select(getPizzasLoaded).pipe(
            tap((loaded: boolean) => {
                if (!loaded) {
                    this.store.dispatch(new LoadPizzas());
                }
            }),
            filter((loaded) => loaded),
            take(1)
        );
    }
}
