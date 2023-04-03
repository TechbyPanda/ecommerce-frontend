import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrlProduct = environment.apiUrl + 'products/';

  constructor(private http: HttpClient) {}

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrlProduct);
  }

  createProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.apiUrlProduct, product);
  }

  deleteProduct(id:string):Observable<unknown>{
    return this.http.delete<unknown>(this.apiUrlProduct+id);
  }

  getProduct(id: string):Observable<Product> {
    return this.http.get<Product>(this.apiUrlProduct+id);
  }

  updateProduct(id: string, product:Product):Observable<Product> {
    return this.http.put<Product>(this.apiUrlProduct+id, product);
  }
}
