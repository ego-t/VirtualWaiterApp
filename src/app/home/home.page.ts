import { Establishment } from './../models/Establishment';
import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from '../services/Establishment.service';
import { LoadingController } from '@ionic/angular';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Alerta } from '../Utils/Alerta';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  estabelecimentos: Establishment[];
  private loading;

  constructor(private establishmentService: EstablishmentService,
    private orderService: OrderService,
    public loadingController: LoadingController,
    private router: Router,
      private alerta: Alerta,
      private dataBaseService: DatabaseService
    ) {
      this.dataBaseService.setEstablishmentPage(null);
    }

  listarEstabelecimentos() {
    //this.presentLoading();
    this.establishmentService.getAtivos().subscribe((data) => {
      this.estabelecimentos = data;
      //this.loading.dismiss();
    });
  }

  ionViewDidEnter() {
    this.listarEstabelecimentos();
    this.orderService.updateOrder();
  }

  presentLoading() {
    this.loadingController.create({
      message: 'Carregando',
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });

    setTimeout(() => {
      this.loading.dismiss();
    }, 4000);
  }

  goTo(idItem: string) {
    try {
      this.router.navigate(['/estabelecimento/' + idItem]);
    } catch (e) {
      this.alerta.showAlert('Ops', e);
    }
  }

  ngOnInit() {
  }
}
