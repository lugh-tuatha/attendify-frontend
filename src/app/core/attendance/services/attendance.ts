import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { environment } from '@/environments/environment';
import { AttendanceModel } from '@/app/core/attendance/models/attendance.model';
import { PaginatedResponse } from '@/app/core/models/paginated-api-response.interface';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { CheckInAttendeeDto } from '@/app/core/attendance/dto/check-in-attendee.dto';
import { CheckInByFaceDto } from '@/app/core/attendance/dto/check-in-by-face.dto';
import { VipAttendanceModel } from '../models/vip-attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  private cache = new Map<string, PaginatedResponse<AttendanceModel>>();

  clearCache(): void {
    this.cache.clear();
    console.log('Attendance cache cleared.');
  }

  getAttendanceRecord(
    organizationId: string,
    slug: string, 
    date: string, 
    page: number = 1, 
    limit: number = 10, 
    searchTerm?: string,
    forceRefresh: boolean = false
  ): Observable<PaginatedResponse<AttendanceModel>> {
    const url = `${this.baseUrl}/attendance`;

    const paramsConfig: { [param: string]: string | number } = {
      organizationId,
      slug,
      date,
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

    return this.http.get<PaginatedResponse<AttendanceModel>>(url, { params }).pipe(
      tap((response) => {
        this.cache.set(cacheKey, response);
      })
    )
  }

  prefetchNextPage(
    organizationId: string,
    slug: string, 
    date: string, 
    currentPage: number = 1, 
    limit: number = 10, 
    totalItems: number,
    searchTerm?: string,
  ): void {
    const nextPage = currentPage + 1;
    const totalPages = Math.ceil(totalItems / limit);

    if (nextPage <= totalPages) {
      this.getAttendanceRecord(
        organizationId,
        slug,
        date,
        nextPage,
        limit,
        searchTerm
      ).subscribe();
    }
  }
  
  getAttendanceByEventId(eventId: string): Observable<ApiResponse<AttendanceModel[]>> {
    return this.http.get<ApiResponse<AttendanceModel[]>>(`${this.baseUrl}/attendance/event-id/${eventId}`);
  }

  checkInAttendee(dto: CheckInAttendeeDto): Observable<ApiResponse<AttendanceModel>> {
    return this.http.post<ApiResponse<AttendanceModel>>(`${this.baseUrl}/attendance`, dto);
  }

  checkInByFace(dto: CheckInByFaceDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/attendance/face`, dto);
  }

  getVipAttendanceBySlug(slug: string, date?: string): Observable<ApiResponse<VipAttendanceModel>> {
    const url = `${this.baseUrl}/attendance/slug/${slug}/vip`
    let params = new HttpParams();
    
    if (date) {
      params = params.set('date', date);
    }

    return this.http.get<ApiResponse<VipAttendanceModel>>(url, { params });
  }
}
