import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { VerifyEmailComponent } from './Components/verify-email/verify-email.component';
import { VerifyComponent } from './Components/verify/verify.component';
import { DetailsComponent } from './Components/details/details.component';
import { UserDashboardComponent } from './Components/Users/user-dashboard/user-dashboard.component';
import { MoreDetailsComponent } from './Components/more-details/more-details.component';

export const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'verify/:id', component: VerifyComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'user-dashboard', component: UserDashboardComponent},
  {path: 'more-details/:id', component: MoreDetailsComponent},
  {path: '**', component: NotFoundComponent}
];
