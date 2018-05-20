import {Component, ChangeDetectionStrategy} from '@angular/core';
import {IPizza} from '@products/models/pizza.model';
import {ITopping} from '@products/models/topping.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {IProductsState, getSelectedPizza, getAllToppings, VisualizeToppings, getPizzaVisualized, CreatePizza, UpdatePizza, RemovePizza} from '@products/store';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-product-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
    public pizza$: Observable<IPizza>;
    public toppings$: Observable<ITopping[]>;
    public visualize$: Observable<IPizza>;

    constructor(
        private store: Store<IProductsState>
    ) {
        this.pizza$ = <Observable<IPizza>> this.store.select(getSelectedPizza)
            .pipe((tap((pizza: IPizza = {}) => {
                let toppings = pizza && pizza.toppings
                    ? <number[]> pizza.toppings.map((topping) => topping.id)
                    : [];

                this.store.dispatch(new VisualizeToppings(toppings));
            })));
        this.toppings$ = this.store.select(getAllToppings);
        this.visualize$ = this.store.select(getPizzaVisualized);
    }

    public onSelect(event: number[]): void {
        this.store.dispatch(new VisualizeToppings(event));
    }

    public onCreate(event: IPizza): void {
        this.store.dispatch(new CreatePizza(event));
    }

    public onUpdate(event: IPizza): void {
        this.store.dispatch(new UpdatePizza(event));
    }

    public onRemove(event: IPizza): void {
        this.store.dispatch(new RemovePizza(event));
    }
}
