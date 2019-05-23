import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-estabelecimento',
  templateUrl: './info-estabelecimento.page.html',
  styleUrls: ['./info-estabelecimento.page.scss'],
})
export class InfoEstabelecimentoPage implements OnInit {

  constructor(public modalController: ModalController) {  }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
