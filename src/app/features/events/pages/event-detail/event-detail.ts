import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LucideAngularModule, CornerDownLeft, Search } from 'lucide-angular';

import { LTHMIProfile } from '../../models/registered-attendee.model';
import { EventModel } from '../../models/event.model';
import { EventsService } from '../../services/events';

import { Button } from "../../../../shared/ui/button/button";
import { StatCard } from '../../../../shared/ui/stat-card/stat-card';

@Component({
  selector: 'app-event-detail',
  imports: [
    RouterLink, 
    MatTableModule, 
    MatPaginatorModule, 
    Button, 
    StatCard, 
    CdkTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    LucideAngularModule
  ],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css'
})

export class EventDetail {
  private route = inject(ActivatedRoute);
  private eventsService = inject(EventsService);

  readonly CornerDownLeft = CornerDownLeft;
  readonly Search = Search;

  event: EventModel | null = null;
  isEventLoading = false;

  registeredAttendeesColumns: string[] = ['fullName', 'primaryLeader', 'churchHierarchy','memberStatus', 'actions'];
  dataSource = new MatTableDataSource<LTHMIProfile>([]);
  isRegisteredAttendeesLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId != null) {
      this.loadEvent(eventId);
      this.loadRegisteredAttendees(eventId);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
        this.dataSource.data = response.data;
        this.isRegisteredAttendeesLoading = false;
      },
      error: (error) => {
        console.error('Error loading registered attendees:', error);
        this.isRegisteredAttendeesLoading = false;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
