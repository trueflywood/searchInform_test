import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  template: '<h2>Page not found</h2>'
})
export class PageNotFoundComponent {
    constructor(private route:ActivatedRoute, private _router: Router ) {
        let url =_router.url;
        let result = url.match( /^\/departments\/([0-9]+)$/i );
        let id = result[1];
        if(id) {
            // todo add cearch
            _router.navigate(['departments', id,'employees'], { replaceUrl: true });
        }
    }
}
