import { Injectable } from '@angular/core';
import { Observable,  throwError } from 'rxjs';
import {  catchError,   retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Appointment } from '../models/appointment-model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${environment.API_URL_APPOINTMENTS}appointment`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  delete(id: number) {
    return this.httpClient.delete(`${environment.API_URL_APPOINTMENTS}appointment/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>(`${environment.API_URL_APPOINTMENTS}appointment`, appointment, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  
}
