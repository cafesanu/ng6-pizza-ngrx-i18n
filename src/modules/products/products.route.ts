import {Routes} from '@angular/router';

import * as fromContainers from '@products/containers';

// guards
import * as fromGuards from '@products/guards';

// routes
export const PRODUCTS_ROUTES: Routes = [
    {
        path: '',
        canActivate: [
            fromGuards.PizzasGuard
        ],
        component: fromContainers.ProductsComponent
    },
    {
        path: 'new',
        canActivate: [
            fromGuards.PizzasGuard,
            fromGuards.ToppingsGuard
        ],
        component: fromContainers.ProductItemComponent
    },
    {
        path: ':pizzaId',
        canActivate: [
            fromGuards.PizzaExistsGuards,
            fromGuards.ToppingsGuard
        ],
        component: fromContainers.ProductItemComponent
    }
];
