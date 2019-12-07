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
  @ViewChild('fff', {static: true}) ourForm: NgForm;

  formShow = true;
  hasError = null;
  emailError = null;
  userError = null;
  passwordError = null;
  userRegisterSuccessfully = false;
  passwordNotEquals = false;





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


  submitButton() {
    if (this.ourForm.value) {
      if (this.formShow) {

        // login function
        this.apiService.login(this.ourForm.value).subscribe(
          response => {
            this.router.navigate(['menu']);
          },
          error => {
            this.passwordError = error.password;

            this.hasError = error.non_field_errors;
            setTimeout(() => {
              this.passwordError = null;
              this.hasError = null;
            }, 8000);
          });

      } else {

        // register function
        this.ourForm.value.password1 = this.ourForm.value.password;

        if (this.ourForm.value.password1 !== this.ourForm.value.password2) {
          this.passwordNotEquals = true;
          setTimeout(() => {
            this.passwordNotEquals = false;
          }, 10000);
        }

        this.apiService.register(this.ourForm.value).subscribe(
            response => {
              this.formShow = true;
              this.emailError = null;
              this.passwordError = null;
              this.userError = null;

              this.userRegisterSuccessfully = true;
              setTimeout(() => {
                this.userRegisterSuccessfully = false;
              }, 8000);
            },
            error => {

              this.emailError = error.email;
              this.userError = error.username;
              this.passwordError = error.password1;
              setTimeout(() => {
                this.emailError = null;
                this.userError = null;
                this.passwordError = null;
              }, 10000);
            },

          );
      }
    }
  }


    changeMode() {
    this.hasError = null;
    this.userError = null;
    this.emailError = null;
    this.passwordError = null;
    this.formShow = !this.formShow;
    this.passwordNotEquals = null;
  }






}
