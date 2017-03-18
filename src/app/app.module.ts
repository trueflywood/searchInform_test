import {BrowserModule}          from '@angular/platform-browser';
import {NgModule}               from '@angular/core';
import {FormsModule}            from '@angular/forms';
import {HttpModule}             from '@angular/http';

import {AppComponent}           from './app.component';
import {AlertModule}            from "ng2-bootstrap";
import {SidebarModule}          from "ng-sidebar";
import {DepartmentsComponent}   from './departments/departments.component';
import {AppRoutingModule}       from './app-routing.module';
import {PageNotFoundComponent}  from "./not-found.component";

@NgModule({
    declarations: [
        AppComponent,
        DepartmentsComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AlertModule.forRoot(),
        AppRoutingModule,
        SidebarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
