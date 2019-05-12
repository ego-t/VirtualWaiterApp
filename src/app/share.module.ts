import { LoadingComponent } from './loading/loading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})
export class ShareModule {}
