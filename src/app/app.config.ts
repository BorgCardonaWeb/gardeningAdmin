import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UserManagementService } from './services/user-management.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LocalStorageService } from './services/local-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), MdbModalService, LocalStorageService, UserManagementService, provideAnimationsAsync()]
};



