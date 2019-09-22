import { DatabaseService } from './../services/database.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuscarMesaPage } from './buscar-mesa.page';
import { OrderService } from '../services/order.service';
import { Alerta } from '../Utils/Alerta';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

const routes: Routes = [
  {
    path: '',
    component: BuscarMesaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BuscarMesaPage],
  providers: [ Alerta, OrderService, DatabaseService, QRScanner ]

})
export class BuscarMesaPageModule {}
