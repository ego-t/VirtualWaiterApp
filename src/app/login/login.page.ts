import { CadastroPage } from './../cadastro/cadastro.page';
import { Alerta } from './../Utils/Alerta';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';
import { User } from '../models/User';

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
    public modalController: ModalController,
    ) {
      this.processando = true;
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userService.definirUsuarioLogado(user).then( () => {
            this.router.navigate(['/home']);
          });
        } else {
          console.log('Usuario não logado no firebase');
        }

        this.processando = false;
      });
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

      this.userService.realizarLoginFireBase(username, password).then( (sucesso) => {
        console.log('Login feito com sucesso!');
        this.processando = false;
      } ).catch( (error: Error) => {
        this.alerta.showAlert('Não foi possível realizar o login :/', error.message);
        this.processando = false;
      } );
      //this.processando = false;
    }
    catch (erro) {
      console.log(erro);
    }
  }
}
