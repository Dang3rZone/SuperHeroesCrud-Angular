import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/superList/';

  constructor(private http: HttpClient) {}

  postSupe(data: any): Observable<any> {
    return this.http
      .post<any>(this.baseUrl, data)
      .pipe(catchError(this.handleError));
  }

  getSupe(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(catchError(this.handleError));
  }

  putSupe(data: any, id: number): Observable<any> {
    const url = `${this.baseUrl}${id}`;
    return this.http.put<any>(url, data).pipe(catchError(this.handleError));
  }

  deleteSupe(id: number): Observable<any> {
    const url = `${this.baseUrl}${id}`;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
