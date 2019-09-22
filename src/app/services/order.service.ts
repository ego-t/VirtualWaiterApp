import { Account } from './../models/Account';
import { AccountService } from './account.service';
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
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Order } from '../models/Order';
import { ItemProduct } from '../models/ItemProduct';
import { EnumFormaPagamento } from '../models/Account';

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

  // we can now access environment.apiUrl
  API_URL = environment.URL_API;

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    public afStore: AngularFirestore,
    private consumerApi: ConsumerService,
    private dataBaseService: DatabaseService,
    private controlService: ControlService,
    private tableService: TableService,
    private alerta: Alerta,
    private router: Router,
    private establishmentService: EstablishmentService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
  ) { }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(
      this.API_URL + '/pedido/',
      JSON.stringify(order),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

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
          this.setCurrentOrder(null);
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

  realizarPedido() {
    const currentOrder = this.getCurrentOrder();
    const today = new Date();
    let orderItens: ItemProduct[] = [];

    this.dataBaseService.getItensProducts().then((itensProductdb: ItemProduct[]) => {
      let totalPedido = 0;
      for (const itemProduct of itensProductdb) {
        const precoCalculado = itemProduct.preco * itemProduct.quantidade;
        const newItem: ItemProduct = {
          id: 0,
          entregue: false,
          quantidade: itemProduct.quantidade,
          observacoes: itemProduct.observacoes,
          preco: itemProduct.preco,
          produto: itemProduct.produto,
          precoTotal: precoCalculado
        };
        orderItens.push(newItem);
        totalPedido += Number(itemProduct.preco);
      }
      if (orderItens.length === 0) {
        this.alerta.showAlert('Aviso', 'Escolha o seu lanche antes de realizar o pedido');
        return;
      }

      const newOrder = {
        codigo: today.getTime().toString(),
        datahora: new Date(),
        comanda: currentOrder.control.id,
        itens: orderItens
      };
      this.create(newOrder).subscribe(() => {
        this.alerta.showAlert('Sucesso!', 'Seu pedido foi enviado. Agora é só aguardar :D');
        this.dataBaseService.deleteAllProducts().then(() => {
          this.router.navigate(['/estabelecimento/' + currentOrder.establishment.id]);
        });
      });
    }).catch(() => {
      console.log('Erro ao realizar pedido');
    });
  }

  fecharComanda(comanda: Control, mesa: Table) {

    const mesaId = mesa.id;

    if (comanda.enumsituacaocomanda === EnumSituacaoComanda.Ativa) {
      if (comanda.pedidos.length !== 0) {
        this.realizarBaixa(comanda, mesa);
      }
      //else {
      //   this.waitingFinishPaymentAccount(comanda.id, mesaId, false);
      // }
    } else if (comanda.enumsituacaocomanda === EnumSituacaoComanda.AguardandoPagamento) {
      this.alerta.showAlert('Pedido de fechamento enviado!', 'Aguarde o fechamento da comanda');
    } else {
      this.alerta.showAlert('', 'Não possui operação para realizar nesta comanda');
    }
  }

  realizarBaixa(control: Control, mesa: Table) {
    const itens = [];
    let total = 0;
    control.pedidos.forEach(pedido => {
      pedido.itens.forEach(item => {
        itens.push(item);
        total += (item.preco * item.quantidade);
      });
    });

    this.controlService.getById(control.id).subscribe( (data: Control[]) => {
      control = data[0];
      if (control.enumsituacaocomanda === EnumSituacaoComanda.Ativa) {
        control.enumsituacaocomanda = EnumSituacaoComanda.AguardandoPagamento;
        this.controlService.update(control).subscribe(() => {
          this.alerta.showAlert('', 'Aguardando o pagamento');
          this.initAccount(control.id, total, mesa.id);
        });
      }
    });
  }

  initAccount(controlId: number, total: number, mesaId: number) {
    this.accountService.getByControlId(controlId).subscribe((data: Account[]) => {

      if (data.length === 0) {
        const newAccount = {
          total: total,
          enumformapagamento: EnumFormaPagamento.Dinheiro,
          taxaservico: 0,
          comanda: controlId
        };

        this.accountService.update(newAccount).subscribe(() => {
          this.router.navigate(['/consulta-comanda/' + controlId]);
        });
      } else {
        this.alerta.showAlert('', 'Conta já gerada');
      }
    });
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
