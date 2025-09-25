import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response.interface';
import { EventModel } from '../models/event.model';
import { LTHMIProfile } from '../models/registered-attendee.model';
import { RegisterAttendeeDto } from '../models/register-attendee.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getEvents(): Observable<ApiResponse<EventModel[]>> {
    return this.http.get<ApiResponse<EventModel[]>>(`${this.baseUrl}/events`).pipe(
      catchError((error) => {
        console.error('Error fetching events:', error);
        return throwError(() => error);
      })
    )
  }

  getEventById(id: string): Observable<ApiResponse<EventModel>> {
    return this.http.get<ApiResponse<EventModel>>(`${this.baseUrl}/events/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching event:', error);
        return throwError(() => error);
      })
    )
  }

  getAllRegisteredAttendees(id: string): Observable<ApiResponse<LTHMIProfile[]>> {
    return this.http.get<ApiResponse<LTHMIProfile[]>>(`${this.baseUrl}/event-registrations/?event-id=${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching registered attendees:', error);
        return throwError(() => error);
      })
    )
  }

  registerAttendee(dto: RegisterAttendeeDto): Observable<ApiResponse<EventModel>> {
    return this.http.post<ApiResponse<EventModel>>(`${this.baseUrl}/event-registrations`, dto);
  }
}
