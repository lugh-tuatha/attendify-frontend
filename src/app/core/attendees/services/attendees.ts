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
    searchTerm?: string
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
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return this.http.get<PaginatedResponse<AttendeeModel>>(url, { params }).pipe(
      tap((response) => {
        this.cache.set(cacheKey, response);
      })
    );
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
