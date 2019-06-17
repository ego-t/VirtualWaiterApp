import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginExternoPage } from './login-externo.page';
import { ShareModule } from '../share.module';

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
  declarations: [LoginExternoPage]
})
export class LoginExternoPageModule {}
