import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {MenuComponent} from './menu/menu.component';
import {LoginHebComponent} from './login/login-heb/login-heb.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent},
  {path: 'login-heb', component: LoginHebComponent},
  {path: 'menu', component: MenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
