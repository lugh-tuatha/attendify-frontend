import { Component, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';
import { MatAnchor, MatButtonModule } from "@angular/material/button";

import { SquarePen, LucideAngularModule, Trash, SearchCheck, EllipsisVertical } from 'lucide-angular';
import { Subject, takeUntil } from 'rxjs';

import { AttendeesService } from '@/app/features/attendees/services/attendees';
import { EventsService } from '@/app/features/events/services/events';
import { ErrorHandlerService } from '@/app/core/services/error-handler';
import { RegisterAttendeeDto } from '@/app/features/events/dto/register-attendee.dto';
import { environment } from '@/environments/environment';
import { DeleteConfirmationModal } from '@/app/shared/components/delete-confirmation-modal/delete-confirmation-modal';
import { EditAttendeeDialog } from './components/edit-attendee-dialog/edit-attendee-dialog';

@Component({
  selector: 'app-attendees',
  imports: [
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CdkTableModule,
    LucideAngularModule,
    MatPaginator,
    MatMenuModule,
    RouterLink,
    MatAnchor,
    MatButtonModule,
],
  templateUrl: './attendees.html',
  styleUrl: './attendees.css'
})
export class Attendees {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private destroy$ = new Subject<void>();

  readonly SquarePen = SquarePen; 
  readonly Trash = Trash; 
  readonly SearchCheck = SearchCheck;
  readonly EllipsisVertical = EllipsisVertical;
  
  readonly organizationId = environment.organizationId;

  private attendeesService = inject(AttendeesService);
  private eventsService = inject(EventsService);
  private errorHandlerService = inject(ErrorHandlerService);

  dialog = inject(MatDialog);
  breakpointObserver = inject(BreakpointObserver);

  allColumns = ['profile', 'fullName', 'age', 'status', 'churchHierarchy', 'primaryLeader', 'churchProcess', 'network', 'actions'];
  displayedColumns: string[] = this.allColumns;
  attendeesDataSource = new MatTableDataSource<any>([]);
  attendees = {
    totalCount: 0,
    loading: false,
    errorMessage: null,
  }

  selectedValue: string = "All";
  currentSearchTerm: string | undefined = undefined;

  currentPage = 1;
  pageLimit = 10;  

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      
      if (result.matches) {
        this.displayedColumns = [
          'profile', 
          'fullName', 
          'primaryLeader',
          'churchHierarchy',
          'actions'
        ];
      } else {
        this.displayedColumns = this.allColumns;
      }
    });

    this.loadAttendees(1, 10, undefined, true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAttendees(
    page: number = 1, 
    limit: number = 10, 
    searchTerm?: string, 
    forceRefresh: boolean = false
  ): void {
    this.attendees.loading = true;
    this.attendees.errorMessage = null; 

    this.attendeesService.getAttendees(this.organizationId, page, limit, searchTerm, forceRefresh).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.attendeesDataSource.data = response.data;
        this.attendees.totalCount = response.meta.total;
        this.attendees.loading = false;

        this.attendeesService.prefetchNextPage(
          this.organizationId,
          this.currentPage,
          this.pageLimit,
          this.attendees.totalCount,
          this.currentSearchTerm
        );
      },
      error: (error) => {
        console.error('Error loading attendees:', error);
        this.attendees.loading = false;
        this.attendees.errorMessage = error?.error?.message ?? 'An unknown error occurred.';
        this.attendees.totalCount = 0;
        this.attendeesDataSource.data = [];
      }
    })
  }

  editAttendee(attendeeId: string) {
    const dialogRef = this.dialog.open(EditAttendeeDialog, {
      data: { attendeeId }
    })

    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.loadAttendees(1, this.pageLimit, this.currentSearchTerm, true);
      }
    })
  }

  registerAttendee(attendeeId: string, eventId: string) {
    const dto: RegisterAttendeeDto = {
      eventId: eventId,
      attendeeId: attendeeId,
    }

    this.eventsService.registerAttendee(dto).subscribe({
      next: (response) => {
        console.log('Registered', response);
        this.errorHandlerService.showErrorModal(response.statusCode, `Attendee Successfully Registered`);
      },
      error: (err) => {
        const status = err.status;
        console.log(err)
        if (status === 409 || status === 502) {
          this.errorHandlerService.showErrorModal(status, err.error?.message);
        } else { 
          console.error('Registration failed', err)
        }
      }
    })
  }

  archiveAttendee(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationModal)

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.attendeesService.archiveAttendee(id).subscribe({
        next: (response) => {
          console.log('Attendee archived', response);
          this.errorHandlerService.showErrorModal(response.statusCode, `Attendee Successfully Archived`);
          this.loadAttendees(1, this.pageLimit, this.currentSearchTerm, true);
        },
        error: (error) => {
          console.error('Error archiving attendee:', error);
          this.errorHandlerService.showErrorModal(error.status, error.error?.message);
        }
      })
    })
  }

  onSearchAttendeesRecord(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm === this.currentSearchTerm) return;
    this.currentSearchTerm = searchTerm ? searchTerm : undefined;

    if (this.paginator && this.paginator.pageIndex !== 0) {
      this.paginator.firstPage();
    }else {
      this.loadAttendees(1, this.pageLimit, searchTerm ? searchTerm : undefined);
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageLimit = event.pageSize;
    this.loadAttendees(this.currentPage, this.pageLimit, this.currentSearchTerm)
  }

  getStatusBadge(status?: string) {
    if (!status) return null;

    if (
      status?.includes('FIRST_TIMER') || 
      status?.includes('SECOND_TIMER') || 
      status?.includes('THIRD_TIMER') || 
      status?.includes('FOURTH_TIMER')
    ) {
      return {
        label: 'VIP',
        class: 'bg-yellow-200 border border-yellow-500'
      };
    } 
    
    if (status === 'BACK_TO_LIFE') {
      return {
        label: 'returned',
        class: 'bg-green-200 border border-green-500'
      };
    }

    return null;
  }
}