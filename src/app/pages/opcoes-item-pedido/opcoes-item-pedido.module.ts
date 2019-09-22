import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OpcoesItemPedidoPage } from './opcoes-item-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: OpcoesItemPedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ OpcoesItemPedidoPage],
  exports: [ OpcoesItemPedidoPage ],
  entryComponents: [OpcoesItemPedidoPage]
})
export class OpcoesItemPedidoPageModule {}
