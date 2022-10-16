import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postSupe(data: any) {
    return this.http.post<any>('http://localhost:3000/superList/', data);
  }

  getSupe() {
    return this.http.get<any>('http://localhost:3000/superList/');
  }

  putSupe(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/superList/' + id, data);
  }

  deleteSupe(id: number) {
    return this.http.delete<any>('http://localhost:3000/superList/' + id);
  }
}
