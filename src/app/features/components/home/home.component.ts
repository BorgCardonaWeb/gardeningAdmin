import { Component, OnInit } from '@angular/core';
import { NavUserComponent } from '../nav-user/nav-user.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavUserComponent, RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
 
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url === '/home') {
      this.router.navigate(['/home/ordersManagement']);
    }
  }
}
