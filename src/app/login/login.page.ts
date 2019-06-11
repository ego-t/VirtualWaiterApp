import { CadastroPage } from './../cadastro/cadastro.page';
import { Alerta } from './../Utils/Alerta';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';

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
    public user: UserService,
    public router: Router,
    public alerta: Alerta,
    public modalController: ModalController,
    ) {
      this.processando = true;
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.router.navigate(['/home']);
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

      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);

      if (res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        });
        this.router.navigate(['/home']);
        this.processando = false;
      }

      console.log(this.user.getUID());
      this.processando = false;

    } catch (err) {
      console.dir(err);

      let msgRetorno = '';

      switch (err.code) {
        case 'auth/invalid-email':
          msgRetorno = 'Usuário inválido';
          break;
        case 'auth/user-not-found':
          msgRetorno = 'Usuário não encontrado';
          break;
        case 'auth/network-request-failed':
          msgRetorno = 'Não foi possível se conectar a rede';
          break;
        case 'auth/wrong-password':
          msgRetorno = 'Senha inválida';
          break;
        default:
          msgRetorno = 'Ocorreu um erro não conhecido.';
          break;
      }

      if (msgRetorno !== '') {
        this.alerta.showAlert('Error', msgRetorno);
      }

      console.log(err);
      this.processando = false;
    }
  }
}
