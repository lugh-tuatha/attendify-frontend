import { VipAttendanceModel } from '@/app/features/attendance/models/vip-attendance.model';
import { AttendanceService } from '@/app/features/attendance/services/attendance';
import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { CornerDownLeft, LucideAngularModule } from 'lucide-angular';
import { ErrorCard } from "@/app/shared/components/error-card/error-card";
import { VipHeader } from "@/app/shared/components/vip-header/vip-header";
import { VipItem } from "@/app/shared/components/vip-item/vip-item";

@Component({
  selector: 'app-attendance-vip',
  imports: [
    MatTabsModule,
    LucideAngularModule,
    ErrorCard,
    VipHeader,
    VipItem
],
  templateUrl: './attendance-vip.html',
  styleUrl: './attendance-vip.css'
})
export class AttendanceVip {
  readonly CornerDownLeft = CornerDownLeft;

  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private attendanceService = inject(AttendanceService);

  slug = this.route.snapshot.paramMap.get('slug');
  date = this.route.snapshot.paramMap.get('date');

  vips: VipAttendanceModel = {
    FIRST_TIMER: [],
    SECOND_TIMER: [],
    THIRD_TIMER: [],
    FOURTH_TIMER: [],
  };

  isVipAttendeesLoading = false;
  isVipAttendeesEmpty = false;

  ngOnInit(): void {
    if (!this.date) return;
    console.log(this.date)
    this.loadVipAttendees(this.date)
  }

  loadVipAttendees(date: string) {
    if (!this.slug) return;
    this.isVipAttendeesLoading = true,
    this.isVipAttendeesEmpty = false,

    this.attendanceService.getVipAttendanceBySlug(this.slug, date).subscribe({
      next: (response) => {
        this.isVipAttendeesLoading = false;


        this.vips = response.data;
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
