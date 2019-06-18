import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemCardapioPage } from './item-cardapio.page';
import { OrderService } from '../services/order.service';

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
    RouterModule.forChild(routes)
  ],
  providers: [ OrderService ],
  declarations: [ItemCardapioPage]
})
export class ItemCardapioPageModule {}
