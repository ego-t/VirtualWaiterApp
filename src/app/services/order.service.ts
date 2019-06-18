import { DatabaseService } from 'src/app/services/database.service';
import { Establishment } from './../models/Establishment';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConsumerService } from './consumer.service';
import { Consumer } from '../models/Consumer';

export interface CurrentOrder {
  establishment: Establishment;
  consumer: Consumer;
  valorTotal: number;
}


@Injectable()
export class OrderService {
  KEY_CURRENT_ORDER = 'orderCurrent';
  firstArrayPos = 0;

  constructor(
    private userService: UserService,
    public afStore: AngularFirestore,
    private consumerApi: ConsumerService,
    private dataBaseService: DatabaseService,
  ) { }

  CancelOrder() {
    // remove order from Session storage to log user out
    sessionStorage.removeItem(this.KEY_CURRENT_ORDER);
    return this.dataBaseService.deleteAllProducts();
  }

  OpenOrder(currentConsumer: Consumer, currentEstablishment: Establishment) {
    if (currentConsumer && (currentEstablishment)) {

      const currentOrder: CurrentOrder = {
        establishment: currentEstablishment,
        consumer: currentConsumer,
        valorTotal: 0
      };
      sessionStorage.setItem(this.KEY_CURRENT_ORDER, JSON.stringify(currentOrder));
      console.log('Ordem Aberta...');
    }
  }

  setCurrentOrder(currentOrder: CurrentOrder) {
    sessionStorage.setItem(this.KEY_CURRENT_ORDER, JSON.stringify(currentOrder));
  }

  async getCurrentOrder(): Promise<CurrentOrder> {
    const currenteOrder: CurrentOrder = JSON.parse(sessionStorage.getItem(this.KEY_CURRENT_ORDER));
    const valor: number = await this.dataBaseService.getTotalPedido();
    if (currenteOrder === null) {
      return null;
    }
    currenteOrder.valorTotal = valor;
    return currenteOrder;
  }

  setValorTotal(valor: number) {
    this.getCurrentOrder().then( (currentOrder) => {
      currentOrder.valorTotal = valor;
      this.setCurrentOrder(currentOrder);
    });
  }
}
