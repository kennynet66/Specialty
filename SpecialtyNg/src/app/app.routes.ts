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
import { SpecialistDashboardComponent } from './Components/Specialist/specialist-dashboard/specialist-dashboard.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ContactComponent } from './Components/contact/contact.component';
import { HomeComponent } from './Components/Users/home/home.component';
import { HistoryComponent } from './Components/history/history.component';
import { SingleSpecialistComponent } from './Components/Users/single-specialist/single-specialist.component';
import { UserMessageComponent } from './Components/Users/user-message/user-message.component';
import { SpecialistMessageComponent } from './Components/Specialist/specialist-message/specialist-message.component';

export const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'verify/:id', component: VerifyComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'user-dashboard', component: UserDashboardComponent,
  children: [
    {path: 'messages/:id', component: UserMessageComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'home', component: HomeComponent},
    {path: 'specialist/:id', component: SingleSpecialistComponent},
  ]},
  {path: 'more-details/:id', component: MoreDetailsComponent},
  {path: 'specialist-dashboard', component: SpecialistDashboardComponent, children: [
    {path: 'messages', component: SpecialistMessageComponent},
    {path: 'profile/:id', component: ProfileComponent}
  ]},
  {path: '**', component: NotFoundComponent}
];
