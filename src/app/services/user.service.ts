import { Alerta } from './../Utils/Alerta';
import { Consumer } from './../models/Consumer';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConsumerService } from './consumer.service';


@Injectable()
export class UserService {
    private consumerTeste: Consumer;
    private user: User;
    API_URL = environment.URL_API;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private afAuth: AngularFireAuth, private http: HttpClient, private router: Router,
        public afStore: AngularFirestore, private consumerApi: ConsumerService, ) { }

    async realizarCadastroFireBase(email: string, password: string, username: string): Promise<boolean> {
        try {
            let sucesso = false;
            const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then( async (result) => {
                if (result.user) {

                    const today = new Date();

                      const consumer: Consumer = {
                        id: 0,
                        nome: username,
                        datanascimento: new Date,
                        celular: today.getTime().toString(),
                        usuario: {
                            id: 0,
                            email: email,
                            uid: result.user.uid,
                            enumorigemcriacao: 2,
                            ativo: true
                        }
                    };

                    const consumidorRetorno = await new Promise<Consumer>(resolve =>
                        this.consumerApi.create(consumer)
                         .subscribe(dataConsumidor => {
                           resolve(dataConsumidor);
                         }));

                    if (consumidorRetorno) {
                        const currentUser: User = consumidorRetorno.usuario;
                        this.setUser(currentUser);
                        sucesso = true;
                    }
                }
            });

            return sucesso;
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

    async realizarLoginFireBase(username: string, password: string): Promise<boolean> {
        try {

            const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);

            if (res.user) {
                this.setUser({
                    id: 0,
                    email: username,
                    enumorigemcriacao: 0,
                    ativo: false,
                    uid: res.user.uid
                });
                this.router.navigate(['/home']);
                //this.processando = false;
            }
            //this.processando = false;
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

    getByEmail(email: string) {
        return this.http.get(this.API_URL + '/usuario?email=' + email + '&ativo=true')
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
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

    setUser(user: User) {
        this.user = user;
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
}
