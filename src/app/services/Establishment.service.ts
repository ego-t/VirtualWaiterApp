import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Establishment } from '../models/Establishment';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  API_URL = environment.URL_API;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(establishment: Establishment): Observable<Establishment> {
    return this.http.post<Establishment>(
      this.API_URL + '/estabelecimento/',
      JSON.stringify(establishment),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(establishment: Establishment): Observable<Establishment> {
    return this.http.post<Establishment>(
      this.API_URL + '/estabelecimento/',
      JSON.stringify(establishment),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/estabelecimento')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }
  getAtivos(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/estabelecimento?ativo=true')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/estabelecimento?id=' + id)
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
