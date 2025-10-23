import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response.interface';
import { AttendanceRecord, EventModel, EventRegistration } from '../models/event.model';
import { RegisterAttendeeDto } from '../models/register-attendee.dto';
import { environment } from '../../../../environments/environment';
import { CheckInAttendeeDto } from '../models/check-in-attendee.dto';
import { CheckInByFaceDto } from '../models/check-in-by-face.dto';

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

  getRegisteredAttendees(eventId: string, searchTerm?: string): Observable<ApiResponse<EventRegistration[]>> {
    let params = new HttpParams();
    const url = `${this.baseUrl}/events/${eventId}/attendees`

    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http.get<ApiResponse<EventRegistration[]>>(url, { params }).pipe(
      catchError((error) => {
        console.error('Error fetching registered attendees:', error);
        return throwError(() => error);
      })
    )
  }

  registerAttendee(dto: RegisterAttendeeDto): Observable<ApiResponse<EventRegistration>> {
    return this.http.post<ApiResponse<EventRegistration>>(`${this.baseUrl}/event-registrations`, dto);
  }

  getCheckedInAttendees(eventId: string, searchTerm?: string): Observable<ApiResponse<AttendanceRecord[]>> {
    let params = new HttpParams();
    params = params.set('eventId', eventId);
    const url = `${this.baseUrl}/attendance`

    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http.get<ApiResponse<AttendanceRecord[]>>(url, { params }).pipe(
      catchError((error) => {
        console.error('Error fetching checked in attendees:', error);
        return throwError(() => error);
      })
    )
  }

  checkInAttendee(dto: CheckInAttendeeDto): Observable<ApiResponse<AttendanceRecord>> {
    return this.http.post<ApiResponse<AttendanceRecord>>(`${this.baseUrl}/attendance`, dto);
  }

  checkInByFace(dto: CheckInByFaceDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/attendance/face`, dto);
  }
}
