import { VipAttendanceModel } from '@/app/features/attendance/models/vip-attendance.model';
import { AttendanceService } from '@/app/features/attendance/services/attendance';
import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { CornerDownLeft, Handshake, LucideAngularModule, Sparkles, User } from 'lucide-angular';
import { VipItem } from "@/app/shared/components/vip-item/vip-item";
import { VipHeader } from "@/app/shared/components/vip-header/vip-header";
import { ErrorCard } from "@/app/shared/components/error-card/error-card";

@Component({
  selector: 'app-event-vip',
  imports: [
    MatTabsModule,
    LucideAngularModule,
    VipItem,
    VipHeader,
    ErrorCard
],
  templateUrl: './event-vip.html',
  styleUrl: './event-vip.css'
})

export class EventVip {
  readonly CornerDownLeft = CornerDownLeft;

  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private attendanceService = inject(AttendanceService);

  slug = this.route.snapshot.paramMap.get('slug');

  vips: VipAttendanceModel = {
    FIRST_TIMER: [],
    SECOND_TIMER: [],
    THIRD_TIMER: [],
    FOURTH_TIMER: [],
  };

  isVipAttendeesLoading = false;
  isVipAttendeesEmpty = false;

  ngOnInit(): void {
    if (!this.slug) return;
    console.log(this.slug)
    this.loadVipAttendees()
  }

  loadVipAttendees() {
    if (!this.slug) return;
    this.isVipAttendeesLoading = true,
    this.isVipAttendeesEmpty = false,

    this.attendanceService.getVipAttendanceBySlug(this.slug).subscribe({
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
