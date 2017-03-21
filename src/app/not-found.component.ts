import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  template: '<h2>Page not found</h2>'
})
export class PageNotFoundComponent {
    constructor(private route:ActivatedRoute, private _router: Router ) {
        //console.log(route);
        console.log(_router.url);

        let url =_router.url;
        let result = url.match( /^\/departments\/([0-9]+)$/i );
        console.log('result');
        console.log(result);

        let id = result[1];
        if(id) {
            _router.navigate(['departments', id,'employees'], { replaceUrl: true });
        }
    }
}
