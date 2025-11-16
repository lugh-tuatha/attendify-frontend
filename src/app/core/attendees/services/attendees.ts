import { environment } from '@/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { PaginatedResponse } from '../../models/paginated-api-response.interface';
import { AttendeeModel } from '../models/attendee.model';
import { ApiResponse } from '../../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AttendeesService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  private cache = new Map<string, PaginatedResponse<AttendeeModel>>();

  clearCache(): void {
    this.cache.clear();
    console.log('Attendees cache cleared.');
  }

  getAttendees(
    organizationId: string, 
    page: number = 1, 
    limit: number = 10, 
    searchTerm?: string,
    forceRefresh: boolean = false
  ): Observable<PaginatedResponse<AttendeeModel>> {
    const url = `${this.baseUrl}/attendees`

    const paramsConfig: { [param: string]: string | number } = { 
      organizationId,
      page,
      limit
    };
    if (searchTerm) {
      paramsConfig['search'] = searchTerm;
    }

    const params = new HttpParams({ fromObject: paramsConfig });

    const cacheKey = `${url}?${params.toString()}`;
    const cachedResponse = this.cache.get(cacheKey);
    if (!forceRefresh && cachedResponse) {
      return of(cachedResponse);
    }

    return this.http.get<PaginatedResponse<AttendeeModel>>(url, { params }).pipe(
      tap((response) => {
        this.cache.set(cacheKey, response);
      })
    );
  }

  createAttendee(payload: AttendeeModel): Observable<ApiResponse<AttendeeModel>> {
    return this.http.post<ApiResponse<AttendeeModel>>(`${this.baseUrl}/attendees`, payload);
  }

  getAttendeeById(attendeeId: string): Observable<ApiResponse<AttendeeModel>> {
    return this.http.get<ApiResponse<AttendeeModel>>(`${this.baseUrl}/attendees/${attendeeId}`);
  }

  getAttendeesByChurchHierarchy(churchHierarchy: string): Observable<ApiResponse<AttendeeModel[]>> {
    return this.http.get<ApiResponse<AttendeeModel[]>>(`${this.baseUrl}/attendees/church-hierarchy/${churchHierarchy}`);
  }

  updateAttendee(attendeeId: string, payload: AttendeeModel): Observable<ApiResponse<AttendeeModel>> {
    return this.http.patch<ApiResponse<AttendeeModel>>(`${this.baseUrl}/attendees/${attendeeId}`, payload);
  }

  archiveAttendee(attendeeId: string): Observable<ApiResponse<AttendeeModel>> {
    return this.http.patch<ApiResponse<AttendeeModel>>(`${this.baseUrl}/attendees/${attendeeId}`, { isArchived: true });
  }

  prefetchNextPage(
    organizationId: string, 
    currentPage: number = 1, 
    limit: number = 10, 
    totalItems: number,
    searchTerm?: string
  ): void {
    const nextPage = currentPage + 1;
    const totalPages = Math.ceil(totalItems / limit);

    if (nextPage <= totalPages) {
      this.getAttendees(
        organizationId,
        nextPage,
        limit,
        searchTerm
      ).subscribe();
    }
  }
}
