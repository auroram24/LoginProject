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
  spinnerOn = false;


  constructor(
    private apiService: ApiLoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // setTimeout( () => {
    //   form.form.setValue({
    //     email: 'nirooma@icloud.com',
    //     password: '12345',
    //   });
    // }, );
  }


  submitButton(inputData: NgForm) {
    if (inputData.valid) {
      if (this.loginMode) {
        this.spinnerOn = true;
        this.apiService.login(inputData.value).subscribe(
          response => {
            setTimeout(() => {
              this.router.navigate(['menu']);
              this.spinnerOn = false;
            }, 3000);

          },
          errorResponse => {
            setTimeout(() => {
              this.error = errorResponse;
              this.spinnerOn = false;
              inputData.form.controls.password.reset();
              setTimeout(() => {
                this.error = null;
              }, 6000);
              }, 3000);
          }
        );
      } else {
        this.spinnerOn = true;
        inputData.value.password1 = inputData.value.password;
        this.apiService.register(inputData.value).subscribe(
          response => {
            setTimeout(() => {
              this.spinnerOn = false;
              this.loginMode = true;
              this.successMessage = true;
              setTimeout(() => {
              this.successMessage = false;
            }, 6000);
            }, 3000);

          },
          errorResponse => {
            setTimeout(() => {
              this.spinnerOn = false;
              this.error = errorResponse;
              inputData.form.controls.password.reset();
              inputData.form.controls.password2.reset();
              setTimeout(() => {
              this.error = null;
              }, 6000);
            }, 3000);

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
