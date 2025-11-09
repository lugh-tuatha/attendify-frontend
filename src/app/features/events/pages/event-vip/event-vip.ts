import { AttendanceModel } from '@/app/core/attendance/models/attendance.model';
import { AttendanceService } from '@/app/core/attendance/services/attendance';
import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CornerDownLeft, Handshake, LucideAngularModule, Sparkles, User } from 'lucide-angular';

@Component({
  selector: 'app-event-vip',
  imports: [
    MatTabsModule,
    LucideAngularModule,
  ],
  templateUrl: './event-vip.html',
  styleUrl: './event-vip.css'
})
export class EventVip {
  readonly CornerDownLeft = CornerDownLeft;
  readonly Sparkles = Sparkles;
  readonly User = User;
  readonly Handshake = Handshake;

  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private attendanceService = inject(AttendanceService);

  slug = this.route.snapshot.paramMap.get('slug');

  vipAttendees: AttendanceModel[] = [];

  ngOnInit(): void {
    if (!this.slug) return;
    console.log(this.slug)
    this.loadVipAttendees()
  }

  loadVipAttendees() {
    if (!this.slug) return;

    this.attendanceService.getAttendanceByMemberStatus(this.slug, 'THIRD_TIMER').subscribe({
      next: (response) => {
        console.log(response)
        this.vipAttendees = response.data;
      },
      error: (error) => {
        console.error('Error loading attendance by member status:', error);
      }
    })
  }

  goBack() {
    this.location.back();
  }
}
