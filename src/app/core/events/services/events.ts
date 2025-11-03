import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { EventRegistrationModel } from '@/app/core/events/models/event-registration.model';
import { EventModel } from '@/app/core/events/models/event.model';
import { RegisterAttendeeDto } from '@/app/core/events/dto/register-attendee.dto';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { environment } from '@/environments/environment';

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
