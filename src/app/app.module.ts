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
import {Ng2BreadcrumbModule,
    BreadcrumbService
}                               from 'ng2-breadcrumb/ng2-breadcrumb';
import { EmployeesComponent }   from './employees/employees.component';
import {BackendService}         from "./backend/backend.service";
import {DataTableModule}        from "angular2-datatable";
import {DepartmentsFilterPipe}  from "./departments/departments.datafilterpipe";
import {EmployeesFilterPipe}    from "./employees/employees.datafilterpipe";
import { ConfirmModal }         from './modal/confirm/confirm.component';
import {ModalModule}            from "angular2-modal";
import {BootstrapModalModule}   from "angular2-modal/plugins/bootstrap";
import { EditDepartmentModal } from './modal/edit-department/edit-department.component';

@NgModule({
    declarations: [
        AppComponent,
        DepartmentsComponent,
        PageNotFoundComponent,
        EmployeesComponent,
        DepartmentsFilterPipe,
        EmployeesFilterPipe,
        ConfirmModal,
        EditDepartmentModal
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AlertModule.forRoot(),
        AppRoutingModule,
        SidebarModule,
        Ng2BreadcrumbModule,
        DataTableModule,
        BrowserModule,
        ModalModule.forRoot(),
        BootstrapModalModule
    ],
    providers: [BreadcrumbService, BackendService],
    bootstrap: [AppComponent],
    entryComponents: [ ConfirmModal, EditDepartmentModal ]
})
export class AppModule {
}
