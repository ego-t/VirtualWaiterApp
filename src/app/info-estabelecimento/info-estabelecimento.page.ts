import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-estabelecimento',
  templateUrl: './info-estabelecimento.page.html',
  styleUrls: ['./info-estabelecimento.page.scss'],
})
export class InfoEstabelecimentoPage implements OnInit {
  nomeEstabelecimento = '';
  descricaoEstabelecimento = '';
  urlLogoEstabelecimento = './../../assets/icon/logoApp.png';

  constructor(private modalController: ModalController, private databaseService: DatabaseService) {
    const establishmentCurrent = this.databaseService.getEstablishmentPage();
    if (establishmentCurrent) {
      this.nomeEstabelecimento = establishmentCurrent.nome;
      this.descricaoEstabelecimento = establishmentCurrent.descricao;
      this.urlLogoEstabelecimento = establishmentCurrent.logo;
    } else {
      this.fecharModal();
    }
   }

  ngOnInit() {
  }

  fecharModal() {
    this.modalController.dismiss();
  }
}
