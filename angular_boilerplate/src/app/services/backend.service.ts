import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  API_URL = 'http://localhost:3000'

  user: User;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('user_profile');
    if (storedUser)
      this.user = JSON.parse(storedUser);
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('user_profile');
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

  register(data: Object) {
    return this.http.post(this.API_URL + '/users/register', data)
      .pipe(
        map((resp) => {
          return resp;
        })
      )
  }

  login(data: Object) {
    return this.http.post(this.API_URL + '/auth/login', data)
      .pipe<any>(
        map((resp) => {
          return resp;
        })
      )
  }

  getUser() {
    return this.http.get(this.API_URL + '/users/getUser');
  }

}
