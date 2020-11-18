import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee-service/employee.service';

interface employeeType {
  type: string,
  data: {}
}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router) { }
  // input decorator to share data from parent to child
  @Input() employeeArray = [];
  // event emiter to share data from child to parent
  @Output() employeeEvent = new EventEmitter<employeeType>();
  ngOnInit() {
  }
  remove(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId).subscribe(data => {
      this.employeeEvent.emit({ type: 'delete', data: {} })
    }, err => {

    })
  }
  update(employeeId: string) {
    this.router.navigateByUrl(`payroll-form/${employeeId}`);
  }

}
