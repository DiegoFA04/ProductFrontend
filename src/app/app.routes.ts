import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {HomeComponent} from "./public/pages/home/home.component";
import {ProductManagementComponent} from "./products/pages/product-management/product-management.component";
import {authenticationGuard} from "./iam/services/authentication.guard";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductManagementComponent, canActivate: [authenticationGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];
