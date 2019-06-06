import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL = environment.URL_API;

  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http: HttpClient) {}

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(
      this.API_URL + '/produto/',
      JSON.stringify(product),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(product: Product): Observable<Product> {
    return this.http.post<Product>(
      this.API_URL + '/produto/',
      JSON.stringify(product),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateList(productList: Product[]) {
    return this.http.post<Product>(
      this.API_URL + '/produto/',
      JSON.stringify(productList),
      this.httpOptions)
      .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/produto?ativo=true')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/produto?id=' + id + '&ativo=true' )
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
