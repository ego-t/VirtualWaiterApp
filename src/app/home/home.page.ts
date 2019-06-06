import { Establishment } from './../models/Establishment';
import { Component } from '@angular/core';
import { EstabelecimentoService } from '../services/Establishment.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  estabelecimentos: Establishment[];

  constructor(private establishmentService: EstabelecimentoService) {  }

  listarEstabelecimentos() {
    this.establishmentService.getAll().subscribe((data) =>  {
          this.estabelecimentos = data;
    });
  }

  ionViewDidEnter() {
    this.listarEstabelecimentos();
  }
}
