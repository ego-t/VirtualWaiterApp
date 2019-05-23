import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ListaEstabelecimentoComponent } from './lista-estabelecimento/lista-estabelecimento.component';
import { SacolaPedidoComponent } from './sacola-pedido/sacola-pedido.component';

@NgModule({
  declarations: [ListaEstabelecimentoComponent,SacolaPedidoComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports: [ListaEstabelecimentoComponent, SacolaPedidoComponent ]
})
export class ComponentsModule { }