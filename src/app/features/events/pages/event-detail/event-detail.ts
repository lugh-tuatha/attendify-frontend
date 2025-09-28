import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LucideAngularModule, CornerDownLeft } from 'lucide-angular';

import { LTHMIProfile } from '../../models/registered-attendee.model';
import { EventModel } from '../../models/event.model';
import { EventsService } from '../../services/events';

import { Search } from "../../../../shared/components/search/search";
import { StatCard } from '../../../../shared/ui/stat-card/stat-card';
import { CheckInAttendeeDto } from '../../models/check-in-attendee.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  imports: [
    RouterLink, 
    MatTableModule, 
    MatPaginatorModule, 
    StatCard, 
    CdkTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    LucideAngularModule,
    DatePipe,
    Search
  ],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css'
})

export class EventDetail {
  private route = inject(ActivatedRoute);
  private eventsService = inject(EventsService);

  readonly CornerDownLeft = CornerDownLeft;

  event: EventModel | null = null;
  isEventLoading = false;

  private _snackBar = inject(MatSnackBar);

  registeredAttendeesColumns: string[] = ['fullName', 'primaryLeader', 'churchHierarchy','memberStatus', 'actions'];
  registeredAttendees = new MatTableDataSource<LTHMIProfile>([]);
  isRegisteredAttendeesLoading = false;

  checkedInAttendeesColumns: string[] = ['fullName', 'primaryLeader', 'churchHierarchy', 'memberStatus', 'timeArrival'];
  checkedInAttendees = new MatTableDataSource<LTHMIProfile>([]);
  isCheckedInAttendeesLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('registeredPaginator') registeredPaginator!: MatPaginator;
  @ViewChild('checkedInPaginator') checkedInPaginator!: MatPaginator;

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId != null) {
      this.loadEvent(eventId);
      this.loadRegisteredAttendees(eventId);
      this.loadCheckedInAttendees();
    };
  }

  ngAfterViewInit(): void {
    this.registeredAttendees.paginator = this.paginator;
    this.checkedInAttendees.paginator = this.checkedInPaginator;
  }

  private loadEvent(id: string): void {
    this.isEventLoading = true;

    this.eventsService.getEventById(id).subscribe({
      next: (response) => { 
        this.event = response.data;
        this.isEventLoading = false;
        console.log(this.event)
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.isEventLoading = false;
      }
    })
  }

  private loadRegisteredAttendees(id: string): void {
    this.isRegisteredAttendeesLoading = true;

    this.eventsService.getAllRegisteredAttendees(id).subscribe({
      next: (response) => {
        this.registeredAttendees.data = response.data;
        this.isRegisteredAttendeesLoading = false;
        console.log(response.data)
      },
      error: (error) => {
        console.error('Error loading registered attendees:', error);
        this.isRegisteredAttendeesLoading = false;
      }
    })
  }

  checkInAttendee(id: string) {
    const dto: CheckInAttendeeDto = {
      "eventRegistrationId": id,
      "timeIn": new Date(),
      "weekNumber": 39,
      "attendanceTypeId": "8c5931b3-bd00-48a3-a434-cccc23075bbd",
      "organizationId": "0d240a79-16e2-40f3-939b-eccba5324f80",
    };

    this.eventsService.checkInAttendee(dto).subscribe({
      next: (response) => {
        console.log('Checked In', response);
        this.loadCheckedInAttendees();
        this.openSnackBar();
      },
      error: (err) => console.error('Checked In failed', err)
    });
  }

  private loadCheckedInAttendees(): void {
    this.isCheckedInAttendeesLoading = true;

    this.eventsService.getAllCheckedInAttendees().subscribe({
      next: (response) => {
        this.checkedInAttendees.data = response.data;
        this.isCheckedInAttendeesLoading = false;
        console.log(response.data)
      },
      error: (error) => {
        console.error('Error loading registered attendees:', error);
        this.isCheckedInAttendeesLoading = false;
      }
    })
  }

  applyFilterRegistered(value: string) {
    this.registeredAttendees.filter = value;
    if (this.registeredAttendees.paginator) {
      this.registeredAttendees.paginator.firstPage();
    }
  }

  applyFilterCheckedIn(value: string) {
    this.checkedInAttendees.filter = value;
    if (this.checkedInAttendees.paginator) {
      this.checkedInAttendees.paginator.firstPage();
    }
  }

  openSnackBar() {
    this._snackBar.open('Checked In Successfully', 'Splash', {
      duration: 5 * 1000,
    });
  }

  isCheckedIn(attendeeId: string): boolean {
    console.log(this.checkedInAttendees.data.some(a => a.id))
    console.log(attendeeId)
    return this.checkedInAttendees.data.some(a => a.id === attendeeId);
  }
}
