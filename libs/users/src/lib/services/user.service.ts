import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrlUser = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) {}

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlUser);
  }

  createUser(user:User):Observable<User>{
    console.log(user)
    return this.http.post<User>(this.apiUrlUser, user);
  }

  deleteUser(id:string):Observable<unknown>{
    return this.http.delete<unknown>(this.apiUrlUser+id);
  }

  getUser(id: string):Observable<User> {
    return this.http.get<User>(this.apiUrlUser+id);
  }

  updateUser(user:User):Observable<User> {
    return this.http.put<User>(this.apiUrlUser+user.id, user);
  }
}
