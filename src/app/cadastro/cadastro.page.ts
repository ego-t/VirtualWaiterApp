import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';

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

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public userService: UserService,
    public modalController: ModalController
    ) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, cpassword, email} = this;

    if (password !== cpassword) {
      this.showAlert('Erro', 'Senhas não conferem');
      return console.error('Senhas não batem');
    }
    try {

      this.userService.realizarCadastroFireBase(email, password, username).then( (sucesso) => {

        if (sucesso) {
          this.dismiss();
          this.showAlert('Sucesso!', 'Você foi registrado!');
          this.router.navigate(['/home']);
        }
      });

    } catch (err) {
      console.dir(err);
      this.showAlert('Erro', err.message);
    }
  }

  async showAlert(header: string, message: string) {
    const alert =  await this.alert.create(
    {
      header,
      message,
      buttons : ['Ok']
    });

    await alert.present();
  }
  dismiss() {
    this.modalController.dismiss();
  }

}
