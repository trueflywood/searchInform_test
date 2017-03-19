import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class BackendService {

    constructor(private http: Http) { }

    private getRequest(url): Observable<any> {
        // let body = JSON.stringify(property);
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private getData(table: string): Observable<any> {
        let url = 'assets/data.json';
        let firstRun = localStorage.getItem('first_run');
        let ans: any = [];
        if ( firstRun !== 'no') {
            this.getRequest(url).subscribe((res) => {
                localStorage.setItem('employees', JSON.stringify(res.employees));
                localStorage.setItem('departments', JSON.stringify(res.departments));
                localStorage.setItem('photos', JSON.stringify(res.photos));
                localStorage.setItem('first_run', 'no');
                ans = res[table];

            }, this.handleError);
        } else {
            ans = JSON.parse(localStorage.getItem(table));
        }
        return Observable.of(ans);
    }

    getEmployees(): Observable<any> {
        return this.getData('employees');
    }
    getDepartments(): Observable<any> {
        return this.getData('departments');
    }
    getPhotos(): Observable<any> {
        return this.getData('photos');
    }

    private handleError(error: any): Observable<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Observable.throw(error.json().error || 'Server error');
    }


}
