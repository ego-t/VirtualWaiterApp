import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Account} from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // we can now access environment.apiUrl
  API_URL = environment.URL_API;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(account: Account): Observable<Account> {
    return this.http.post<Account>(
      this.API_URL + '/conta/',
      JSON.stringify(account),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(account: Account): Observable<Account> {
    return this.http.post<Account>(
      this.API_URL + '/conta/',
      JSON.stringify(account),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/conta')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }
  // PutCheckAtive
  getById(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/conta?id=' + id)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getByControlId(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/conta?comanda=' + id)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
