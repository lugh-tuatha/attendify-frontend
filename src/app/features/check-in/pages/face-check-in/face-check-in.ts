import { Component, inject } from '@angular/core';
import { Button } from '../../../../shared/ui/button/button';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { EventsService } from '../../../events/services/events';

@Component({
  selector: 'app-face-check-in',
  imports: [Button, WebcamModule],
  templateUrl: './face-check-in.html',
  styleUrl: './face-check-in.css'
})
export class FaceCheckIn {
  status: string | null = null;
  private trigger: Subject<void> = new Subject<void>();
  previewImage: string | null = null;
  private eventsService = inject(EventsService);
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

    this.eventsService.checkInByFace(dto).subscribe({
      next: (response) => {
        console.log(response);
        this.tempJsonRes = JSON.stringify(response);
      },
      error: (err) => {
        console.error('Checked In failed', err)
        this.tempJsonRes = JSON.stringify(err);
      }
    })
  }
}