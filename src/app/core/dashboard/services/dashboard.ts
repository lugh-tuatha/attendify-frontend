import { environment } from '@/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../models/api-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getTrendsByTimeframe(from: Date, to: Date, organizationId: string, eventId: string): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}/dashboard/attendance/trends`
    const paramsConfig: { [param: string]: string } = { 
      from: from.toISOString(), 
      to: to.toISOString(), 
      organizationId, 
      eventId 
    };
    const params = new HttpParams({ fromObject: paramsConfig });

    return this.http.get<ApiResponse<any>>(url, { params });
  }

  getAttendeesOverview(organizationId: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/dashboard/attendees/overview/${organizationId}`);
  }
}
