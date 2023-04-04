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

  createProduct(product:FormData):Observable<Product>{
    console.log(product);
    return this.http.post<Product>(this.apiUrlProduct, product);
  }

  deleteProduct(id:string):Observable<unknown>{
    return this.http.delete<unknown>(this.apiUrlProduct+id);
  }

  getProduct(id: string):Observable<Product> {
    return this.http.get<Product>(this.apiUrlProduct+id);
  }

  updateProduct(product:FormData, id: string):Observable<Product> {
    return this.http.put<Product>(this.apiUrlProduct+id, product);
  }
}
