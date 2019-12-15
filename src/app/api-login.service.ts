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

  constructor(private httpClient: HttpClient) { }


  login(userData: UserData) {
    return this.httpClient.post('http://127.0.0.1:8000/auth/login/', userData)
      .pipe(
       catchError(
        errorResponse => {
          if (errorResponse.status === 0) {
            console.log(errorResponse);
            return throwError('Server is shutdown for some fixes, try again in few min');
          }
          return throwError(errorResponse.error.non_field_errors);
        }));
  }


  register(userData: UserData) {
    return this.httpClient.post('http://localhost:8000/auth/signup/', userData).
      pipe(
        catchError(
          errorResponse => {
            if (errorResponse.status === 0) {
              return throwError('Server is shutdown for some fixes, try again in few min');
            } else {
              return throwError(errorResponse.error.non_field_errors || errorResponse.error.email || errorResponse.error.username);
            }

          }),
      tap(
        response => {

        }
      ));
  }
  // handlerError(errorObject: HttpErrorResponse) {
  //   if (errorObject.status === 0) {
  //     return throwError('Server is down, try again later');
  //   }
  //   return throwError(errorObject.error);
  // }

}
