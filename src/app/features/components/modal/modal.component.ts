import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';
import { OrderDetailModalComponent } from '../order-detail-modal/order-detail-modal.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    EditProductComponent,
    OrderDetailModalComponent,
    AddProductComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  title: string | null = null;
  type: number | null = null;
  shortDescription: any = null;
  description: number | null = null;
  constructor(public modalRef: MdbModalRef<ModalComponent>) { }

}
