import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TermosDeUsoPage } from './termos-de-uso.page';

const routes: Routes = [
  {
    path: '',
    component: TermosDeUsoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TermosDeUsoPage]
})
export class TermosDeUsoPageModule {}
