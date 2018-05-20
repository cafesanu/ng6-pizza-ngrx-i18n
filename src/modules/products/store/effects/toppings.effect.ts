import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {ToppingsService} from '@products/services';
import * as toppingsActions from '@products/store/actions';
import {map, switchMap, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ToppingsEffects {
    @Effect()
    public loadToppings$: Observable<toppingsActions.LoadToppingsSuccess | toppingsActions.LoadPizzasFail>;

    constructor(
        private actions$: Actions,
        private toppingsService: ToppingsService
    ) {
        this.loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
            switchMap(() => {
                return this.toppingsService
                    .getToppings()
                    .pipe(
                        map((toppings) => new toppingsActions.LoadToppingsSuccess(toppings)),
                        catchError((error) => of(new toppingsActions.LoadPizzasFail(error)))
                    );
            })
        );
    }

}
