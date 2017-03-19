import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend/backend.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private backendServise: BackendService) { }

  ngOnInit() {
     this.backendServise.getEmployees().subscribe((res) => {
         console.log('res');
         console.log(res);
     } )
  }

}
