import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmModal} from "../modal/confirm/confirm.component";
import {overlayConfigFactory, Modal} from "angular2-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

    data: any[] = [];
    departments: any[] = [];
    photos: any[] = [];
    id: number;
    sub: any;
    hideDepartments: boolean ;

    constructor(private backendServise: BackendService, private route: ActivatedRoute, private router: Router, public modal: Modal) {
        this.backendServise.getDepartments().subscribe((res) => {
            this.departments = res;
        });
        this.backendServise.getPhotos().subscribe((res) => {
            this.photos = res;
        });

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {

            if (params['id']) {
                this.id = +params['id'];
                this.hideDepartments = true;

                let index = this.departments.findIndex((item) => {
                    return item.id == this.id;
                });
                if (index === -1) {
                    this.router.navigate(['error-404']);
                }
            }
            // In a real app: dispatch action to load the details here.
        });
        this.backendServise.getEmployees().subscribe((res) => {

            this.data = res.map((item)=> {

                let indexDep = this.departments.findIndex((itemDep) => {
                    return itemDep.id == item.department;
                });
                if (indexDep !== -1) {
                    item.departmentText = this.departments[indexDep].name;
                } else {
                    item.departmentText = '';
                }

               let indexPhoto = this.photos.findIndex((itemDep) => {
                    return itemDep.id == item.photo;
                });



                 if (indexPhoto !== -1) {
                    item.photoUrl = this.photos[indexPhoto].data;

                 } else {
                    item.photoUrl = '';
                }
                return item;
            });

            if (this.id) {
                this.data = this.data.filter((item) => {
                    return item.department == this.id;
                });
            }
        });

    }

    toDepartment(id: number): void {
        this.router.navigate(['departments', id, 'employees']);
    }

    onDelete(id: number): void {

        let win = this.modal.open(ConfirmModal, overlayConfigFactory({
            isBlocking: false,
            title: 'Удаление сотрудника',
            text: 'Сотрудник будет удален. Продолжить?'
        }, BSModalContext));

        win.then((res) => {
            res.result.then((res2) => {

                let index = this.data.findIndex((item) => {
                    return item.id === id;
                });

                this.data.splice(index, 1);

                this.backendServise.setEmployees(this.data);

            }).catch(() => {
            });
        }).catch(() => {
        });

    }
    onEdit(id:number): void {
        this.router.navigate(['employees', id ]);
    }

    onAdd(): void {
        this.router.navigate(['employees', 'new' ]);
    }

}
