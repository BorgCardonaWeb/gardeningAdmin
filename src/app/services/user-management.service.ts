import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { userkeystorage, userkeystorageToken } from '../../assets/enums/const';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private apiUrl = 'http://localhost:3000/admin-auth';

  constructor(private http: HttpClient) { }

  logout(): void {
    localStorage.removeItem(userkeystorageToken);
    localStorage.removeItem(userkeystorage);
  }

  getToken(): string | null {
    return localStorage.getItem(userkeystorageToken);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  updateStorageUserLogin(token: string, user: string) {
    localStorage.setItem(userkeystorageToken, token);
    localStorage.setItem(userkeystorage, JSON.stringify(user));
  }


  getUser(): any {
    return JSON.parse(localStorage.getItem(userkeystorage) || '{}');
  }

}
