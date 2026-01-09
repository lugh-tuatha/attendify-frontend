import { environment } from '@/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../../core/models/api-response.interface';
import { AttendanceSummaryModel } from '../models/attendance-summary.model';
import { Observable } from 'rxjs';
import { AttendanceByHierarchyModel } from '../models/attendance-by-hierarchy.model';
import { AttendanceByPrimaryLeaderModel } from '../models/attendance-by-primary-leader.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  getAttendanceSummary(eventId: string, date: string, groupBy: string): Observable<ApiResponse<AttendanceSummaryModel>> {
    const url = `${this.baseUrl}/reports/summary/attendance`
    const paramsConfig: { [param: string]: string } = { eventId, date, groupBy };
    const params = new HttpParams({ fromObject: paramsConfig });

    return this.http.get<ApiResponse<AttendanceSummaryModel>>(url, { params });
  }

  getAttendanceByHierarchy(eventId: string, date: string, churchHierarchy: string): Observable<ApiResponse<AttendanceByHierarchyModel[]>> {
    const url = `${this.baseUrl}/reports/attendance/hierarchy`
    const paramsConfig: { [param: string]: string } = { eventId, date, churchHierarchy };
    const params = new HttpParams({ fromObject: paramsConfig });

    return this.http.get<ApiResponse<AttendanceByHierarchyModel[]>>(url, { params });
  }

  getAttendanceByPrimaryLeader(eventId: string, date: string, primaryLeaderId: string): Observable<ApiResponse<AttendanceByPrimaryLeaderModel>> {
    const url = `${this.baseUrl}/reports/attendance/primary-leader`
    const paramsConfig: { [param: string]: string } = { eventId, date, primaryLeaderId };
    const params = new HttpParams({ fromObject: paramsConfig });

    return this.http.get<ApiResponse<AttendanceByPrimaryLeaderModel>>(url, { params });
  }
}
