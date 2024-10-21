import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PaymentTypeComponent } from '../payment-type/payment-type.component';
import { GetStatusLabelComponent } from '../get-status-label/get-status-label.component';
import { modalOption, modalOptionTitle, orderStatus, paymentType } from '../../../../assets/enums/generalEnums';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    CurrencyPipe,
    PaymentTypeComponent,
    GetStatusLabelComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'] // Corrige `styleUrl` a `styleUrls`
})
export class OrderManagementComponent implements OnInit {

  orders: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['OrderID', 'Status', 'PaymentType', 'Date', 'TotalAmount', 'Actions'];

  uniqueStatuses: any;
  uniquePaymentTypes: any;

  selectedStatus: string = '';
  selectedPaymentType: string = '';
  selectedID: string = '';
  selectedDate: any;

  dataStatus$: Observable<any> | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordersService: OrdersService, private generalInfoServiceService: GeneralInfoServiceService) { }

  ngOnInit(): void {
    this.getOrders();
    this.updateSTatusCurrentOrder();
    setTimeout(() => {
      this.clearFilters();
    });
  }

  getOrders() {
    this.ordersService.getAllOrders().subscribe(data => {
      this.orders = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.uniqueStatuses = [orderStatus.pending, orderStatus.rejected, orderStatus.sended, orderStatus.delivered, orderStatus.preparing];
      this.uniquePaymentTypes = [paymentType.card, paymentType.cash, paymentType.cardDelivery];
    });
  }

  applyFilter() {
    const filters = {
      status: this.selectedStatus,
      paymentType: this.selectedPaymentType,
      date: this.selectedDate,
      id: this.selectedID
    };

    this.ordersService.getFilteredOrders(filters).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  clearFilters() {
    this.selectedStatus = '';
    this.selectedPaymentType = '';
    this.selectedID = "";
    this.selectedDate = null;
    this.dataSource.filter = '';
    this.getOrders();
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

  openModalOrder(orderNumber: number) {
    this.generalInfoServiceService.openModal(modalOption.orderDetail, modalOptionTitle.orderDetail, String(orderNumber));
  }

  isNumber(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }


}
