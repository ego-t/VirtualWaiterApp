import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Table } from '../models/Table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  // we can now access environment.apiUrl
  API_URL = environment.URL_API;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(table: Table): Observable<Table> {
    return this.http.post<Table>(this.API_URL + '/mesa/', JSON.stringify(table), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  update(table: Table): Observable<Table> {
    return this.http.post<Table>(this.API_URL + '/mesa/', JSON.stringify(table), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  remove(table: Table): Observable<Table> {
    table.ativo = false;
    return this.http.post<Table>(this.API_URL + '/mesa/', JSON.stringify(table), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/mesa')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/mesa?id='  + id + '&ativo=true')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getByEstablishmentId(id: number) {
    return this.http.get(this.API_URL + '/mesa?estabelecimento=' + id + '&ativo=true')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getByCodigoMesa(codigo: string) {
    return this.http.get(this.API_URL + '/mesa?codigo=' + codigo + '&ativo=true')
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
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
