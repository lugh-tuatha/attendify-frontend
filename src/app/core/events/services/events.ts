import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { EventRegistrationModel } from '@/app/core/events/models/event-registration.model';
import { EventModel } from '@/app/core/events/models/event.model';
import { RegisterAttendeeDto } from '@/app/core/events/dto/register-attendee.dto';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { environment } from '@/environments/environment';
import { AttendanceModel } from '../../attendance/models/attendance.model';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getEventsByCategory(category: string): Observable<ApiResponse<EventModel[]>> {  
    return this.http.get<ApiResponse<EventModel[]>>(`${this.baseUrl}/events/category/${category}`);
  }

  getEventById(id: string): Observable<ApiResponse<EventModel>> {
    return this.http.get<ApiResponse<EventModel>>(`${this.baseUrl}/events/${id}`)
  }

  getEventBySlug(slug: string): Observable<ApiResponse<EventModel>> {
    return this.http.get<ApiResponse<EventModel>>(`${this.baseUrl}/events/slug/${slug}`)
  }

  getRegisteredAttendees(eventId: string): Observable<ApiResponse<EventRegistrationModel[]>> {
    return this.http.get<ApiResponse<EventRegistrationModel[]>>(`${this.baseUrl}/event-registrations/event-id/${eventId}`);
  }

  registerAttendee(dto: RegisterAttendeeDto): Observable<ApiResponse<EventRegistrationModel>> {
    return this.http.post<ApiResponse<EventRegistrationModel>>(`${this.baseUrl}/event-registrations`, dto);
  }
}
