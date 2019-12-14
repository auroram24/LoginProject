import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiLoginService} from '../api-login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginMode = true;
  error: string = null;
  successMessage = false;


  constructor(
    private apiService: ApiLoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // setTimeout( () => {
    //   this.ourForm.form.setValue({
    //     email: 'nirooma@icloud.com',
    //     password: '12345',
    //   });
    // }, );
  }


  submitButton(inputData: NgForm) {
    if (inputData.valid) {
      if (this.loginMode) {
        this.apiService.login(inputData.value).subscribe(
          response => {
            this.router.navigate(['menu']);
          },
          errorResponse => {
            this.error = errorResponse;
            inputData.form.controls.password.reset();
            setTimeout(() => {
              this.error = null;
            }, 6000);
          }
        );
      } else {
        inputData.value.password1 = inputData.value.password;
        this.apiService.register(inputData.value).subscribe(
          response => {
            this.loginMode = true;
            this.successMessage = true;
            setTimeout(() => {
              this.successMessage = false;
            }, 6000);
          },
          errorResponse => {
            this.error = errorResponse;
            setTimeout(() => {
              this.error = null;
            }, 6000);
          }
        );
      }
    }
  }




    changeMode() {
    this.loginMode = !this.loginMode;
    console.log(this.loginMode);
  }






}
