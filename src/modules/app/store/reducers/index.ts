import {RouterReducerState, routerReducer, RouterStateSerializer} from '@ngrx/router-store';
import {Params, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

export interface IRouterUrlState {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface IState {
    routerReducer: RouterReducerState<IRouterUrlState>;
}

export const reducers: ActionReducerMap<IState> = {
    routerReducer: routerReducer
};

export const getRouterState = createFeatureSelector<RouterReducerState<IRouterUrlState>>('routerReducer');

export class CustomSerializer implements RouterStateSerializer<IRouterUrlState> {
    public serialize(routerState: RouterStateSnapshot): IRouterUrlState {
        const {url}: RouterStateSnapshot = routerState;
        const {queryParams}: Params = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }

        const {params}: Params = state;

        return {
            url,
            queryParams,
            params
        };
    }
}
