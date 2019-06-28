import { DatabaseService } from 'src/app/services/database.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaComandaPage } from './lista-comanda.page';
import { OrderService } from '../services/order.service';
import { ControlService } from '../services/control.service';
import { ShareModule } from '../share.module';

const routes: Routes = [
  {
    path: '',
    component: ListaComandaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ListaComandaPage],
  providers: [ Location, OrderService, DatabaseService, ControlService ]
})
export class ListaComandaPageModule {}
