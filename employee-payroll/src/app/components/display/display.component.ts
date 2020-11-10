import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor() { }
  @Input() employeeArray = [];

  ngOnInit() {
  }
  remove(employeeId: string) {
  }

}
