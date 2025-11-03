import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { forkJoin, Subscription } from 'rxjs';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LucideAngularModule, CornerDownLeft, SearchCheck } from 'lucide-angular';

import { EventModel } from '@/app/core/events/models/event.model';
import { AttendanceModel } from '@/app/core/attendance/models/attendance.model';
import { EventRegistrationModel } from '@/app/core/events/models/event-registration.model';
import { CheckInAttendeeDto } from '@/app/core/attendance/dto/check-in-attendee.dto';
import { EventsService } from '@/app/core/events/services/events';
import { AttendanceService } from '@/app/core/attendance/services/attendance';
import { StatCard } from '@/app/shared/components/stat-card/stat-card';
import { Button } from "@/app/shared/ui/button/button";
import { getWeekNumber } from '@/app/core/utils/date.utils';

@Component({
  selector: 'app-event-manage',
  imports: [
    LucideAngularModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    StatCard,
    CdkTableModule,
    MatFormFieldModule,
    MatInputModule,
    LucideAngularModule,
    DatePipe,
    Button
],
  templateUrl: './event-manage.html',
  styleUrl: './event-manage.css'
})

export class EventManage {
  readonly SearchCheck = SearchCheck;
  readonly CornerDownLeft = CornerDownLeft;

  private route = inject(ActivatedRoute);
  private eventsService = inject(EventsService);
  private attendanceService = inject(AttendanceService);
  private snackBar = inject(MatSnackBar);

  event: EventModel | null = null;
  private eventId: string | null = null

  registeredAttendeesColumns: string[] = ['fullName', 'primaryLeader', 'churchHierarchy','memberStatus', 'actions'];
  registeredAttendees = new MatTableDataSource<EventRegistrationModel>([]);
  @ViewChild('registeredPaginator') registeredPaginator!: MatPaginator;
  totalRegisteredCount = 0;
  registeredPageSize = 10;
  registeredCurrentPage = 1;

  checkedInAttendeesColumns: string[] = ['fullName', 'primaryLeader', 'churchHierarchy', 'memberStatus', 'timeArrival'];
  checkedInAttendees = new MatTableDataSource<AttendanceModel>([]);
  @ViewChild('checkedInPaginator') checkedInPaginator!: MatPaginator;
  totalCheckedInCount = 0;
  checkedInPageSize = 10;
  checkedInCurrentPage = 1;

  isLoading = {
    event: false,
    registeredAttendees: false,
    checkedInAttendees: false,
    checkingIn: false
  }

  private checkedInAttendeeIds = new Set<string>();

  private eventDataSub!: Subscription;

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (!this.eventId) return;
    this.loadInitialData(this.eventId);
  }

  ngOnDestroy(): void {
    this.eventDataSub?.unsubscribe();
  }
  
  private loadInitialData(eventId: string): void {
    this.setLoadingState(true);

    const event$ = this.eventsService.getEventById(eventId);
    const registered$ = this.eventsService.getRegisteredAttendees(eventId);
    const checkedIn$ = this.attendanceService.getCheckedInAttendees(eventId);

    this.eventDataSub = forkJoin({
      eventResponse: event$,
      registeredResponse: registered$,
      checkedInResponse: checkedIn$,
    }).subscribe({
      next: ({ eventResponse, registeredResponse, checkedInResponse }) => {
        this.event = eventResponse.data;

        this.checkedInAttendees.data = checkedInResponse.data;
        this.totalCheckedInCount = checkedInResponse.data.length;

        this.checkedInAttendeeIds.clear();
        console.log(checkedInResponse)
        checkedInResponse.data.forEach(registration => {
          this.checkedInAttendeeIds.add(registration.attendee.id);
        });

        this.registeredAttendees.data = registeredResponse.data;
        this.totalRegisteredCount = registeredResponse.data.length;

        this.setLoadingState(false)
      },
      error: (error) => {
        console.error('Error loading initial data:', error);
        this.setLoadingState(false)
      }
    })
  }

  private loadRegisteredAttendees(searchTerm?: string): void {
    if (!this.eventId) return;
    this.isLoading.registeredAttendees = true;

    this.eventsService.getRegisteredAttendees(this.eventId, searchTerm).subscribe({
      next: (response) => {
        this.registeredAttendees.data = response.data;
        this.isLoading.registeredAttendees = false;
        console.log(response.data);
      },
      error: (error) => {
        console.error('Error loading registered attendees:', error);
        this.isLoading.registeredAttendees = false;
      }
    })
  }

  private loadCheckedInAttendees(searchTerm?: string): void {  
    if (!this.eventId) return;
    this.isLoading.checkedInAttendees = true;

    this.attendanceService.getCheckedInAttendees(this.eventId, searchTerm).subscribe({
      next: (response) => {
        this.checkedInAttendees.data = response.data;

        if (searchTerm === undefined) {
          this.checkedInAttendeeIds.clear();
          response.data.forEach(attendee => {
            this.checkedInAttendeeIds.add(attendee.attendee.id);
          });
        }

        this.isLoading.checkedInAttendees = false;
      },
      error: (error) => {
        console.error('Error loading registered attendees:', error);
        this.isLoading.checkedInAttendees = false;
      }
    })
  }

  private setLoadingState(loading: boolean): void {
    this.isLoading.event = loading;
    this.isLoading.registeredAttendees = loading;
    this.isLoading.checkedInAttendees = loading;
  }

  onSearchRegisteredAttendees(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.loadRegisteredAttendees(searchTerm ? searchTerm : undefined);
  }

  onSearchCheckedIn(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.loadCheckedInAttendees(searchTerm ? searchTerm : undefined);
  }

  onRegisteredPageChange(event: PageEvent): void {
    this.registeredCurrentPage = event.pageIndex + 1;
    this.registeredPageSize = event.pageSize;
    this.loadRegisteredAttendees();
  }

  onCheckedInPageChange(event: PageEvent): void {
    this.checkedInCurrentPage = event.pageIndex + 1;
    this.checkedInPageSize = event.pageSize;
    this.loadCheckedInAttendees();
  }

  checkInAttendee(registration: EventRegistrationModel) {
    if (!this.event) {
      console.log('Event data not loaded');
      return;
    }

    if (this.isCheckedIn(registration.attendee.id)) {
      console.log('Attendee is already checked in');
      return;
    }

    const isLate = new Date().getTime() > new Date(this.event.startTime).getTime();

    const dto: CheckInAttendeeDto = {
      eventRegistrationId: registration.id,
      isLate: isLate,
      attendeeId: registration.attendeeId,
      eventId: registration.eventId,
      organizationId: this.event.organizationId,
    };

    this.attendanceService.checkInAttendee(dto).subscribe({
      next: (response) => {
        console.log('Checked In', response);
        this.openSnackBar();

        console.log(response.data)
        this.checkedInAttendees.data = [response.data, ...this.checkedInAttendees.data];
        console.log(this.checkedInAttendees.data)

        this.checkedInAttendeeIds.add(registration.attendee.id);
      },
      error: (err) => {
        console.error('Checked In failed', err)

        this.snackBar.open(`Check-in failed: ${err.error?.message || 'Server error'}`, 'Close', {
          duration: 5000,
        });
      } 
    });
  }

  isCheckedIn(attendeeId: string): boolean {
    return this.checkedInAttendeeIds.has(attendeeId);
  }

  openSnackBar() {
    this.snackBar.open('Checked In Successfully', 'Splash', {
      duration: 5000,
    });
  }
}