import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend/backend.service";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  data: any[] = [];
  constructor(private backendServise: BackendService) {}

  ngOnInit() {
      this.backendServise.getDepartments().subscribe((res) => {
          this.data = res;
      });
  }

  onEdit(id: number): void {
      console.log(id);
  }

  onDelete(id: number): void {
      let index = this.data.findIndex((item)=>{
         return item.id === id;
      });
      this.data.splice(index, 1);
      this.backendServise.setDepartments(this.data);
  }

  onShow(id: number): void {
      console.log(id);
  }
}
