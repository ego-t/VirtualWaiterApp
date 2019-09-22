import { AuthenticationService } from './../services/authentication.service';
import { CadastroPage } from './../cadastro/cadastro.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { FirebaseUIModule } from 'firebaseui-angular';
import { OrderService } from '../services/order.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirebaseUIModule,
    RouterModule.forChild(routes),
  ],
  providers: [AuthenticationService, OrderService, DatabaseService],
  declarations: [LoginPage, CadastroPage],
  exports: [CadastroPage],
  entryComponents: [ CadastroPage ]
})
export class LoginPageModule {}
