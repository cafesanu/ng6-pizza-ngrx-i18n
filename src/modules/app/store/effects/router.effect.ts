import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {GO, Go, IRouterPayload, BACK, FORWARD} from '@app/store/actions/router.action';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

@Injectable()
export class RouterEffects {
    @Effect({dispatch: false})
    public navigate$: Observable<IRouterPayload>;

    @Effect({dispatch: false})
    public navigateBack$: Observable<Action>;

    @Effect({dispatch: false})
    public navigateForward$: Observable<Action>;

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) {
        this.navigate$ = this.actions$
            .ofType(GO)
            .pipe(
                map((action: Go) => action.payload),
                tap(({path, query: queryParams, extras}) => {
                    this.router.navigate(path, {
                        queryParams, ...extras
                    });
                })
            );

        this.navigateBack$ = this.actions$
            .ofType(BACK)
            .pipe(tap(() => this.location.back()));

        this.navigateForward$ = this.actions$
            .ofType(FORWARD)
            .pipe(tap(() => this.location.forward()));
    }
}
