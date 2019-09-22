import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoEstabelecimentoPage } from './info-estabelecimento.page';
import { DatabaseService } from '../services/database.service';

const routes: Routes = [
  {
    path: '',
    component: InfoEstabelecimentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfoEstabelecimentoPage],
  providers: [ DatabaseService ]
})
export class InfoEstabelecimentoPageModule {}
