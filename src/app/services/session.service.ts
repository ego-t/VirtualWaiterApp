import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Session } from '../models/Session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // we can now access environment.apiUrl
  API_URL = environment.URL_API;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(session: Session): Observable<Session> {
    return this.http.post<Session>(
      this.API_URL + '/secao/',
      JSON.stringify(session),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(session: Session): Observable<Session> {
    return this.http.post<Session>(
      this.API_URL + '/secao/',
      JSON.stringify(session),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateList(sessionList: Session[]) {
    return this.http.post<Session>(
      this.API_URL + '/secao/',
      JSON.stringify(sessionList),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/secao?ativo=true')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/secao?id='  + id + '&ativo=true')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getByMenuId(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/secao?cardapio='  + id + '&ativo=true')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getRecomendadaByEstablishmentId(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/secao/recomendada?id='  + id)
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
    alert(errorMessage);
    return throwError(errorMessage);
  }
}
