import { AuthenticationService } from './../services/authentication.service';
import { Consumer } from './../models/Consumer';
import { ConsumerService } from './../services/consumer.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { User } from '../models/User';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss', './../style/EstiloPadrao.scss'],
})
export class PerfilPage implements OnInit {
  nomeConsumidor = '';
  email = '';
  celular = '';
  dataNascimento = new Date().toLocaleDateString();
  private loading;
  emCarregamento = false;

  constructor(public afAuth: AngularFireAuth,
    public loadingController: LoadingController,
    private navCtrl: NavController,
    private datePicker: DatePicker,
    private userService: UserService,
    private consumerApi: ConsumerService,
    private authenticationService: AuthenticationService
    ) {
      this.emCarregamento = true;
      //this.presentLoading();
  }

  ionViewDidEnter() {
    this.loadPerfil();
  }

  loadPerfil() {
    const consumer: Consumer = this.authenticationService.getCurrentConsumer();

    if (consumer) {
      this.nomeConsumidor = consumer.nome;
      this.celular = consumer.celular;
      this.email = consumer.usuario.email;
      if (consumer.datanascimento) {
        this.dataNascimento = consumer.datanascimento.toLocaleDateString();
      }
    }
    this.loading.dismiss();
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
    }, 1000);
  }
  voltarPagina() {
    this.navCtrl.back();
  }

  ngOnInit() {
  }

  selecionarDataNascimento() {
    console.log(this.dataNascimento);
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => this.dataNascimento = date.toLocaleDateString(),
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
