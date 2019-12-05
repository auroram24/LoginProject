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


  submitButton() {
    if (this.ourForm.valid) {
      this.apiService.login(this.ourForm.value).subscribe(
        response => {
          console.log(response);
          this.ourForm.form.reset();
          this.router.navigate(['menu']);
        }
      );
    } else {
      console.log('Not valid');
    }





  }

}
