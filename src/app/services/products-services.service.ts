import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../enviroment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsServicesService {

  private reloadProductsSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public reloadProducts$: Observable<any> = this.reloadProductsSubject.asObservable();

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiUrl}`;

  getProductsBySKUArray(stockCodes: string[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/stock/getStockDetails`, { stockCodes });
  }

  getProductsByIds(productIds: number[]): Observable<any> {
    const url = `${this.apiUrl}/products/byIds`;
    return this.http.post(url, { productIds });
  }

  getAllProducts(): Observable<any> {
    const url = `${this.apiUrl}/products/allProducts`;
    return this.http.get(url);
  }

  getFilteredProducts(filters: { sku?: string; name?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/filter`, filters);
  }

  updateProduct(productId: number, updatedData: any) {
    return this.http.put(`${this.apiUrl}/products/product/${productId}`, updatedData);
  }

  createProduct(product: any) {
    return this.http.post(`${this.apiUrl}/products/create`, product);
  }

  reloadProducts(data: string): void {
    this.reloadProductsSubject.next(data);
  };

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories`);
  }

  uploadImage(image: any) {
    return this.http.post(`${this.apiUrl}/products/uploadBannerImage`, image);
  }

  getAllBannerImages(): Observable<any> {
    const url = `${this.apiUrl}/products/allBannerImages`;
    return this.http.get(url);
  }

  deleteImageById(imageId: number): Observable<void> {
    const url = `${this.apiUrl}/products/images/${imageId}`;
    return this.http.delete<void>(url);
  }

}
