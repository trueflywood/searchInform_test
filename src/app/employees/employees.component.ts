import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend/backend.service";

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

    data: any[] = [];
    departments: any[] = [];
    photos: any[] = [];

    constructor(private backendServise: BackendService) {
        console.log('constr');
        this.backendServise.getDepartments().subscribe((res) => {
            this.departments = res;
        });
        this.backendServise.getPhotos().subscribe((res) => {
            this.photos = res;
        });

    }

    ngOnInit() {
        this.backendServise.getEmployees().subscribe((res) => {

            this.data = res.map((item)=> {
                console.log('item');
                console.log(item);
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

                console.log('indexPhoto -' + item.id );
                console.log(indexPhoto);

                 if (indexPhoto !== -1) {
                    item.photoUrl = this.photos[indexPhoto].data;
                     console.log('item.photoUrl');
                     console.log(item.photoUrl);
                 } else {
                    item.photoUrl = '';
                }
                console.log('item');
                console.log(item);
                return item;
            });
            console.log(this.data);
        });

    }

}
