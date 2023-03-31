import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrlCategories = environment.apiUrl + 'categories/';

  constructor(private http: HttpClient) {}

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrlCategories);
  }

  createCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(this.apiUrlCategories, category);
  }

  deleteCategory(id:string):Observable<unknown>{
    return this.http.delete<unknown>(this.apiUrlCategories+id);
  }

  getCategory(id: string):Observable<Category> {
    return this.http.get<Category>(this.apiUrlCategories+id);
  }

  updateCategory(id: string, category:Category):Observable<Category> {
    return this.http.put<Category>(this.apiUrlCategories+id, category);
  }
}
