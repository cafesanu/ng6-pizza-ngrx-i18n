import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ITopping} from '@products/models/topping.model';

import 'rxjs/add/observable/throw'; // tslint:disable-line no-import-side-effect

@Injectable()
export class ToppingsService {
    constructor(private http: HttpClient) {}

    public getToppings(): Observable<ITopping[]> {
        return this.http
      .get<ITopping[]>(`/toppings`)
      .pipe(catchError((error: any) => Observable.throw(error.json()))); // tslint:disable-line no-any
    }
}
