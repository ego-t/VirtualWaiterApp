import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, PopoverController, AngularDelegate } from '@ionic/angular';

import { PedidoPage } from './pedido.page';
import { OpcoesItemPedidoPage } from '../pages/opcoes-item-pedido/opcoes-item-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [ PopoverController, AngularDelegate ],
  declarations: [PedidoPage, OpcoesItemPedidoPage],
  exports: [ OpcoesItemPedidoPage ],
  entryComponents: [ OpcoesItemPedidoPage ]
})
export class PedidoPageModule {}
