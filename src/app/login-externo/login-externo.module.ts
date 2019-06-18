import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginExternoPage } from './login-externo.page';
import { ShareModule } from '../share.module';
import { AuthenticationService } from '../services/authentication.service';

const routes: Routes = [
  {
    path: '',
    component: LoginExternoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  providers: [AuthenticationService],
  declarations: [LoginExternoPage]
})
export class LoginExternoPageModule {}
