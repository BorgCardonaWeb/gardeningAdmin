import { Injectable } from '@angular/core';
import { ModalComponent } from '../features/components/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Injectable({
  providedIn: 'root'
})
export class GeneralInfoServiceService {

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  openModal(type: number, title: string, shortDescription?: string, description?: string) {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-xl',
      data: {
        title,
        type,
        shortDescription,
        description
      }
    });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null; 
    }
  }
  

}
