import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsServicesService } from '../../../services/products-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { actions } from '../../../../assets/enums/generalEnums';
import { allProductskeystorage } from '../../../../assets/enums/const';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingComponent
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Input() productInitial: any;
  product: any;
  showInitImg = true;
  loading = false;
  error = false;
  success = false;
  txtAlertError = "";


  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private productsServicesService: ProductsServicesService,
  ) { }

  ngOnInit(): void {
    this.product = { ...this.productInitial };

    if (this.productInitial?.active == 1) {
      this.product.active = true;
    } else {
      this.product.active = false;
    }
  }

  updateProduct() {
    this.loading = true;

    let data = {
      name: this.product.name,
      shortDescription: this.product?.shortDescription || '',
      description: this.product?.description || '',
      active: this.product?.active ? '1' : '0'
    }

    this.productsServicesService.updateProduct(this.product.productID, data).subscribe(data => {
      this.uploadImage();
      setTimeout(() => {
        this.success = false;
      }, 3000);
    }, (error) => {
      this.showError();
    });
  }

  uploadImage() {
    this.loading = true;
    const formData = new FormData();

    formData.append('image', this.product.image);

    this.productsServicesService.uploadProductImage(this.product.productID, formData).subscribe(data => {
      this.loading = false;
      localStorage.removeItem(allProductskeystorage);
      this.productsServicesService.reloadProducts(actions.edit);
    }, (error) => {
      this.showError();
    });
  }

  showError() {
    this.loading = false;
    this.txtAlertError = "An unexpected error occurred";
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
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
      } else {
        console.error('The file is not an image');
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
      } else {
        console.error('The file is not an image');
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
