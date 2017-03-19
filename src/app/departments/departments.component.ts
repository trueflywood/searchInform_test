import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend/backend.service";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  constructor(private backendServise: BackendService) {}
  data: any[] = [];

  ngOnInit() {
      this.backendServise.getDepartments().subscribe((res) => {
          console.log('res');
          console.log(res);
          this.data = res;
      });
  }

}
