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

  changeMode() {
    this.hasError = null;
    this.formShow = !this.formShow;
  }


  submitButton() {
    if (this.ourForm.value) {
      if (this.formShow) {
        this.apiService.login(this.ourForm.value).subscribe(
          response => {

            this.router.navigate(['menu']);
          },
          error => {
            this.hasError = error.non_field_errors;

          });

      } else {
        this.ourForm.value.password1 = this.ourForm.value.password;
        this.hasError = null;
        this.apiService.register(this.ourForm.value).subscribe(
          response => {

          },
          error => {
            this.emailError = error.email;
            this.userError = error.username;
            this.passwordError = error.password1;

          }
        );
      }
    }


  }
}
