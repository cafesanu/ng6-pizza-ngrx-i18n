import {Routes} from '@angular/router';

// routes
export const APP_ROUTES: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'products'},
    {
        path: 'products',
        loadChildren: '../products/products.module#ProductsModule'
    }
];
