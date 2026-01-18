import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EventRegistrationModel } from '@/app/features/events/models/event-registration.model';
import { EventModel } from '@/app/features/events/models/event.model';
import { RegisterAttendeeDto } from '@/app/features/events/dto/register-attendee.dto';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  readonly http = inject(HttpClient);
  readonly baseUrl = environment.apiBaseUrl;

  getEvents(): Observable<ApiResponse<EventModel[]>> {
    return this.http.get<ApiResponse<EventModel[]>>(`${this.baseUrl}/events`);
  }

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
