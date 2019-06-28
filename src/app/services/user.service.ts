import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class UserService {
    private user: User;
    API_URL = environment.URL_API;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, public afStore: AngularFirestore, ) { }

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
            console.log(errorMessageAux);
        } catch (error) {

        }
        console.log(errorMessage);
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
}
