import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';
import { OrderDetailModalComponent } from '../order-detail-modal/order-detail-modal.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    OrderDetailModalComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  title: string | null = null;
  type: number | null = null;
  shortDescription: number | null = null;
  description: number | null = null;
  constructor(public modalRef: MdbModalRef<ModalComponent>) { }

}
