import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {IPizza} from '@products/models/pizza.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-pizza-item',
    templateUrl: './pizza-item.component.html',
    styleUrls: ['./pizza-item.component.scss']
})
export class PizzaItemComponent {
    @Input() public pizza: IPizza = {};
}
