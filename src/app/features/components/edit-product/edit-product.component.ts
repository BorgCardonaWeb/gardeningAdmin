
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsServicesService } from '../../../services/products-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Input() productInitial: any;
  product: any;
  showInitImg = true;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private productsServicesService: ProductsServicesService,
  ) { }

  ngOnInit(): void {
    this.product = { ...this.productInitial };

    if(this.productInitial?.active == 1){
      this.product.active = true;
    } else{
      this.product.active = false;
    }

    console.log(this.productInitial)

  }

  updateProduct() {
    const id = this.product.productID;
    this.productsServicesService.updateProduct(id, this.product).subscribe(data => {
      console.log("Se edito correctamente")
    }, () => {
      //error
    });
  }

  onImageDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        this.product.image = file; // Guardar el archivo como Blob
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
        this.product.image = file; // Guardar el archivo como Blob
      } else {
        console.error('The file is not an image');
      }
      this.showInitImg = false;
    }
  }
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Permitir el drop
  }


  openFileSelector() {
    this.fileInput.nativeElement.click();  // Añade este método
  }

  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
}
