import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Consumer } from '../models/Consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {
  API_URL = environment.URL_API;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(consumer: Consumer): Observable<Consumer> {
    return this.http.post<Consumer>(
      this.API_URL + '/consumidor/',
      JSON.stringify(consumer),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(consumer: Consumer): Observable<Consumer> {
    return this.http.post<Consumer>(
      this.API_URL + '/consumidor/',
      JSON.stringify(consumer),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/consumidor')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }
  // PutCheckAtive
  getById(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/consumidor?id=' + id)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getByIdUsuario(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/consumidor?usuario=' + id)
    .pipe(
    retry(2),
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
    try {
      let errorMessageAux = `Error Code: ${error.error}\nMessage: ${error.error.message}`;
      window.alert(errorMessageAux);
    } catch (error) {
      
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
