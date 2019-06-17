import { User } from './../models/User';
import { Consumer } from './../models/Consumer';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConsumerService } from './consumer.service';
import { NavController, ModalController } from '@ionic/angular';

@Injectable()
export class UserService {
    private user: User;
    private userFirebase: firebase.User;
    API_URL = environment.URL_API;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private afAuth: AngularFireAuth, private http: HttpClient, private router: Router,
        public afStore: AngularFirestore, private consumerApi: ConsumerService,
        private modalController: ModalController ) { }

    async realizarCadastroFireBase(email: string, password: string, username: string) {

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

        this.getByUID(userFirebase.uid).subscribe( (userData: User[]) => {
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
                    this.setUser(dataConsumidor.usuario);
                    console.log('Consumidor criado!');
                    console.log(dataConsumidor);
                    this.router.navigate(['/home']);
                    this.modalController.dismiss();
                });
        });
    }

    async realizarLoginFireBase(username: string, password: string): Promise<boolean> {
        try {

            const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);

            if (res.user) {
                this.definirUsuarioLogado(res.user).then((retorno) => {
                    this.router.navigate(['/home']);
                });
            }
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

    async definirUsuarioLogado(userFireBase: firebase.User) {
        await this.getByUID(userFireBase.uid).toPromise().then((usuarioRetorno: User[]) => {
            if (usuarioRetorno.length > 0) {
                this.setUser(usuarioRetorno[0]);
            }
        });
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

    getAll() {
        return this.http.get(this.API_URL + '/usuario' + '?ativo=true')
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/usuario?id=' + id + '&ativo=true')
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    getByEmail(email: string): Observable<User> {
        return this.http.get<User>(this.API_URL + '/usuario?email=' + email + '&ativo=true')
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    getByUID(uid: string): Observable<any> {
        return this.http.get<User>(this.API_URL + '/usuario?uid=' + uid + '&ativo=true')
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(this.API_URL + '/usuario/', JSON.stringify(user), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    update() {
        /* return this.http.put('/api/users/' + user.id, user); */
    }

    // Error handling
    handleError(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        try {
            let errorMessageAux = `Error Code: ${error.error}\nMessage: ${error.error.message}`;
            window.alert(errorMessageAux);
        } catch (error) {

        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

    setUser(user: User) {
        this.user = user;
        console.log('SetUser');
        console.log(user);
    }

    getUser(): User {
        return this.user;
    }

    getUID(): string {
        return this.user.uid
    }

    async isAuthenticated() {
        if (this.user) {
            return true;
        }

        const user = await this.afAuth.authState.pipe(first()).toPromise();

        if (user) {
            return true;
        }
        return false;
    }

    async getObjectUserByUID(uidUser): Promise<User> {
        let retorno: User;

        retorno = await new Promise<User>((resolve) =>
            this.getByUID(uidUser)
                .subscribe(usuarioRetorno => {
                    if (usuarioRetorno.length > 0) {
                        resolve(usuarioRetorno[0]);
                    }
                }));

        return retorno;
    }
}
