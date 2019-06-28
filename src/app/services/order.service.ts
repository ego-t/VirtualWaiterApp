import { EstablishmentService } from './Establishment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Control, EnumSituacaoComanda } from './../models/Control';
import { ControlService } from './control.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Establishment } from './../models/Establishment';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConsumerService } from './consumer.service';
import { Consumer } from '../models/Consumer';
import { Table, EnumEstadoMesa } from '../models/Table';
import { TableService } from './table.service';
import { Alerta } from '../Utils/Alerta';
import { Router } from '@angular/router';

export interface CurrentOrder {
  establishment: Establishment;
  control: Control;
  consumer: Consumer;
  table: Table;
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
    private controlService: ControlService,
    private tableService: TableService,
    private alerta: Alerta,
    private router: Router,
    private establishmentService: EstablishmentService,
    private authenticationService: AuthenticationService
  ) { }

  updateOrder() {
    console.log('Update Order');
    // Verificar se a comanda atual está ativa

    let currentOrder = this.getCurrentOrder();

    if (!currentOrder) {
      this.buscarOrdemAbertaParaOConsumidor();
      return;
    }

    this.controlService.getById(currentOrder.control.id).toPromise().then(async (data: Control[]) => {
      if (data.length > 0) {
        const controlConsult = data[this.firstArrayPos];
        if (controlConsult.enumsituacaocomanda !== EnumSituacaoComanda.Ativa) {
          await this.removerOrder();
          this.alerta.showAlert('Aviso', 'Sua comanda nº ' + controlConsult.id + ' foi fechada pelo estabelecimento');
          return;
        } else {
          currentOrder.control = data[this.firstArrayPos];
          this.setCurrentOrder(currentOrder);
        }
      }
    }).finally(() => {
      //this.buscarOrdemAbertaParaOConsumidor();
    });
  }

  buscarOrdemAbertaParaOConsumidor() {
    const consumerCurrent = this.authenticationService.getCurrentConsumer();

      this.controlService.getByConsumidorId(consumerCurrent.id, EnumSituacaoComanda.Ativa).toPromise().then((data) => {
        if (data.length > 0) {
          data = data[0];
          const idestabelecimento = data.estabelecimentoid;
          const idmesa = data.mesaid;
          const idcomanda = data.comandaid;
          this.atualizarOrdenCurrent(consumerCurrent, idestabelecimento, idmesa, idcomanda);
        } else {
          this.removerOrder().then(() => {
            this.dataBaseService.setTableScaned(null);
          });
        }
      }).catch((error: Error) => {
        console.log(error.message);
      });
  }
  atualizarOrdenCurrent(consumerCurrent: Consumer, idestabelecimento: number, idmesa: number, idcomanda: number) {
    let estabelecimento: Establishment;
    let table: Table;
    let control: Control;

    this.establishmentService.getById(idestabelecimento).subscribe((dataEstablishment: Establishment[]) => {
      if (dataEstablishment[this.firstArrayPos] != null) {
        estabelecimento = dataEstablishment[this.firstArrayPos];
        this.dataBaseService.setEstablishmentPage(estabelecimento);

        this.tableService.getById(idmesa).toPromise().then((tables: Table[]) => {

          if (tables.length > 0) {
            table = tables[this.firstArrayPos];
            this.controlService.getById(idcomanda).toPromise().then((dataControl: Control[]) => {
              if (dataControl.length > 0) {
                control = dataControl[this.firstArrayPos];

                this.continueOrder(control, consumerCurrent, estabelecimento, table);
                //                      this.router.navigate(['/estabelecimento/' + idItem]);
              }
            }).catch((error: Error) => {
              console.log('Erro ao buscar comanda');
            });
          }
        }).catch((error: Error) => {
          this.alerta.showAlert('Não foi possível localizar o estabelecimento :/', error.message);
        });
      }
    });
  }

  continueOrder(control: Control, currentConsumer: Consumer, currentEstablishment: Establishment, currentTable: Table) {
    const currentOrder: CurrentOrder = {
      establishment: currentEstablishment,
      consumer: currentConsumer,
      control: control,
      table: currentTable
    };
    this.setCurrentOrder(currentOrder);
  }

  OpenOrder(currentConsumer: Consumer, currentEstablishment: Establishment, currentTable: Table) {
    if (currentConsumer && (currentEstablishment)) {

      const control: Control = {
        enumsituacaocomanda: EnumSituacaoComanda.Ativa,
        horarioinicio: new Date(),
        mesa: currentTable.id,
        responsavel: currentConsumer,
        consumidores: [currentConsumer]
      };

      this.controlService.create(control).subscribe((data: Control) => {
        const table = {
          id: currentTable.id,
          enumestadomesa: EnumEstadoMesa.Ocupada
        };

        this.tableService.update(table).subscribe(() => {
          const currentOrder: CurrentOrder = {
            establishment: currentEstablishment,
            consumer: currentConsumer,
            control: data,
            table: currentTable
          };

          sessionStorage.setItem(this.KEY_CURRENT_ORDER, JSON.stringify(currentOrder));
          this.alerta.showAlert('Sucesso!', 'Comanda Nº ' + data.id + ' aberta.');
          console.log('Ordem Aberta... Nº ' + data.id);
          this.router.navigate(['/estabelecimento/' + currentEstablishment.id]);
        });
      });
    }
  }

  

  async getCurrentOrderWithValorTotal(): Promise<CurrentOrder> {
    const currenteOrder: CurrentOrder = JSON.parse(sessionStorage.getItem(this.KEY_CURRENT_ORDER));
    const valor: number = await this.dataBaseService.getTotalPedido();
    if (currenteOrder === null) {
      return null;
    }
    return currenteOrder;
  }

  setCurrentOrder(currentOrder: CurrentOrder) {
    sessionStorage.setItem(this.KEY_CURRENT_ORDER, JSON.stringify(currentOrder));
    console.log('CurrentOrder Atualizada');
    console.log(currentOrder);
  }

  removerOrder() {
    sessionStorage.setItem(this.KEY_CURRENT_ORDER, JSON.stringify(null));
    sessionStorage.removeItem(this.KEY_CURRENT_ORDER);
    return this.dataBaseService.deleteAllProducts();
  }

  getCurrentOrder(): CurrentOrder {
    return JSON.parse(sessionStorage.getItem(this.KEY_CURRENT_ORDER));
  }
}
