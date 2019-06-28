import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { HomePage } from './home.page';
import { OrderService } from '../services/order.service';
import { ControlService } from '../services/control.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  providers: [ OrderService, ControlService ],
  declarations: [HomePage]
})
export class HomePageModule {}
