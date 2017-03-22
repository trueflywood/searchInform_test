import {Component, OnInit} from '@angular/core';
import {BackendService} from "../../backend/backend.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
    photoUrl: string = '';
    id: string;
    sub: any;
    index: number = -1;

    employees: any[] = [];
    departments: any[] = [];
    photos: any[] = [];
    selectDepartment: any;


    employee: any = {
        id: 0,
        name: '',
        department: 0,
        photo: 0,
        phone: ''
    };

    constructor(private backendServise: BackendService, private route: ActivatedRoute, private router: Router) {
        this.backendServise.getDepartments().subscribe((res) => {
            this.departments = res;
            this.departments.unshift({id: 0, name: 'Выберите отдел'});
            this.selectDepartment = this.departments[0];
        });
        this.backendServise.getPhotos().subscribe((res) => {
            this.photos = res;
        });

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.id = params['id'];
                if (this.id !== 'new') {
                    this.backendServise.getEmployees().subscribe((res) => {
                        this.employees = res;

                        this.index = this.employees.findIndex((item) => {
                            return item.id == this.id;
                        });

                        if (this.index !== -1) {
                            this.employee = this.employees[this.index];

                            let photoIndex = this.photos.findIndex((item) => {
                                return item.id == this.employee.photo;
                            });

                            this.photoUrl = this.photos[photoIndex].data

                            let departmentIndex = this.departments.findIndex((item) => {
                                return item.id == this.employee.department;
                            });
                            this.selectDepartment = this.departments[departmentIndex];

                        } else {
                            this.router.navigate(['error-404']);
                        }
                    });
                }
            }
        });
    }

    previewFile(e): void {
        let reader = new FileReader();

        reader.onloadend =  () => {
            let img = document.createElement("img");
            this.resize(img, 48, 48, (resized_jpeg, before, after)=>{
                this.photoUrl = resized_jpeg;
            });
            img.src = reader.result;
        };

        if (e.srcElement.files[0]) {
            reader.readAsDataURL(e.srcElement.files[0]);
        } else {

        }

    }



    resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, callback){
        return img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            let canvas = document.createElement("canvas");

            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0,  width, height);

            let dataUrl = canvas.toDataURL('image/jpeg');

            callback(dataUrl, img.src.length, dataUrl.length);
        };
    }

    onSave(): void {

        if (this.index !== -1) {
            this.employee.department = this.selectDepartment.id;
            this.employees[this.index] = this.employee;

           let photoIndex = this.photos.findIndex((item) => {
              return item.data === this.photoUrl;
           });

            if(photoIndex !== -1) {
                this.employees[this.index].photo = this.photos[photoIndex].id;
            } else {
               this.employees[this.index].photo = this.addPhoto();
           }

            this.backendServise.setEmployees(this.employees);
            this.router.navigate(['departments', this.selectDepartment.id, 'employees']);
        } else {
            let maximum: number = 0;

            this.backendServise.getEmployees().subscribe((res) => {
                this.employees = res;
                if (this.employees.length) {
                    maximum = Math.max.apply(Math, this.employees.map(function (o) {
                        return o.id;
                    }));
                }
                this.employee.id = maximum + 1;
                this.employee.department = this.selectDepartment.id;
                this.employee.photo = this.addPhoto();
                this.employees.push(this.employee);
                this.backendServise.setEmployees(this.employees);
                this.router.navigate(['departments', this.selectDepartment.id, 'employees']);
            });
        }
    }
    addPhoto(): number {
        let maximum: number = 0;
        if (this.photos.length) {
            maximum = Math.max.apply(Math, this.photos.map(function (o) {
                return o.id;
            }));
        }
        this.photos.push({id: ++maximum, data: this.photoUrl});
        this.backendServise.setPhotos(this.photos);

        return maximum;
    }
}
