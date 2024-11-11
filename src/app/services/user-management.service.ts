import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { userkeystorage, userkeystorageToken } from '../../assets/enums/const';
import { environment } from '../enviroment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private apiUrl = `${environment.apiUrl}/admin-auth`;

  constructor(private http: HttpClient) { }

  logout(): void {
    localStorage.removeItem(userkeystorageToken);
    localStorage.removeItem(userkeystorage);
    localStorage.clear();
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

  getClientByID(clientId: string){
    const url = `${environment.apiUrl}/auth`;
    return this.http.get(`${url}/user/${clientId}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }


}
