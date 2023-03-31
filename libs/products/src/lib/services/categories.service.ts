import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  constructor(private http: HttpClient) {}

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories');
  }

  createCategory(category:Category):Observable<Category>{
    return this.http.post<Category>('http://localhost:3000/api/v1/categories', category);
  }

  deleteCategory(id:string):Observable<unknown>{
    return this.http.delete<unknown>('http://localhost:3000/api/v1/categories/'+id);
  }

  getCategory(id: string):Observable<Category> {
    return this.http.get<Category>('http://localhost:3000/api/v1/categories/'+id);
  }

  updateCategory(id: string, category:Category):Observable<Category> {
    return this.http.put<Category>('http://localhost:3000/api/v1/categories/'+id, category);
  }
}