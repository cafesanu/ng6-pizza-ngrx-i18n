import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {IPizza} from '@products/models/pizza.model';
import 'rxjs/add/observable/throw'; // tslint:disable-line no-import-side-effect

@Injectable()
export class PizzasService {
    constructor(private http: HttpClient) {}

    public getPizzas(): Observable<IPizza[]> {
        return this.http
            .get<IPizza[]>(`/pizzas`)
            .pipe(catchError((error: any) => Observable.throw(error.json()))); // tslint:disable-line no-any
    }

    public createPizza(payload: IPizza): Observable<IPizza> {
        return this.http
            .post<IPizza>(`/pizzas`, payload)
            .pipe(catchError((error: any) => Observable.throw(error.json()))); // tslint:disable-line no-any
    }

    public updatePizza(payload: IPizza): Observable<IPizza> {
        return this.http
            .put<IPizza>(`/pizzas/${payload.id}`, payload)
            .pipe(catchError((error: any) => Observable.throw(error.json()))); // tslint:disable-line no-any
    }

    public removePizza(payload: IPizza): Observable<IPizza> {
        return this.http
            .delete(`/pizzas/${payload.id}`)
            .pipe(catchError((error: any) => Observable.throw(error.json()))); // tslint:disable-line no-any
    }
}
