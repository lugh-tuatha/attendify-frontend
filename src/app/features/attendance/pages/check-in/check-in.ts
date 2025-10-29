import { Component, inject } from '@angular/core';
import { Button } from '@/app/shared/ui/button/button'; 
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AttendanceService } from '@/app/core/attendance/services/attendance';
import { CornerDownLeft, LucideAngularModule, SearchCheck } from 'lucide-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-check-in',
  imports: [
    LucideAngularModule,
    RouterLink,
    Button, 
    WebcamModule
  ],
  templateUrl: './check-in.html',
  styleUrl: './check-in.css'
})
export class CheckIn {
  readonly SearchCheck = SearchCheck;
  readonly CornerDownLeft = CornerDownLeft;

  private snackBar = inject(MatSnackBar);

  status: string | null = null;
  private trigger: Subject<void> = new Subject<void>();
  previewImage: string | null = null;
  private attendanceService = inject(AttendanceService);
  tempJsonRes: string = '';

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    console.log(event);
    this.previewImage = event.imageAsDataUrl;
    this.checkInByFace(event.imageAsDataUrl);
  }

  checkPermissions() {
    navigator.mediaDevices.getUserMedia({ 
      video: {
        width: 500,
        height: 500
      } 
    }).then((res) => {
      console.log(res);
      this.status = "MediaStream Active";
    }).catch((err) => {
      console.log(err);
      this.status = err.message;
    });
  }

  captureImage() {
    this.trigger.next()
  }

  checkInByFace(imageAsDataUrl: string) {
    const dto = {
      "imageAsDataUrl": imageAsDataUrl
    }

    this.attendanceService.checkInByFace(dto).subscribe({
      next: (response) => {
        console.log(response);
        this.tempJsonRes = JSON.stringify(response);
      },
      error: (err) => {
        this.snackBar.open(`Check-in failed: ${err.error?.message || 'Server error'}`, 'Close', {
          duration: 5000,
        });
      }
    })
  }

  onSearchManualCheckIn(event: Event): void {
    console.log("search: " + event)
  }
}
