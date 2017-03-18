/**
 * Created by flywood on 18.03.17.
 */
import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { PageNotFoundComponent }    from './not-found.component';
import {DepartmentsComponent}       from "./departments/departments.component";

const appRoutes: Routes = [
    { path: '',   redirectTo: 'departments', pathMatch: 'full' },
    {
        path: 'departments',
        component: DepartmentsComponent
    },
    { path: '**', component: PageNotFoundComponent }

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule { }
