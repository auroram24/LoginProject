import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


export interface UserData {
  email: string;
  password: string;
  password1: string;
  password2: string;
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  constructor(private ApiLogin: HttpClient) { }


  login(userData: UserData) {
    return this.ApiLogin.post('http://127.0.0.1:8000/auth/login/', userData);
  }


  register(userData: UserData) {
    return this.ApiLogin.post('http://localhost:8000/auth/signup/', userData);
  }

}
