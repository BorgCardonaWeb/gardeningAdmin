import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../../services/user-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.scss']
})
export class NavUserComponent implements OnInit {

  userData: any;
  activeTab: string = 'ordersManagement';



  constructor(private userManagementService: UserManagementService, private router: Router) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userData = this.userManagementService.getUser();
  }

  ordersManagementNavigate() {
    this.activeTab = 'ordersManagement';
    this.router.navigate(['/home/ordersManagement']);
  }

  producstManagementNavigate() {
    this.activeTab = 'productsManagement';
    this.router.navigate(['/home/productsManagement']);
  }

  logout(){
    this.userManagementService.logout();
    this.router.navigate(['/login']);
  }


}
