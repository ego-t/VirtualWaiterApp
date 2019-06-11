import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nomeConsumidor = '';
  private loading;

  constructor(public afAuth: AngularFireAuth,
    public loadingController: LoadingController,
    private navCtrl: NavController) {

      this.presentLoading();
      this.afAuth.authState.subscribe(user => {
      if (user) {
        if (user.displayName === '') {
          this.nomeConsumidor = 'Usuario' + Math.floor(Math.random() * (2000 - 100)) + 100;
        } else {
          this.nomeConsumidor = user.displayName;
        }
        this.loading.dismiss();
        console.log(user);
      }
    });
  }

  ionViewDidEnter() {
  }

  presentLoading() {
    this.loadingController.create({
      message: 'Carregando',
    }).then( (overlay) => {
      this.loading = overlay;
      this.loading.present();
    });
    setTimeout(() => {
      this.loading.dismiss();
    }, 4000);
  }
  voltarPagina() {
    this.navCtrl.back();
  }

  ngOnInit() {
  }
}
