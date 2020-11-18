import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from "../http-service/http.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpService: HttpService) { }
  baseUrl: String = environment.baseUrl;
  getAllEmployee() {
    return this.httpService.getService(`${this.baseUrl}employee`);
  }
  getEmployee(id) {
    return this.httpService.getService(`${this.baseUrl}employee/${id}`);
  }
  deleteEmployee(id: string) {
    return this.httpService.deleteService(`${this.baseUrl}employee/${id}`)
  }
  addEmployee(data) {
    return this.httpService.postService(`${this.baseUrl}employee`, data);
  }
  updateEmployee(data) {
    return this.httpService.putService(`${this.baseUrl}employee/${data.id}`, data)
  }
}
