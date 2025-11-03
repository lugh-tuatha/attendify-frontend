import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Button } from "@/app/shared/ui/button/button";
import { AttendeesService } from '@/app/core/attendees/services/attendees';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { SquarePen, LucideAngularModule, Trash, SearchCheck } from 'lucide-angular';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-attendees',
  imports: [
    MatSelectModule,
    MatInputModule,
    FormsModule,
    Button,
    CdkTableModule,
    LucideAngularModule,
    MatPaginator
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

  private readonly organizationId = '9d9f4139-ac7d-4aa6-a2ef-bcb941e3ea96';
  private attendeesService = inject(AttendeesService);

  displayedColumns: string[] = ['fullName', 'age', 'status', 'memberStatus', 'churchHierarchy', 'primaryLeader', 'churchProcess', 'network', 'actions'];
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
    this.loadAttendees();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAttendees(page: number = 1, limit: number = 10, searchTerm?: string): void {
    this.attendees.loading = true;
    this.attendees.errorMessage = null; 

    this.attendeesService.getAttendees(this.organizationId, page, limit, searchTerm).pipe(
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

  onSearchAttendanceRecord(event: Event): void {
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
}
