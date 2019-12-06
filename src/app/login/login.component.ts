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



  constructor(
    private apiService: ApiLoginService,
    private router: Router
  ) { }

  ngOnInit() {
    // setTimeout( () => {
    //   this.ourForm.form.setValue({
    //     email: 'nirooma@icloud.com',
    //     password: '12345',
    //   });
    // }, );
  }

    changeMode() {
    this.formShow = !this.formShow;
  }


  submitButton() {
    if (this.ourForm.valid) {
     if (this.formShow) {
       this.apiService.login(this.ourForm.value).subscribe(
         response => {
           console.log(response);
           console.log(this.ourForm.form);
           console.log(this.ourForm.value.password);
           this.router.navigate(['menu']);
         },
         error => {
           console.log(error);
         }
       );
     } else {
       this.ourForm.value.password1 = this.ourForm.value.password;
       this.apiService.register(this.ourForm.value).subscribe(
         response => {
           console.log(response);
           this.formShow = true;
         },
         error => {
           console.log(error);
         }
       );
     }
    }
  }





}
