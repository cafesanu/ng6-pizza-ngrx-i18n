import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from '@app/containers/app.component';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from '@app/app.route';
import {StoreModule, MetaReducer} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {reducers, effects, CustomSerializer} from '@app/store';
import {StoreRouterConnectingModule, RouterStateSerializer} from '@ngrx/router-store';

// this would be done dynamically with webpack for builds
const environment = {
    development: true,
    production: false
};

// tslint:disable-next-line no-any
export const metaReducers: MetaReducer<any>[] = !environment.production
    ? [storeFreeze]
    : [];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(APP_ROUTES),
        StoreModule.forRoot(reducers, {
            metaReducers
        }),
        EffectsModule.forRoot(effects),
        StoreRouterConnectingModule,
        environment.development ? StoreDevtoolsModule.instrument() : [],
        BrowserAnimationsModule
    ],
    providers: [{
        provide: RouterStateSerializer,
        useClass: CustomSerializer
    }],
    bootstrap: [AppComponent]
})
export class AppModule {}// tslint:disable-line no-unnecessary-class
