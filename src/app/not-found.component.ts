import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "./backend/backend.service";

@Component({
    template:   '<div class="app flex-row align-items-center">' +
                    '<div class="container" >' +
                        '<div class = "row justify-content-center" >' +
                            '<div class = "col-md-6" >' +
                                '<div class = "clearfix" >' +
                                    '<h1 class = "float-left display-3 mr-2" > 404 </h1>' +
                                    '<h4 class = "pt-1" > Ой! Вы потерялись.</h4> ' +
                                    '<p class="text-muted"> Страницу которую вы хотите найти не существует  </p>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
})
export class PageNotFoundComponent {
    departments: any[];
    constructor(private route: ActivatedRoute, private _router: Router, private backendServise: BackendService) {
        let url = _router.url;

        let resultDep = url.match(/^\/departments\/([0-9]+)$/i);
        if (resultDep) {
            let id = resultDep[1];
            if (id) {
                // todo add cearch
                this.backendServise.getDepartments().subscribe((res) => {
                    this.departments = res;
                    let index = this.departments.findIndex((item) => {
                        return item.id == id;
                    });
                    if(index !== -1) {
                        _router.navigate(['departments', id, 'employees'], {replaceUrl: true});
                    } else {
                        _router.navigate(['error-404'], {replaceUrl: true});
                    }
                });
            } else {
                _router.navigate(['error-404'], {replaceUrl: true});
            }
        }
    }
}
