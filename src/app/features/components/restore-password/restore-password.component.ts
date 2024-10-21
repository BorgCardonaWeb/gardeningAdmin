import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { userSession } from '../../../../assets/enums/generalEnums';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '../../../services/user-management.service';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restore-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './restore-password.component.html',
  styleUrl: './restore-password.component.scss'
})
export class RestorePasswordComponent {
  resetPasswordForm: FormGroup;
  errorMessage: string | null = null;
  token: string | null = null;
  alertSuccess = false;
  error = false;
  loading = false;
  txtAlertError = "";

  loginTitle = userSession.login;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private userManagementService: UserManagementService,
    private router: Router) {
    this.resetPasswordForm = this.fb.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {

    this.loading = true;
    if (this.resetPasswordForm.valid && this.token) {
      const passwordData = {
        newPassword: this.resetPasswordForm.value.newPassword,
        token: this.token
      };

      this.userManagementService.resetPassword(passwordData).subscribe(
        data => {
          this.loading = false;
          this.alertSuccess = true;
        },
        () => {
          this.txtAlertError = "Your session has expired. Please request a new password reset link.";
          this.alertSuccess = false;
          this.error = true;
          this.loading = false;

          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      )
    }
  }

  goToLogin() {
    this.router.navigate(["login"]);
  }


}
