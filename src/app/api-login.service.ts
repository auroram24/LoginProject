import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


export interface UserData {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  constructor(private ApiLogin: HttpClient) { }


  login(userData: UserData) {
    return this.ApiLogin.post('http://127.0.0.1:8000/auth/login/', userData);
  }



}
