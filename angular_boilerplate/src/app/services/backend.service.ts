import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  API_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

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
      .pipe(
        map((resp) => {
          return resp;
        })
      )
  }

}
