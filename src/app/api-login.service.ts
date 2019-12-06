import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {tap, catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';



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
        response => {

        }),
      catchError(this.handlerError)

    );
  }


  register(userData: UserData) {
    return this.ApiLogin.post('http://localhost:8000/auth/signup/', userData).
      pipe(
        tap(
          response => {

          }),
      catchError(this.handlerError)
    );
  }



  handlerError(errorObject: HttpErrorResponse) {
    if (errorObject.status === 0) {
      return throwError('Server is down, try again later');
    }
    return throwError(errorObject.error);
  }

}
