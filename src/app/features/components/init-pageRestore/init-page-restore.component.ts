import { Component } from '@angular/core';
import { RestorePasswordComponent } from '../restore-password/restore-password.component';

@Component({
  selector: 'app-init-restore-page',
  standalone: true,
  imports: [RestorePasswordComponent],
  templateUrl: './init-page-restore.component.html',
  styleUrl: './init-page-restore.component.scss'
})
export class InitPageRestoreComponent {

}
