import { Component } from '@angular/core';
import { NavUserComponent } from '../nav-user/nav-user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
