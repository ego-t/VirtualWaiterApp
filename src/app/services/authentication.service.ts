import { Alerta } from 'src/app/Utils/Alerta';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { ConsumerService } from './consumer.service';
import { ModalController } from '@ionic/angular';
import { Consumer } from '../models/Consumer';
import { FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { environment } from 'src/environments/environment';

interface AuthenticationError {
  message: string;
  code: string;
}


@Injectable()
export class AuthenticationService {
  // Alternative for checkboxes

  dictionary: Array<string>;
  passwordLenght = 10;
  firstArrayPos = 0;
  private user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    public afStore: AngularFirestore,
    private consumerApi: ConsumerService,
    private modalController: ModalController,
    private alerta: Alerta,
  ) { }

  logout() {
    this.afAuth.auth.signOut();
    // remove user from Session storage to log user out
    sessionStorage.removeItem('currentConsumer');
    sessionStorage.removeItem('orderCurrent');
  }

  setSessionStorage(currentConsumer: Consumer, res: firebase.User) {
    if (currentConsumer && (currentConsumer.usuario.email === res.email)) {
      // store user details and jwt token in Session storage to keep user logged in between page refreshes
      sessionStorage.setItem('currentConsumer', JSON.stringify(currentConsumer));
      this.userService.setUser(currentConsumer.usuario);
      console.log('CurrentUser definido...');
    }
  }

  getCurrentConsumer(): Consumer {
    return JSON.parse(sessionStorage.getItem('currentConsumer'));
  }

  isAuthenticated(backLogin: Boolean = false) {

    this.afAuth.authState.pipe(first()).subscribe((user) => {
      if (user) {
        const currentConsumer = this.getCurrentConsumer();
        if (!currentConsumer) {
          this.logout();
          if (backLogin) {
            this.router.navigate(['/login']);
          }
        }
      }
    });
  }

  async RealizarLoginExterno(backLogin: Boolean = false) {

    const user = await this.afAuth.authState.pipe(first()).toPromise();

    if (user) {
      this.afAuth.user.subscribe((result: firebase.User) => {

        this.userService.getByUID(result.uid).toPromise().then((userData: User[]) => {

          if (userData.length > 0) {
            this.consumerApi.getByIdUsuario(userData[0].id).subscribe((consumerData: Consumer[]) => {

              if (consumerData.length > 0) {
                // Apenas definir usuario
                this.setSessionStorage(consumerData[0], result);
                this.userService.setUser(consumerData[0].usuario);
                this.router.navigate(['/home']);
              }
              else {
                //criar Consumidor
                this.registerConsumer(result);
              }
              console.log(consumerData);
            });
          } else {
            // Criar Usuario e consumidor
            this.registerConsumer(result);
          }
        }).catch((retorno: Error) => {
          console.log(retorno);
          this.logout();
          if (backLogin) {
            this.router.navigate(['/login']);
          }
        });
      });
    }
  }

  async showAlert(message: string) {
    await alert(message);
  }

  // Generate password
  generatePassword() {
    // Create array from chosen checkboxes
    this.dictionary = [].concat(
      'abcdefghijklmnopqrstuvwxyz'.split(''),
      'ABCDEFGHIJKLMNOPWRSTUVWXYZ'.split(''),
      '0123456789'.split(''),
      '!@#$%^&*-_=+\\|:;\',.\<>/?~'.split('')
    );

    // Generate random password from array
    let newPassword = '';
    for (let i = 0; i < this.passwordLenght; i++) {
      newPassword += this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
    }

    return newPassword;
  }

  atualizarPerfilFireBase(user: firebase.User, username: string, photoURL: string): Promise<firebase.User> {
    return new Promise<firebase.User>((resolve, reject) => {
      setTimeout(() => {
        user.updateProfile({
          displayName: username,
          photoURL: ''
        }).then(function () {
          user.reload();
          resolve(user);
        }).catch((error) => {
          reject(error);
        });
      }, 500);
    });
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      if (result.user) {
        this.registerConsumer(result.user);
      }
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
      throw new Error(msgRetorno);
    }

  }

  async registerConsumer(userFirebase: firebase.User) {
    const today = new Date();
    let usernameFirebase = userFirebase.displayName;

    if (usernameFirebase == null || usernameFirebase === '') {
      usernameFirebase = userFirebase.email.split('@')[0];
    }

    this.atualizarPerfilFireBase(userFirebase, usernameFirebase, '').then(() => {
      userFirebase.reload();
    });

    this.userService.getByUID(userFirebase.uid).subscribe((userData: User[]) => {
      let usuarioCriacao: User;
      let consumidorCriacao: Consumer;

      if (userData.length > 0) {
        usuarioCriacao = userData[0];
      } else {
        usuarioCriacao = {
          id: 0,
          email: userFirebase.email,
          uid: userFirebase.uid,
          enumorigemcriacao: 2,
          ativo: true
        };
      }

      consumidorCriacao = {
        id: 0,
        nome: usernameFirebase,
        datanascimento: new Date,
        celular: today.getTime().toString(),
        usuario: usuarioCriacao
      };
      this.consumerApi.create(consumidorCriacao)
        .subscribe((dataConsumidor: Consumer) => {
          this.setSessionStorage(dataConsumidor, userFirebase);
          this.userService.setUser(dataConsumidor.usuario);
          console.log('Consumidor criado!');
          console.log(dataConsumidor);
          this.router.navigate(['/home']);
          this.modalController.dismiss();
        });
    });
  }

  async realizarLoginFireBase(email: string, password: string): Promise<boolean> {
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
        if (result.user) {
          this.userService.getByUID(result.user.uid).toPromise().then((dataUsuario: User[]) => {
            if (dataUsuario.length > 0) {
              this.consumerApi.getByIdUsuario(dataUsuario[0].id).subscribe((dataConsumer: Consumer[]) => {
                if (dataConsumer.length > 0) {
                  this.setSessionStorage(dataConsumer[0], result.user);
                  this.router.navigate(['/home']);
                }
              });
            } else {
              this.RealizarLoginExterno(true);
            }
          }).catch((error: Error) => {
            this.showAlert('Problemas ao se conectar ao servidor...' + environment.URL_API);
            this.showAlert('getByUID' + error.message);
            this.logout();
          });
        }
      }).catch((error) => {
        console.dir(error);

        let msgRetorno = '';

        switch (error.code) {
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
        this.logout();
        this.alerta.showAlert(':/', msgRetorno);
        return false;
      });
      return true;
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
      throw new Error(msgRetorno);
    }
  }



  async firebaseRegister(email: string, password: string) {
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

    if (res.user) {
      this.afStore.doc(`users/${res.user.uid}`).set({
        email,
      });
      return res.user;
    }
  }
}
