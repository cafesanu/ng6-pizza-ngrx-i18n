import {Action} from '@ngrx/store';
import {NavigationExtras} from '@angular/router';

export type IRouterPayload = {
    path: any[]; // tslint:disable-line no-any
    query?: object;
    extras?: NavigationExtras;
};
// Load pizza
export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export class Go implements Action {
    public readonly type: string = GO; // tslint:disable-line no-reserved-keywords

    constructor(
        public payload: IRouterPayload
    ) {}
}

export class Back implements Action {
    public readonly type: string = BACK; // tslint:disable-line no-reserved-keywords
}

export class Forward implements Action {
    public readonly type: string = FORWARD; // tslint:disable-line no-reserved-keywords

}

export type RouterActions =
    | Go
    | Back
    | Forward;
