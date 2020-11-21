import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmployeeService } from "../../services/employee-service/employee.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private emplyeeService: EmployeeService) { }
  employeeArray: Array<any> = [];
  employeeArrayAll: Array<any> = [];
  searchExpand: boolean = false;
  searchKey = new FormControl('');

  ngOnInit() {
    this.getAllEmployee();
    // clear data of update employee from local storage
    localStorage.removeItem('editEmp')
  }

  getAllEmployee(): void {
    this.emplyeeService.getAllEmployee().subscribe(data => {
      this.employeeArray = <any>data;
      this.employeeArrayAll = <any>data;
      if (this.searchKey.value.trim().length > 0)
        this.search()
      // console.log("data after getAllEmployee", this.employeeArray);

    }, err => {
      console.log("err after getAllEmployee", err);
    })
  }
  /**
   * description:-this method is for catching event from child component 
   * @param data 
   */
  updateEvent(data) {
    if (data.type == 'delete')
      this.getAllEmployee()
  }
  search(): void {
    // assigning the original array to employeeArray
    this.employeeArray = this.employeeArrayAll;
    // after filter reassign the filter array to employee array
    if (this.searchKey.value.trim().length > 0)
      this.employeeArray = this.employeeArray.filter(element => element.name.toLowerCase().indexOf(this.searchKey.value.toLowerCase()) > -1);
  }
  openSearchBox(): void {
    this.searchExpand = true;
  }

}
