/**
 * Created by flywood on 18.03.17.
 */
import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { PageNotFoundComponent }    from './not-found.component';
import {DepartmentsComponent}       from "./departments/departments.component";
import {EmployeesComponent} from "./employees/employees.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'departments',
        pathMatch: 'full'
    }, {
        path: 'departments',
        component: DepartmentsComponent
    }, {
        path: 'employees',
        component: EmployeesComponent
    }, {
        path: 'departments/:id/employees',
        component: EmployeesComponent
    }, {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule { }
