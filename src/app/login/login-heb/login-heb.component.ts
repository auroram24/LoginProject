import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiLoginService} from '../../api-login.service';

@Component({
  selector: 'app-login-heb',
  templateUrl: './login-heb.component.html',
  styleUrls: ['./login-heb.component.css']
})
export class LoginHebComponent implements OnInit {
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
  ) { }

  ngOnInit() {
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
            this.hasError = error.non_field_errors;
            setTimeout(() => {
              this.hasError = null;
            }, 4000);
          });

      } else {

        // register function
        this.ourForm.value.password1 = this.ourForm.value.password;

        if (this.ourForm.value.password1 !== this.ourForm.value.password2) {
          this.passwordNotEquals = true;
          setTimeout(() => {
            this.passwordNotEquals = false;
          }, 8000);
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
              }, 6500);
            },
            error => {

              this.emailError = error.email;
              this.userError = error.username;
              this.passwordError = error.password1;
              setTimeout(() => {
                this.emailError = null;
                this.userError = null;
                this.passwordError = null;
              }, 8000);
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
