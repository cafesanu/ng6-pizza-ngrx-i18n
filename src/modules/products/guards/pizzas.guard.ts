import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {IProductsState, LoadPizzas, getPizzasLoaded} from '@products/store';
import {tap, filter, take, switchMap, catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class PizzasGuard implements CanActivate {
    constructor(
        private store: Store<IProductsState>
    ) {}

    public canActivate(): Observable<boolean> {
        return this.checkStore()
            .pipe(
                switchMap((() => of(true))),
                catchError(() => of(false))
            );
    }

    private checkStore(): Observable<boolean> {
        return this.store.select(getPizzasLoaded)
            .pipe(
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
