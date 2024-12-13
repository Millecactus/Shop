import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  private readonly BASE_URL = "http://localhost:3000/users";
  private http : HttpClient = inject(HttpClient);


  saveUser(user: User): Observable<User>{
    return this.http.post<User>(this.BASE_URL, user);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.BASE_URL, user);
  }
}



export interface User{
  email : string;
  password : string;
  name: string;
}

