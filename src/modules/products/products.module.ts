import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {reducers, effects} from '@products/store';
import {EffectsModule} from '@ngrx/effects';

// components
import * as fromComponents from '@products/components';

// containers
import * as fromContainers from '@products/containers';

// services
import * as fromServices from '@products/services';

// routes
import {PRODUCTS_ROUTES} from '@products/products.route';

// guards
import * as fromGuards from '@products/guards';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(PRODUCTS_ROUTES),
        StoreModule.forFeature('products', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [...fromServices.services, ...fromGuards.guards],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}// tslint:disable-line no-unnecessary-class
