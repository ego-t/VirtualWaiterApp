import { TableService } from './../../services/table.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ControlService } from './../../services/control.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/Utils/Alerta';
import { Establishment } from 'src/app/models/Establishment';
import { OrderService } from 'src/app/services/order.service';
import { Control, EnumSituacaoComanda } from 'src/app/models/Control';

import { EstablishmentService } from 'src/app/services/Establishment.service';
import { Table } from 'src/app/models/Table';

@Component({
  selector: 'app-lista-estabelecimento',
  templateUrl: './lista-estabelecimento.component.html',
  styleUrls: ['./lista-estabelecimento.component.scss'],
})
export class ListaEstabelecimentoComponent implements OnInit {
  arrayPos = 0;
  @Input() public estabelecimentos: Establishment[];

  constructor(private http: HttpClient, private router: Router, private alerta: Alerta,
    private orderService: OrderService, private dataBaseService: DatabaseService,
    private controlService: ControlService,
    private authenticationService: AuthenticationService,
    private establishmentService: EstablishmentService,
    private tableService: TableService ) {
      this.dataBaseService.setEstablishmentPage(null);
  }

  goTo(idItem: string) {
    try {

      //this.orderService.updateOrder();

      this.router.navigate(['/estabelecimento/' + idItem]);

      // const consumerCurrent = this.authenticationService.getCurrentConsumer();
      // this.controlService.getByConsumidorId(consumerCurrent.id, EnumSituacaoComanda.Ativa).toPromise().then((data) => {
      //   if (data.length > 0) {
      //     let estabelecimento: Establishment;
      //     let table: Table;
      //     let control: Control;
      //     data = data[0];
      //     const idestabelecimento = data.estabelecimentoid;
      //     const idmesa  = data.mesaid;
      //     const idcomanda = data.comandaid;

      //     this.establishmentService.getById(idestabelecimento).subscribe((dataEstablishment: Establishment[]) => {
      //       if (dataEstablishment[this.arrayPos] != null) {
      //         estabelecimento = dataEstablishment[this.arrayPos];
      //         this.dataBaseService.setEstablishmentPage(estabelecimento);

      //         this.tableService.getById(idmesa).toPromise().then((tables: Table[]) => {

      //           if (tables.length > 0) {
      //             table = tables[this.arrayPos];
      //             this.controlService.getById(idcomanda).toPromise().then( (dataControl: Control[]) => {
      //               if (dataControl.length > 0) {
      //                 control = dataControl[this.arrayPos];

      //                 this.orderService.continueOrder(control, consumerCurrent, estabelecimento, table);
      //                 this.router.navigate(['/estabelecimento/' + idItem]);
      //               }
      //             }).catch( (error: Error) => {
      //               console.log('Erro ao buscar comanda');
      //             });
      //           }
      //         }).catch((error: Error) => {
      //           this.alerta.showAlert('Não foi possível localizar o estabelecimento :/', error.message);
      //         });

      //       }
      //     });
          

      //     // const mesa: Table = control.mesa;
      //     // this.orderService.continueOrder(control, control.responsavel, mesa.estabelecimento, control.mesa);
      //     // this.router.navigate(['/estabelecimento/' + mesa.estabelecimento.id]);
      //   } else {
      //     this.orderService.removerOrder().then( () => {
      //       this.dataBaseService.setTableScaned(null);
      //       this.router.navigate(['/estabelecimento/' + idItem]);
      //     });
      //   }
      // }).catch((error: Error) => {
      //   console.log(error.message);
      // });


      // this.orderService.getCurrentOrderWithValorTotal().then((currentOrder) => {
      //   if (currentOrder === null) {
      //     this.router.navigate(['/estabelecimento/' + idItem]);
      //     return;
      //   }

      //   if (currentOrder.establishment.id !== Number(idItem)) {
      //     this.dataBaseService.setTableScaned(null);
      //     this.orderService.CancelOrder().then( () => {
      //       this.router.navigate(['/estabelecimento/' + idItem]);
      //     });
      //   } else {
      //     this.router.navigate(['/estabelecimento/' + idItem]);
      //   }
      // });

    } catch (e) {
      this.alerta.showAlert('Ops', e);
    }
  }

  ngOnInit() {
    console.log('entrou na lista estabelecimento');
   }
}
