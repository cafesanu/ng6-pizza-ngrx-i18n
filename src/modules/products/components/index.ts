import {PizzaItemComponent} from '@products/components/pizza-item/pizza-item.component';
import {PizzaFormComponent} from '@products/components/pizza-form/pizza-form.component';
import {PizzaDisplayComponent} from '@products/components/pizza-display/pizza-display.component';
import {PizzaToppingsComponent} from '@products/components/pizza-toppings/pizza-toppings.component';

export const components = [
    PizzaItemComponent,
    PizzaFormComponent,
    PizzaDisplayComponent,
    PizzaToppingsComponent
];

export * from './pizza-item/pizza-item.component';
export * from './pizza-form/pizza-form.component';
export * from './pizza-display/pizza-display.component';
export * from './pizza-toppings/pizza-toppings.component';
