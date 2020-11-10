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
    return this.httpService.getService(`${this.baseUrl}employee`)
  }
}
