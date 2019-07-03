import { DatabaseService } from 'src/app/services/database.service';
import { AuthenticationService } from './../services/authentication.service';
import { CadastroPage } from './../cadastro/cadastro.page';
import { Alerta } from './../Utils/Alerta';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';
import { User } from '../models/User';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', './../style/EstiloPadrao.scss'],
})
export class LoginPage implements OnInit {
  srcImg = '../../../resources/logoComDescricao.png';
  username = '';
  password = '';
  processando = false;
  loginManual = false;

  constructor(public afAuth: AngularFireAuth,
    public userService: UserService,
    public router: Router,
    public alerta: Alerta,
    public authenticationservice: AuthenticationService,
    public modalController: ModalController,
    private orderService: OrderService,
    private databaseService: DatabaseService
    ) {
      this.authenticationservice.logout();
      this.orderService.removerOrder();
      this.databaseService.setTableScaned(null);
      this.processando = false;
    }

  ngOnInit() {
  }

  async abrirPageCadastro() {
    const modal = await this.modalController.create({
      component: CadastroPage
    });
    modal.present();
  }

  async login() {
    const {username , password} = this;

    try {
      this.processando = true;

      this.authenticationservice.realizarLoginFireBase(username.trim(), password.trim()).then( (sucesso) => {
      } ).catch( (error: Error) => {
        this.alerta.showAlert('Não foi possível realizar o login :/', error.message);
      } ).finally( () => {
        this.processando = false;
      });
    } catch (erro) {
      console.log(erro);
    }
  }
}
