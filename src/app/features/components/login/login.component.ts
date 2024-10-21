import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserManagementService } from '../../../services/user-management.service';
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';
import { userkeystorage } from '../../../../assets/enums/const';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;

  loading = false;
  error = false;
  isForgotPassword = false;
  alertForgotSUccess = false;

  txtAlertError = "";

  constructor(private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private router: Router) {

    this.userManagementService.logout();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required
      ]]
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginUser(this.loginForm.value.email, this.loginForm.value.password);
    }
  }

  loginUser(emailData: string, passwordaData: string) {
    this.userManagementService.login({ email: emailData, password: passwordaData }).subscribe(response => {
      this.userManagementService.updateStorageUserLogin(response.token, response.adminUser)
      this.loading = false;
      this.router.navigate(["home"]);
    }, error => {
      this.errorManagement("Invalid username or password");
      this.loading = false;
    });
  }

  errorManagement(msmError: string) {
    this.txtAlertError = msmError;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }


  showForgotPassword() {
    this.isForgotPassword = !this.isForgotPassword;
  }

  forgotPassword(): void {
    this.loading = true;
    if (this.forgotPasswordForm.valid) {
      this.userManagementService.forgotPassword(this.forgotPasswordForm.value.email).subscribe(
        data=> {
          this.loading = false;
          this.alertForgotSUccess = true;
          setTimeout(() => {
            this.alertForgotSUccess = false;
          }, 7000);
        },
        error => {
          this.loading = false;
          this.errorManagement("User not found");
        });
    }
  }

}
