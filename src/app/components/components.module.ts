import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ListaEstabelecimentoComponent } from './lista-estabelecimento/lista-estabelecimento.component';
import { BuscaEstabelecimentoComponent } from './busca-estabelecimento/busca-estabelecimento.component';

@NgModule({
  declarations: [BuscaEstabelecimentoComponent,ListaEstabelecimentoComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports: [BuscaEstabelecimentoComponent,ListaEstabelecimentoComponent]
})
export class ComponentsModule { }