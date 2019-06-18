import { DatabaseService } from 'src/app/services/database.service';
import { CurrentOrder } from './../../services/order.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/Utils/Alerta';
import { Establishment } from 'src/app/models/Establishment';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-lista-estabelecimento',
  templateUrl: './lista-estabelecimento.component.html',
  styleUrls: ['./lista-estabelecimento.component.scss'],
})
export class ListaEstabelecimentoComponent implements OnInit {

  @Input() public estabelecimentos: Establishment[];

  constructor(private http: HttpClient, private router: Router, private alerta: Alerta,
    private orderService: OrderService, private dataBaseService: DatabaseService) {
      this.dataBaseService.setEstablishmentPage(null);
  }

  goTo(idItem: string) {
    try {

      this.orderService.getCurrentOrder().then((currentOrder) => {
        if (currentOrder === null) {
          this.router.navigate(['/estabelecimento/' + idItem]);
          return;
        }

        if (currentOrder.establishment.id !== Number(idItem)) {
          this.orderService.CancelOrder().then( () => {
            this.router.navigate(['/estabelecimento/' + idItem]);
          });
        }
      });

    } catch (e) {
      this.alerta.showAlert('Ops', e);
    }
  }

  ngOnInit() {
    console.log('entrou na lista estabelecimento');
   }

}
