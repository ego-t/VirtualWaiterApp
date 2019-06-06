import { CadastroPage } from './../cadastro/cadastro.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { ShareModule } from '../share.module';
import { DatabaseService } from '../services/database.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
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
  providers: [],
  declarations: [LoginPage, CadastroPage],
  exports: [CadastroPage],
  entryComponents: [ CadastroPage ]
})
export class LoginPageModule {}
