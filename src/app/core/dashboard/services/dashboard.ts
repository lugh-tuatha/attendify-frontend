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

  getTrendsByTimeframe(timeframe: string, year: string, organizationId: string, eventId: string): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}/dashboard/attendance/trends/${timeframe}`
    const paramsConfig: { [param: string]: string } = { year, organizationId, eventId };
    const params = new HttpParams({ fromObject: paramsConfig });

    return this.http.get<ApiResponse<any>>(url, { params });
  }
}
