import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';
import { resolve } from 'url';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  username: '';
  password: '';
  email = '';
  cpassword: '';
  emCarregamento = false;
  private loading;

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public userService: UserService,
    public authenticationservice: AuthenticationService,
    public modalController: ModalController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  async register() {
    this.emCarregamento = true;
    this.presentLoading();

    const { username, password, cpassword, email } = this;

    if (username.length === 0) {
      this.showAlert('Erro', 'Informe o usuário');
      this.pararCarregamento();
      return;
    }

    if ( password.length === 0 || cpassword.length === 0) {
      this.showAlert('Erro', 'Informe a senha');
      this.pararCarregamento();
      return;
    }

    if (password !== cpassword) {
      this.showAlert('Erro', 'Senhas não conferem');
      this.pararCarregamento();
      return console.error('Senhas não batem');
    }

    if (email.indexOf('@') === -1 || email.indexOf('.com') === -1 ) {
      this.showAlert('Erro', 'Email incorreto');
      this.pararCarregamento();
      return;
    }

    try {
      this.authenticationservice.register(email.trim(), password.trim());
    } catch (err) {
      console.dir(err);
      this.pararCarregamento();
      this.showAlert('Erro', err.message);
    }
  }

  pararCarregamento() {
    this.emCarregamento = false;
    if (this.loading) {
      this.loading.dismiss();
    }
    this.dismiss();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create(
      {
        header,
        message,
        buttons: ['Ok']
      });

    await alert.present();
  }
  dismiss() {
    this.modalController.dismiss();
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
    }, 10000);
  }

}
