import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { ProductsServicesService } from '../../../services/products-services.service';

@Component({
  selector: 'app-banner-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingComponent],
  templateUrl: './banner-management.component.html',
  styleUrl: './banner-management.component.scss'
})
export class BannerManagementComponent implements OnInit {

  loading = false;
  error = false;
  txtAlertError = "";
  banner: any;
  bannerImages: any;

  constructor(
    private productsServicesService: ProductsServicesService
  ) { }

  ngOnInit(): void {
    this.initialiceProductObject();
    this.getAllImages();
  }

  initialiceProductObject() {
    const formData = new FormData();
    formData.append('image', '');
    this.banner = formData;
  }

  uploadImage() {
    this.loading = true;
    const formData = new FormData();

    formData.append('image', this.banner.image);

    this.productsServicesService.uploadImage(formData).subscribe(data => {
      this.loading = false;
      this.banner.image = null;
      this.banner.imageSrc = '';
      this.getAllImages();
    }, (error) => {
      this.showError();
    });
  }

  onImageDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        this.banner.image = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.banner.imageSrc = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        this.banner.image = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.banner.imageSrc = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  getAllImages() {
    this.loading = true;
    this.productsServicesService.getAllBannerImages().subscribe(
      (data) => {
        this.bannerImages = data;
        this.loading = false;
      },
      () => {
        this.showError();
      }
    );
  }

  deleteImage(id: number){
    this.loading = true;
    this.productsServicesService.deleteImageById(id).subscribe(
      (data) => {
        this.getAllImages();
      },
      () => {
        this.showError();
      }
    );
  }

  showError() {
    this.loading = false;
    this.txtAlertError = "An unexpected error occurred";
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }



}
