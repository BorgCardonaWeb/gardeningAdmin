import { Injectable } from '@angular/core';
import { UserManagementService } from './user-management.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userManagementService: UserManagementService) { }

  isAuthenticated(): boolean {
    const token = this.userManagementService.getToken();
    return token !== null;
  }

  logout(): void {
    this.userManagementService.logout();
  }

}
