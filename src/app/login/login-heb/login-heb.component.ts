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

  constructor(
    private apiService: ApiLoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }


   submitButton() {
    if (this.ourForm.value) {
      if (this.formShow) {
        this.apiService.login(this.ourForm.value).subscribe(
          response => {
            console.log(response);
            this.router.navigate(['menu']);
          });

      } else {
        this.ourForm.value.password1 = this.ourForm.value.password;
        this.apiService.register(this.ourForm.value).subscribe(
          reponse => {
            console.log(reponse);
            this.formShow = true;
          }
        );
      }
    }
  }



  changeMode() {
    this.formShow = !this.formShow;
  }


}
