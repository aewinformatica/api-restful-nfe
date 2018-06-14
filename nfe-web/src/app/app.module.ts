import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {SMNUIModule, UiToolbarService} from "ng-smn-ui";

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {NfeModule} from "./nfe/nfe.module";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SMNUIModule,
    AppRoutingModule,
    NfeModule,
    HttpClientModule
  ],
  providers: [
    UiToolbarService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
