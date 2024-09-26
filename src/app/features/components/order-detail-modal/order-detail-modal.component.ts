import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { GetStatusLabelComponent } from '../get-status-label/get-status-label.component';
import { PaymentTypeComponent } from '../payment-type/payment-type.component';
import { ProductsServicesService } from '../../../services/products-services.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { order, orderStatus } from '../../../../assets/enums/generalEnums';
import { UserManagementService } from '../../../services/user-management.service';
import { LoadingComponent } from '../loading/loading.component';


@Component({
  selector: 'app-order-detail-modal',
  standalone: true,
  imports: [CommonModule, 
    GetStatusLabelComponent, 
    PaymentTypeComponent, 
    ReactiveFormsModule,
    LoadingComponent],
  templateUrl: './order-detail-modal.component.html',
  styleUrl: './order-detail-modal.component.scss'
})
export class OrderDetailModalComponent implements OnInit {

  @Input() orderNumber: any;
  summaryData: any;
  products: any;
  cientData: any;

  isCollapsed = false;
  isCollapsedOrder = false;
  isCollapsedProducts = false;
  isCollapsedManageOrder = false;
  isCollapsedClient = false;
  error = false;
  loading = false;

  txtAlertError = "";

  manageOrderForm: FormGroup;
  statusOptions = [orderStatus.pending, orderStatus.rejected, orderStatus.sended, orderStatus.delivered, orderStatus.preparing];

  constructor(private ordersService: OrdersService,
    private fb: FormBuilder,
    private productsServicesService: ProductsServicesService,
    private userManagementService: UserManagementService) {
    this.manageOrderForm = this.fb.group({
      comments: [''],
      status: [orderStatus.pending]
    });
  }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  onSubmit(): void {
    this.loading = true;
    if (this.manageOrderForm.valid) {
      const formData = this.manageOrderForm.value;
      const updateData = {
        GeneralNotes: formData.comments,
        Status: formData.status,
      };

      this.ordersService.updateOrder(this.orderNumber, updateData).subscribe(
        (response) => {
          this.updateModelOrder(response.Status);
        },
        (error) => {
          this.errorManagement("An unexpected error occurred while updating the order");
        }
      )
    }
  }

  updateModelOrder(status: string) {
    this.summaryData.Status = status;
    this.ordersService.updateStatusCurrentOrder({ orderNumber: this.orderNumber, status: status });
    this.loading = false;
  }

  getOrderDetails() {
    this.loading = true;
    this.ordersService.getOrderById(this.orderNumber).subscribe(
      (data: any) => {
        this.summaryData = data;
        const productIDs = data.arrayProduct.map((product: any) => product.productID);
        this.manageOrderForm.setValue({
          comments: this.summaryData.GeneralNotes,
          status: data.Status
        });
        this.getProductsDetail(productIDs);
        this.getClientDetail(data.ClientID);
        this.loading = false;
      },
      () =>{
        this.errorManagement("An unexpected error occurred while opening the order details");
      }
    )
  }

  getProductImageById(productID: number): string {
    const product = this.products?.find((item: any) => item.productID === productID);
    return this.getImageSrc(product ? product.image : '');
  }

  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }


  getProductNameById(productID: number): string {
    const product = this.products?.find((item: any) => item.productID === productID);
    return product ? product.name : '';
  }

  getProductsDetail(idsArray: any) {
    this.loading = true;
    this.productsServicesService.getProductsByIds(idsArray).subscribe(
      (data) => {
        this.products = data;
        this.loading = false;
      },
      error => {
        this.errorManagement("An unexpected error occurred while retrieving order details");
      }
    )
  }

  getClientDetail(idClient: string) {
    this.loading = true;
    this.userManagementService.getClientByID(idClient).subscribe(
      (data) => {
        this.cientData = data;
        this.loading = false;
      },
      error => {
        this.errorManagement("An unexpected error occurred while retrieving order details");
      }
    )
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleCollapseOrder(): void {
    this.isCollapsedOrder = !this.isCollapsedOrder;
  }

  toggleCollapseProducts(): void {
    this.isCollapsedProducts = !this.isCollapsedProducts;
  }

  toggleCollapseManageOrder(): void {
    this.isCollapsedManageOrder = !this.isCollapsedManageOrder;
  }

  toggleCollapseClient() {
    this.isCollapsedClient = !this.isCollapsedClient;
  }


  getTotalWithExtraCharge(total: number) {
    return Number(total) - Number(5);
  }

  errorManagement(msmError: string) {
    this.loading = false;
    this.txtAlertError = msmError;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }

}
