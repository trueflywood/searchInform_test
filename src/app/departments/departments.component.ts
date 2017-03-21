import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {Modal, overlayConfigFactory} from "angular2-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {ConfirmModal} from "../modal/confirm/confirm.component";
import {Router, ActivatedRoute} from "@angular/router";
import {EditDepartmentModal} from "../modal/edit-department/edit-department.component";

@Component({
    selector: 'app-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

    data: any[] = [];
    employees: any[] = [];

    constructor(private backendServise: BackendService, public modal: Modal, private router: Router) {

    }

    ngOnInit() {
        this.backendServise.getDepartments().subscribe((res) => {
            this.data = res;
        });
        this.backendServise.getEmployees().subscribe((res) => {
            this.employees = res;
        });

    }

    onEdit(id: number): void {
        let index = this.data.findIndex((item) => {
            return item.id === id
        });


        let win = this.modal.open(EditDepartmentModal, overlayConfigFactory({
            isBlocking: false,
            title: 'Изменение название отдела',
            text: 'Введите название отдела',
            value: this.data[index].name
        }, BSModalContext));

        win.then((res) => {
            res.result.then((res2) => {
                this.data[index].name = res2;
                this.backendServise.setDepartments(this.data);

            }).catch(() => {
            });
        }).catch(() => {
        });
    }

    onDelete(id: number): void {

        let win = this.modal.open(ConfirmModal, overlayConfigFactory({
            isBlocking: false,
            title: 'Удаление отдела',
            text: 'При удалении отдела будут удалены все сотрудники этого отдела. Продолжить?'
        }, BSModalContext));

        win.then((res) => {
            res.result.then((res2) => {

                let index = this.data.findIndex((item) => {
                    return item.id === id;
                });

                this.data.splice(index, 1);
                this.employees = this.employees.filter((item) => {
                    return item.department != id;
                });


                this.backendServise.setDepartments(this.data);
                this.backendServise.setEmployees(this.employees);

            }).catch(() => {
            });
        }).catch(() => {
        });

    }

    onShow(id: number): void {
        this.router.navigate(['departments', id, 'employees']);
    }

    onAdd(): void {
        let maximum: number = 0;
        if (this.data.length) {
            maximum = Math.max.apply(Math, this.data.map(function (o) {
                return o.id;
            }));
        }

        let win = this.modal.open(EditDepartmentModal, overlayConfigFactory({
            isBlocking: false,
            title: 'Добавление отдела',
            text: 'Введите название отдела',
            value: ''
        }, BSModalContext));

        win.then((res) => {
            res.result.then((res2) => {

                this.data.push({id: maximum+1, name: res2});
                this.backendServise.setDepartments(this.data);

            }).catch(() => {});
        }).catch(() => {});

    }
}
