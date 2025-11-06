import { ErrorModal } from '@/app/shared/components/error-modal/error-modal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private dialog = inject(MatDialog);

  showErrorModal(status: number, message: string) {
    let modalData = {
      title: 'Something went wrong',
      message: message || 'An unexpected error occurred.',
      image: 'assets/http.cat/504.jpg'
    };

    switch (status) {
      case 502:
        modalData = {
          title: '502: Bad Gateway',
          message: message || 'An unexpected error occurred.',
          image: 'assets/http.cat/502.png'
        }
        break;
      case 409:
        modalData = {
          title: '409: Conflict',
          message: message || 'An unexpected error occurred.',
          image: 'assets/http.cat/409.jpeg'
        }
        break;
    }

    this.dialog.open(ErrorModal, {
      data: modalData,
    });
  }

}
