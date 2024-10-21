import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../footer/FooterComponent';

@Component({
  selector: 'app-init-page',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './init-page.component.html',
  styleUrl: './init-page.component.scss'
})
export class InitPageComponent {

}
