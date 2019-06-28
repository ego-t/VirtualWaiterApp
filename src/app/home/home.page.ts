import { Establishment } from './../models/Establishment';
import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from '../services/Establishment.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  estabelecimentos: Establishment[];
  private loading;

  constructor(private establishmentService: EstablishmentService,
    public loadingController: LoadingController) { }

  listarEstabelecimentos() {
    this.presentLoading();
    this.establishmentService.getAll().subscribe((data) => {
      this.estabelecimentos = data;
      this.loading.dismiss();
    });
  }

  ionViewDidEnter() {
    this.listarEstabelecimentos();
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
  ngOnInit() {
  }
}
