import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-get-status-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-status-label.component.html',
  styleUrl: './get-status-label.component.scss'
})
export class GetStatusLabelComponent {

  @Input() status = "";

}
