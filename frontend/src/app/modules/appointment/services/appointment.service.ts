import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${environment.API_URL_APPOINTMENTS}appointments`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.API_URL_APPOINTMENTS}appointments/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>(`${environment.API_URL_APPOINTMENTS}appointments`, appointment, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, updatedAppointment: Appointment): Observable<Appointment> {
    const url = `${environment.API_URL_APPOINTMENTS}appointments/${id}`;
    return this.httpClient.put<Appointment>(url, updatedAppointment, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Appointment> {
    const url = `${environment.API_URL_APPOINTMENTS}appointments/${id}`;
    return this.httpClient.get<Appointment>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
