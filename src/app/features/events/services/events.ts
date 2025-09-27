import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response.interface';
import { EventModel } from '../models/event.model';
import { LTHMIProfile } from '../models/registered-attendee.model';
import { RegisterAttendeeDto } from '../models/register-attendee.dto';
import { environment } from '../../../../environments/environment';
import { CheckInAttendeeDto } from '../models/check-in-attendee.dto';

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

  getAllRegisteredAttendees(eventId: string): Observable<ApiResponse<LTHMIProfile[]>> {
    return this.http.get<ApiResponse<LTHMIProfile[]>>(`${this.baseUrl}/event-registrations/?event-id=${eventId}`).pipe(
      catchError((error) => {
        console.error('Error fetching registered attendees:', error);
        return throwError(() => error);
      })
    )
  }

  getAllCheckedInAttendees(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/attendance/organization/0d240a79-16e2-40f3-939b-eccba5324f80/attendance-type/8c5931b3-bd00-48a3-a434-cccc23075bbd?week=39`).pipe(
      catchError((error) => {
        console.error('Error fetching checked in attendees:', error);
        return throwError(() => error);
      })
    )
  }

  registerAttendee(dto: RegisterAttendeeDto): Observable<ApiResponse<EventModel>> {
    return this.http.post<ApiResponse<EventModel>>(`${this.baseUrl}/event-registrations`, dto);
  }

  checkInAttendee(dto: CheckInAttendeeDto): Observable<ApiResponse<EventModel>> {
    return this.http.post<ApiResponse<EventModel>>(`${this.baseUrl}/attendance`, dto);
  }
}
