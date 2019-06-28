import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmarEstabelecimentoPage } from './confirmar-estabelecimento.page';
import { OrderService } from '../services/order.service';
import { ControlService } from '../services/control.service';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarEstabelecimentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ConfirmarEstabelecimentoPage],
  providers: [ OrderService, ControlService ]
})
export class ConfirmarEstabelecimentoPageModule {}
