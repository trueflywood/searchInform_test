import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class BackendService {

    constructor(private http: Http) { }

    private getRequest(url): Observable<any> {
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    public getData(table: string): Observable<any> {
        let url = 'assets/data.json';
        let firstRun = localStorage.getItem('first_run');
        return (firstRun !== 'no') ? this.getRequest(url).map(res => {
            this.setEmployees(res.employees);
            this.setDepartments(res.departments);
            this.setPhotos(res.employees);
            localStorage.setItem('first_run', 'no');
            return res[table];
        }).catch(this.handleError) : Observable.of(JSON.parse(localStorage.getItem(table)));
    }

    getEmployees(): Observable<any> {
        return this.getData('employees');
    }
    setEmployees(data: any): any {
        localStorage.setItem('employees', JSON.stringify(data));
    }

    getDepartments(): Observable<any> {
        return this.getData('departments');
    }
    setDepartments(data: any): void {
        localStorage.setItem('departments', JSON.stringify(data));
    }

    getPhotos(): Observable<any> {
        return this.getData('photos');
    }
    setPhotos(data: any): any {
        localStorage.setItem('photos', JSON.stringify(data));
    }

    private handleError(error: any): Observable<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Observable.throw(error.json().error || 'Server error');
    }


}
