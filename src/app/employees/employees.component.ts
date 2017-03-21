import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {ActivatedRoute} from "@angular/router";

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

    constructor(private backendServise: BackendService, private route: ActivatedRoute) {
        console.log('constr');
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
                this.id = +params['id']; // (+) converts string 'id' to a number
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
            console.log(this.data);
        });

    }

}
