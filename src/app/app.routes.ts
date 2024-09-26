import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { InitPageComponent } from './features/components/init-page/init-page.component';
import { HomeComponent } from './features/components/home/home.component';
import { ProductsManagementComponent } from './features/components/products-management/products-management.component';
import { OrderManagementComponent } from './features/components/order-management/order-management.component';

export const routes: Routes = [
    { path: 'login', component: InitPageComponent },
    { 
      path: 'home', 
      component: HomeComponent, 
      canActivate: [authGuard], 
      children: [
        { path: 'ordersManagement', component: OrderManagementComponent, canActivate: [authGuard] },
        { path: 'productsManagement', component: ProductsManagementComponent, canActivate: [authGuard] },
      ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
