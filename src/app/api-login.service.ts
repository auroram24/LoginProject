import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';



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
    return this.ApiLogin.post('http://127.0.0.1:8000/auth/login/', userData).
    pipe(
      tap(
        // error => console.log(error)
      )
    );
  }


  register(userData: UserData) {
    return this.ApiLogin.post('http://localhost:8000/auth/signup/', userData);
  }

}
