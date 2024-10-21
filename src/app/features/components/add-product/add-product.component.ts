import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProductsServicesService } from '../../../services/products-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { actions } from '../../../../assets/enums/generalEnums';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingComponent
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  product: any;
  categories: any;
  subcategories: any;
  showInitImg = true;
  loading = false;
  error = false;
  success = false;
  txtAlertError = "";
  categorySelectet = "";
  subcategorySelectet = "";


  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private productsServicesService: ProductsServicesService,
  ) {
    this.initialiceProductObject();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productsServicesService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  initialiceProductObject() {
    const formData = new FormData();
    formData.append('name', '');
    formData.append('sku', '');
    formData.append('shortDescription', '');
    formData.append('description', '');
    formData.append('active', '1');
    formData.append('image', '');
    formData.append('subcategoryId', '');
    this.product = formData;
    this.product.active = true;
  }

  createProduct() {
    this.loading = true;
    if (this.isFormValid()) {
      this.executeUpdate();
    }
  }

  executeUpdate() {
     this.productsServicesService.createProduct(this.getProduct()).subscribe(data => {
       this.loading = false;
       this.success = true;
       this.productsServicesService.reloadProducts(actions.create);
       setTimeout(() => {
         this.success = false;
       }, 3000);
     }, (error) => {
       this.showError("An unexpected error occurred");
     });
  }

  showError(errorMessagge: string) {
    this.loading = false;
    this.txtAlertError = errorMessagge;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }

  getProduct(): any {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('sku', this.product.sku);
    formData.append('shortDescription', this.product?.shortDescription || '');
    formData.append('description', this.product?.description || '');
    formData.append('active', this.product?.active ? '1' : '0');
    formData.append('image', this.product.image);
    formData.append('subcategoryId', this.subcategorySelectet);
    return formData;
  }

  isFormValid(): boolean {
    let isValid: boolean;
    if (!this.product.name) {
      isValid = false;
      this.showError('Product name is required.');
    } else if (!this.product.sku) {
      isValid = false;
      this.showError('SKU is required.');
    } else if (!this.product.description) {
      isValid = false;
      this.showError('Description is required.');
    } else if (!this.categorySelectet) {
      isValid = false;
      this.showError('Category is required.');
    } else if (!this.subcategorySelectet) {
      isValid = false;
      this.showError('Subcategory is required.');
    } else if (!this.product.image) {
      isValid = false;
      this.showError('Product image is required.');
    } else {
      isValid = true;
      this.error = false;
      this.txtAlertError = '';
    }
    return isValid;
  }

  onProductChange(event: any): void {
    const categoryId = event.target.value;
    this.subcategories = this.categories.find((data: any) => data.id == categoryId).subcategories;
  }

  onImageDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        this.product.image = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.product.imageSrc = reader.result as string;
        };
        reader.readAsDataURL(file);
        this.showInitImg = false;
      }
    }
  }

  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        this.product.image = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.product.imageSrc = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
      this.showInitImg = false;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

}


