import { ControlService } from './../services/control.service';
import { Component, OnInit } from '@angular/core';
import { Control } from '../models/Control';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';
import { OrderService } from '../services/order.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-lista-comanda',
  templateUrl: './lista-comanda.page.html',
  styleUrls: ['./lista-comanda.page.scss'],
})
export class ListaComandaPage implements OnInit {
  controls: Control[];
  controlsAPI: Array<Control> = [];
  arrayPos = 0;
  private emCarregamento;

  constructor(
    private controlService: ControlService,
    private loadingController: LoadingController,
    // private router: Router,
    // private location: Location,
    // private orderService: OrderService,
    private authenticationService: AuthenticationService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
  }

  async loadListagem() {
    this.emCarregamento = true;
    const currentConsumer = this.authenticationService.getCurrentConsumer();

    await this.controlService.getByResponsavelId(currentConsumer.id).toPromise().then((data: Control[]) => {
      console.log(data[this.arrayPos]);
      if (data[this.arrayPos] != null) {
        //this.estabelecimento = data[this.arrayPos];
        //this.menu = data[this.arrayPos].cardapio;
        this.controlsAPI = data;
        this.controls = this.controlsAPI;
        //this.filtrarPesquisa();

        console.log(data);
      }
    }).catch((error: Error) => {
      console.log(error);
    }).finally( () => {
      this.emCarregamento = false;
      console.log('finale');
    });
  }

  ionViewDidEnter() {
    console.log('Entrou na tela Estabelecimento');
    this.loadListagem();
    //this.atualizarTotalPedido();
  }

}
