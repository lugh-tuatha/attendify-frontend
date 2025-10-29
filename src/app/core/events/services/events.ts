import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { AttendanceModel } from '@/app/core/attendance/models/attendance.model';
import { EventRegistrationModel } from '@/app/core/events/models/event-registration.model';
import { EventModel } from '@/app/core/events/models/event.model';
import { RegisterAttendeeDto } from '@/app/core/events/dto/register-attendee.dto';
import { CheckInAttendeeDto } from '@/app/core/attendance/dto/check-in-attendee.dto';
import { CheckInByFaceDto } from '@/app/core/attendance/dto/check-in-by-face.dto';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getEvents(): Observable<ApiResponse<EventModel[]>> {  
    return this.http.get<ApiResponse<EventModel[]>>(`${this.baseUrl}/events`);
  }

  getEventById(id: string): Observable<ApiResponse<EventModel>> {
    return this.http.get<ApiResponse<EventModel>>(`${this.baseUrl}/events/${id}`)
  }

  getRegisteredAttendees(eventId: string, searchTerm?: string): Observable<ApiResponse<EventRegistrationModel[]>> {
    const url = `${this.baseUrl}/events/${eventId}/attendees`

    const paramsConfig: { [param: string]: string } = {};
    if (searchTerm) {
      paramsConfig['search'] = searchTerm;
    }

    const params = new HttpParams({ fromObject: paramsConfig });

    return this.http.get<ApiResponse<EventRegistrationModel[]>>(url, { params });
  }

  registerAttendee(dto: RegisterAttendeeDto): Observable<ApiResponse<EventRegistrationModel>> {
    return this.http.post<ApiResponse<EventRegistrationModel>>(`${this.baseUrl}/event-registrations`, dto);
  }
}
