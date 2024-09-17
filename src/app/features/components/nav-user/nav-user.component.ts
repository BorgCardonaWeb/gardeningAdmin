import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../../services/user-management.service';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.scss']
})
export class NavUserComponent implements OnInit {

  userData: any;

  constructor(private userManagementService: UserManagementService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userData = this.userManagementService.getUser();
    console.log(this.userData)
  }

}
