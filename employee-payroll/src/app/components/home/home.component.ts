import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee-service/employee.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private emplyeeService: EmployeeService) { }
  employeeArray: Array<any> = [];

  ngOnInit() {
    this.getAllEmployee();
  }

  getAllEmployee(): void {
    this.emplyeeService.getAllEmployee().subscribe(data => {
      this.employeeArray = <any>data;
      console.log("data after getAllEmployee", this.employeeArray);

    }, err => {
      console.log("err after getAllEmployee", err);
    })
  }

}
