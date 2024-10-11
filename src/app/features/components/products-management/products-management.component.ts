import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsServicesService } from '../../../services/products-services.service';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { GeneralInfoServiceService } from '../../../services/general-info-service.service';
import { modalOption, modalOptionTitle } from '../../../../assets/enums/generalEnums';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.scss']
})
export class ProductsManagementComponent implements OnInit {

  loading = false;
  txtAlertError = "";
  error = false;
  products: any;
  selectedName: string = '';
  selectedSku: string = '';

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['image', 'sku', 'name', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  reloadProductsAction$: Observable<boolean> | undefined;
  reloadProductsActionSubscription: Subscription | undefined;

  constructor(private productsServicesService: ProductsServicesService,
    private generalInfoServiceService: GeneralInfoServiceService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.reloadProducts();
    setTimeout(() => {
      this.clearFilters();
    });
  }

  reloadProducts() {
    this.reloadProductsAction$ = this.productsServicesService.reloadProducts$;
    this.reloadProductsActionSubscription = this.reloadProductsAction$.subscribe(_data => {
      if (_data) {
        this.getAllProducts();
      }
    });
  }

  getAllProducts() {
    this.loading = true;
    this.productsServicesService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;  // Asignar el paginador a los datos
        this.loading = false;
      },
      () => {
        const errorData = "An unexpected error has occurred, please try again.";
        this.errorManagement(errorData);
      }
    );
  }

  clearFilters() {
    this.selectedName = '';
    this.selectedSku = '';
    this.getAllProducts();
  }

  applyFilter() {
    const filters = {
      name: this.selectedName,
      sku: this.selectedSku
    };

    this.productsServicesService.getFilteredProducts(filters).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;  // Asegura que el paginador esté asignado
    }, error => {
      this.errorManagement('Error fetching filtered products.');
    });
  }

  errorManagement(msmError: string) {
    this.loading = false;
    this.txtAlertError = msmError;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }

  isNumber(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  blockSpecialCharacters(event: KeyboardEvent) {
    const regex = /^[a-zA-Z0-9\s]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!regex.test(inputChar)) {
      event.preventDefault();
    }
  }

  editProduct(product: any) {
    this.generalInfoServiceService.openModal(modalOption.productUpdate, modalOptionTitle.productUpdate, product);
  }

}
