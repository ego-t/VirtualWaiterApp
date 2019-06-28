import { AuthenticationService } from './../services/authentication.service';
import { OrderService, CurrentOrder } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-confirmar-estabelecimento',
  templateUrl: './confirmar-estabelecimento.page.html',
  styleUrls: ['./confirmar-estabelecimento.page.scss'],
})
export class ConfirmarEstabelecimentoPage implements OnInit {
  nomeEstabelecimento = '';
  descricaoEstabelecimento = '';
  urlLogoEstabelecimento = './../../assets/icon/logoApp.png';
  codigoMesa = '';

  constructor(private orderService: OrderService,
    private databaseService: DatabaseService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private location: Location ) {
      const tableScaned = this.databaseService.getTableScaned();
      if (tableScaned) {
        this.codigoMesa = tableScaned.codigo;
      } else {

      }

      const establishmentCurrent = this.databaseService.getEstablishmentPage();
      if (establishmentCurrent) {
        this.nomeEstabelecimento = establishmentCurrent.nome;
        this.descricaoEstabelecimento = establishmentCurrent.descricao;
        this.urlLogoEstabelecimento = establishmentCurrent.logo;
      } else {
        console.log('Estabelecimento não encontrado');
      }
     }

  ngOnInit() {
  }

  confirmarEstabelecimento() {
    try {

      const currentConsumer = this.authenticationService.getCurrentConsumer();
      const establishment = this.databaseService.getEstablishmentPage();
      const tableScaned = this.databaseService.getTableScaned();

      this.orderService.getCurrentOrderWithValorTotal().then((currentOrder: CurrentOrder) => {
        if (currentOrder) {
          this.router.navigate(['/estabelecimento/' + establishment.id]);
          this.location.back();
        } else {
          this.orderService.OpenOrder(currentConsumer, establishment, tableScaned);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  dismiss() {
    this.router.navigate(['/buscar-mesa']);
  }

}
