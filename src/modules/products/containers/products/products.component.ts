import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {IPizza} from '@products/models/pizza.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromStore from '@products/store';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    public pizzas$!: Observable<IPizza[]>;

    constructor(private store: Store<fromStore.IProductsState>) {}

    public ngOnInit(): void {
        this.pizzas$ = this.store.select(fromStore.getAllPizzas);
    }
}
