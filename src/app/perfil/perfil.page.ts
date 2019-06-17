import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss', './../style/EstiloPadrao.scss'],
})
export class PerfilPage implements OnInit {
  nomeConsumidor = 'Eduardo Couto Rodrigues';
  email = '';
  celular = '';
  dataNascimento = new Date().toLocaleDateString();
  private loading;
  emCarregamento = false;

  constructor(public afAuth: AngularFireAuth,
    public loadingController: LoadingController,
    private navCtrl: NavController,
    private datePicker: DatePicker,
    private userService: UserService) {
      this.emCarregamento = true;
      this.presentLoading();
      this.afAuth.authState.subscribe(user => {
      if (user) {
        if (user.displayName == null || user.displayName === '') {
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
    this.loadPerfil();
  }

  loadPerfil() {
    //this.presentLoading();
    console.log(this.userService.getUser());
    // this.idconsumidor = Number(this.route.snapshot.paramMap.get('id'));

    // await this.establishmentApi.getById(this.idconsumidor).subscribe((data) => {
    //   console.log(data[this.arrayPos]);
    //   if (data[this.arrayPos] != null) {
    //     this.estabelecimento = data[this.arrayPos];
    //     this.menu = data[this.arrayPos].cardapio;
    //     this.secoesApi = this.menu.secoes;
    //     this.nomeconsumidor = this.estabelecimento.nome;
    //     this.urlLogoconsumidor = this.estabelecimento.logo;
    //     this.filtrarPesquisa();
    //     this.loading.dismiss();
    //     console.log(this.menu);
    //     this.emCarregamento = false;
    //   }
    // });
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

  selecionarDataNascimento() {
    console.log(this.dataNascimento);
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => this.dataNascimento = date.toLocaleDateString(),
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
