import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PaymentTypeComponent } from '../payment-type/payment-type.component';
import { GetStatusLabelComponent } from '../get-status-label/get-status-label.component';
import { modalOption, modalOptionTitle } from '../../../../assets/enums/generalEnums';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    CurrencyPipe,
    PaymentTypeComponent,
    GetStatusLabelComponent,
    CommonModule],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.scss'
})

export class OrderManagementComponent implements OnInit {

  orders: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['OrderID', 'Status', 'PaymentType', 'Date', 'TotalAmount', 'Actions'];

  dataStatus$: Observable<any> | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordersService: OrdersService, private generalInfoServiceService: GeneralInfoServiceService) { }

  ngOnInit(): void {
    this.getOrders();
    this.updateSTatusCurrentOrder();
  }

  getOrders() {
    this.orders = this.ordersService.getStorageOrders();
    if (!(this.orders?.length > 0)) {
      this.ordersService.getAllOrders().subscribe(
        data => {
          this.orders = data;
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        }
      )
    }
  }

  updateSTatusCurrentOrder() {
    this.dataStatus$ = this.ordersService.dastatusCurrentOrder$;
    this.dataStatus$.subscribe(data => {

      if (data.orderNumber) {
        const orderIndex = this.dataSource.data.findIndex(order => order.OrderID == data.orderNumber);
        if (orderIndex !== -1) {
          this.dataSource.data[orderIndex].Status = data.status;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }

  openModalOrder(orderNumer: number) {
    this.generalInfoServiceService.openModal(modalOption.orderDetail, modalOptionTitle.orderDetail, String(orderNumer));
  }

}
