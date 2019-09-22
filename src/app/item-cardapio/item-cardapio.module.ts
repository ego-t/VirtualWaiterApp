import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemCardapioPage } from './item-cardapio.page';
import { OrderService } from '../services/order.service';
import { ControlService } from '../services/control.service';
import { ShareModule } from '../share.module';

const routes: Routes = [
  {
    path: '',
    component: ItemCardapioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule,
  ],
  providers: [ OrderService, ControlService ],
  declarations: [ItemCardapioPage]
})
export class ItemCardapioPageModule {}
