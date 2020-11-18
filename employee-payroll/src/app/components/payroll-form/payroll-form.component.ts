import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
@Component({
  selector: 'app-payroll-form',
  templateUrl: './payroll-form.component.html',
  styleUrls: ['./payroll-form.component.scss']
})
export class PayrollFormComponent implements OnInit {
  employeeForm: any;
  departMentValue = ['HR'];
  departMentValid = true;
  employeeId: string;
  isUpdate = false;
  profileArray = [
    { url: '../../../assets/profile-images/Ellipse -3.png' },
    { url: '../../../assets/profile-images/Ellipse 1.png' },
    { url: '../../../assets/profile-images/Ellipse -8.png' },
    { url: '../../../assets/profile-images/Ellipse -7.png' }

  ]
  allDepartment = [
    'HR', 'Sales', 'Finance', 'Engineer', 'Others'
  ]
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      departMent: [],
      salary: ['', Validators.required],
      day: ['1', Validators.required],
      month: ['Jan', Validators.required],
      year: ['2020', Validators.required],
      startDate: [''],
      notes: ['',],
      id: [''],
      profileUrl: ['', Validators.required]
    });
    this.activatedRoute.params.subscribe(data => {
      if (data && data.id) {
        this.isUpdate = true;
        this.getDataById(data.id)
      }
    })

  }

  ngOnInit() {
  }

  getChecked(name) {
    return this.departMentValue.includes(name);
  }
  onCheckChange(name) {
    let index = this.departMentValue.indexOf(name);
    this.departMentValid = true;
    if (index > -1)
      this.departMentValue.splice(index, 1)
    else
      this.departMentValue.push(name)
  }
  getErrorMessage(control: FormControl, message: string) {
    if (control.errors) {
      if (control.errors.required) {
        return message + ' is required';
      }

      if (control.errors.pattern || control.errors.whitespace) {
        return 'Invalid ' + message.toLowerCase();
      }

    }
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  getDataById(id): void {
    this.employeeService.getEmployee(id).subscribe(data => {
      console.log("data of employee", data);
      this.setDataToFormBuilder(data)
    }, err => {
      console.log("employee not found");
    })
  }
  setDataToFormBuilder(object): void {
    let date = object.startDate.split(" ");
    this.employeeForm.setValue({
      name: object.name,
      gender: object.gender,
      departMent: [],
      salary: object.salary,
      day: date[0],
      month: date[1],
      year: date[2],
      startDate: object.startDate,
      notes: object.notes,
      id: object.id,
      profileUrl: object.profileUrl
    });
    this.departMentValue = object.departMent;
    this.employeeId = object.id;
  }
  save(event) {
    event.preventDefault();
    console.log("save");

    if (this.departMentValue.length == 0) {
      this.departMentValid = false;
      return;
    }
    if (this.employeeForm.valid) {
      this.employeeForm.controls['departMent'].setValue(this.departMentValue)
      let startDate = `${this.employeeForm.controls['day'].value} ${this.employeeForm.controls['month'].value} ${this.employeeForm.controls['year'].value}`
      this.employeeForm.controls['startDate'].setValue(startDate)
      this.employeeForm.removeControl('day');
      this.employeeForm.removeControl('month');
      this.employeeForm.removeControl('year');

      if (this.isUpdate) {
        // this line is because when user reset the value then id is also reset 
        this.employeeForm.controls['id'].setValue(this.employeeId)
        this.employeeService.updateEmployee(this.employeeForm.value).subscribe(response => {
          console.log("response is ", response);
          this.router.navigateByUrl('')
        }, err => {

        })
      } else {
        this.employeeService.addEmployee(this.employeeForm.value).subscribe(response => {
          console.log("response is ", response);
          this.router.navigateByUrl('');
        }, err => {
        })
      }
    } else {
      this.markFormGroupTouched(this.employeeForm);
    }
  }

  /**
   * description:- to reset the form value
   */
  reset(): void {
    this.employeeForm.reset();
    this.departMentValue = [];
  }
}
