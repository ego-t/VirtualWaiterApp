import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  usuarioLogado = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private user: UserService,
    private afAuth: AngularFireAuth,
  ) {
    this.initializeApp();
    this.usuarioLogado = true;
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.usuarioLogado = this.afAuth.auth.currentUser.isAnonymous;
    //   } else {
    //     this.usuarioLogado = false;
    //   }
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  btnPerfil() {
    this.router.navigate(['/perfil']);
  }

  btnHome() {
    this.router.navigate(['/home']);
  }

  btnSair() {
    const res = this.afAuth.auth.signOut();

    console.log(res);

    this.router.navigate(['/login'])
  }
}
