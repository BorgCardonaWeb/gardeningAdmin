import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { InitPageComponent } from './features/components/init-page/init-page.component';
import { HomeComponent } from './features/components/home/home.component';

export const routes: Routes = [
    {path:'login', component: InitPageComponent},
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    {path:'', redirectTo: '/login', pathMatch:'full'}
];
