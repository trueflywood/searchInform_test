import {Component,
    AnimationTransitionEvent,
    OnInit
}                                               from '@angular/core';
import {BreadcrumbService}                      from 'ng2-breadcrumb/ng2-breadcrumb';
import {Router}                                 from "@angular/router";
import {BackendService} from "./backend/backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _opened: boolean = false;
    private _modeNum: number = 0; // 0
    private _positionNum: number = 0; // 0
    private _closeOnClickOutside: boolean = true;
    private _showBackdrop: boolean = true;
    private _animate: boolean = true;
    private _trapFocus: boolean = true;
    private _autoFocus: boolean = false;
    private _keyClose: boolean = false;

    private _MODES: Array<string> = ['over', 'push', 'dock'];
    private _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];
    departments: any[] = [];
    employees: any[] = [];

    constructor(private breadcrumbService: BreadcrumbService, private router: Router, private backendServise: BackendService) {
        this.backendServise.getDepartments().subscribe((res) => {
            this.departments = res;
        });
        this.backendServise.getEmployees().subscribe((res) => {
            this.employees = res;
        });
    }

    ngOnInit():void {
        this.breadcrumbService.addFriendlyNameForRoute('/departments', 'Отделы');
        this.breadcrumbService.addFriendlyNameForRoute('/employees', 'Сотрудники');
        this.breadcrumbService.addFriendlyNameForRoute('/error-404', 'Страницы не существует');
        this.breadcrumbService.addFriendlyNameForRoute('/**', 'Страницы не существует');
        this.breadcrumbService.addCallbackForRouteRegex('^/departments/([0-9]+)$', (id) => {
            let department: any = {name: 'rgerg'};

            if (this.departments.length) {
                department = this.departments.find((item) => {
                    return item.id == id
                });
            }
            return <string> department.name;
        });
        this.breadcrumbService.addCallbackForRouteRegex('^/employees/([0-9]+|new)$', (id) => {
            let employee: any = {name: 'Новый'};
            if (this.employees.length && id !== 'new') {
                employee = this.employees.find((item) => {
                    return item.id == id
                });
            }
            return <string> employee.name;
        });

        this.breadcrumbService.addCallbackForRouteRegex('^/departments/([0-9]{3})/employees$', () => {return 'Список сотрудников';});
    }

    private _toggleOpened(): void {
        this._opened = !this._opened;
    }

    private _toggleMode(): void {
        this._modeNum++;

        if (this._modeNum === this._MODES.length) {
            this._modeNum = 0;
        }
    }

    private _togglePosition(): void {
        this._positionNum++;

        if (this._positionNum === this._POSITIONS.length) {
            this._positionNum = 0;
        }
    }








    departmentsOpen(): void {
         this.router.navigate(['departments']);
         this._opened = false;
    }
    employeesOpen(): void {
         this.router.navigate(['employees']);
        this._opened = false;
    }
}
