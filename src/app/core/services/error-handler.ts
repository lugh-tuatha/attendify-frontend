import { ErrorModal } from '@/app/shared/components/error-modal/error-modal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

interface ModalData {
  title: string;
  message: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private dialog = inject(MatDialog);

  showErrorModal(status: number, message: string) {
    let modalData: ModalData = {
      title: '0: Unknown Error',
      message: message || 'Backend is unreachable or network error.',
      image: 'assets/http.cat/0.jpeg'
    };

    switch (status) {
      case 200:
        modalData = {
          title: '200: OK',
          message: message || 'An unexpected error occurred.',
          image: 'assets/http.cat/200.jpeg'
        }
        break;
      case 201:
        modalData = {
          title: '201: Created',
          message: message || 'An unexpected error occurred.',
          image: 'assets/http.cat/201.webp'
        }
        break;
      case 409:
        modalData = {
          title: '409: Conflict',
          message: message || 'An unexpected error occurred.',
          image: 'assets/http.cat/409.jpeg'
        }
        break;
      case 502:
        modalData = {
          title: '502: Bad Gateway',
          message: message || 'The server is currently unavailable.',
          image: 'assets/http.cat/502.png'
        }
        break;
    }

    this.dialog.open(ErrorModal, {
      data: modalData,
    });
  }
}
