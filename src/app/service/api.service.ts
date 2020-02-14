import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  baseUri:string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  // Create
  createQoe(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    console.log('DATA ADDED');
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Qoe
  getQoes() {
    return this.http
      .get(`${this.baseUri}`)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })  
      );
  }

    // Get all Qoe
  getSessionsQoes() {
    return this.http
      .get(`${this.baseUri}/session`)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })  
      );
  }

    // Get Qoe
  getSession(id, option=null): Observable<any> {
    let url = `${this.baseUri}/session/${id}`+ ((option)? `/${option}` : ``) ;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        this._refreshNeeded$.next();
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

    // Get all Qoe
  getLatLonQoes() {
    let url = `${this.baseUri}/latlon`;
    return this.http.get(url)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })  
      );
  }

  

  // Get Qoe
  getQoe(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update Qoe
  updateQoe(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete Qoe
  deleteSession(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
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