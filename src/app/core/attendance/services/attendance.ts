import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment';
import { AttendanceModel } from '@/app/core/attendance/models/attendance.model';
import { PaginatedResponse } from '@/app/core/models/paginated-api-response.interface';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { CheckInAttendeeDto } from '@/app/core/attendance/dto/check-in-attendee.dto';
import { CheckInByFaceDto } from '@/app/core/attendance/dto/check-in-by-face.dto';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getAttendanceRecord(
    organizationId: string,
    slug: string, 
    date: string, 
    searchTerm?: string,
    page: number = 4, 
    limit: number = 50, 
  ): Observable<PaginatedResponse<AttendanceModel[]>> {
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

    return this.http.get<PaginatedResponse<AttendanceModel[]>>(url, { params })
  }
  

  getCheckedInAttendees(eventId: string, searchTerm?: string): Observable<ApiResponse<AttendanceModel[]>> {
    const url = `${this.baseUrl}/attendance`

    const paramsConfig: { [param: string]: string } = { eventId };
    if (searchTerm) {
      paramsConfig['search'] = searchTerm;
    }

    const params = new HttpParams({ fromObject: paramsConfig });

    return this.http.get<ApiResponse<AttendanceModel[]>>(url, { params })
  }

  checkInAttendee(dto: CheckInAttendeeDto): Observable<ApiResponse<AttendanceModel>> {
    return this.http.post<ApiResponse<AttendanceModel>>(`${this.baseUrl}/attendance`, dto);
  }

  checkInByFace(dto: CheckInByFaceDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/attendance/face`, dto);
  }
}
