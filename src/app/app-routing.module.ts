import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { EsportsComponent } from './components/esports/esports.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { authGuard } from './shared/guards/auth.guard';
import { onlyLoggedInGuard } from './shared/guards/only-logged-in.guard';
import { LeagueOfLegendsComponent } from './components/league-of-legends/league-of-legends.component';
import { LoginAdvertisementComponent } from './components/login-advertisement/login-advertisement.component';
import { LoginLeagueOfLegendsComponent } from './components/league-of-legends/login-league-of-legends/login-league-of-legends.component';
import { StatsLeagueOfLegendsComponent } from './components/league-of-legends/stats-league-of-legends/stats-league-of-legends.component';
import { leagueOfLegendsGuard } from './shared/guards/league-of-legends.guard';
import { LoginValorantComponent } from './components/valorant/login-valorant/login-valorant.component';
import { ValorantComponent } from './components/valorant/valorant.component';
import { valorantGuard } from './shared/guards/valorant.guard';
import { StatsValorantComponent } from './components/valorant/stats-valorant/stats-valorant.component';


const routes: Routes = [
  /* General Paths*/
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'views/news', component: NewsComponent},
  {path: 'views/esports', component: EsportsComponent},
  {path: 'views/general-information', component: GeneralInformationComponent},
  {path: 'views/about-us', component: AboutUsComponent},
  
  /* User Paths */
  {path: 'user/log-in', component: LogInComponent, canActivate: [authGuard]},
  {path: 'user/sign-up', component: SignUpComponent, canActivate: [authGuard]},
  {path: 'user/email-verification', component: EmailVerificationComponent},
  {path: 'user/forgot-password', component: ForgotPasswordComponent},
  
  /* Gaming Paths */
  {path: 'games/login-advertisement', component: LoginAdvertisementComponent, canActivate: [authGuard]},
  {
    path: 'games/league-of-legends', 
    component: LeagueOfLegendsComponent, 
    canActivate: [onlyLoggedInGuard], //user must be verified
    children: [
      {
        path: 'login',
        component: LoginLeagueOfLegendsComponent,
        canActivate: [leagueOfLegendsGuard]
      },
      {
        path: 'stats',
        component: StatsLeagueOfLegendsComponent,
        canActivate: [leagueOfLegendsGuard]
      }
    ]
  },
  {
    path: 'games/valorant', 
    component: ValorantComponent, 
    canActivate: [onlyLoggedInGuard], //user must be verified
    children: [
      {
        path: 'login',
        component: LoginValorantComponent,
        canActivate: [valorantGuard]
      },
      {
        path: 'stats',
        component: StatsValorantComponent,
        canActivate: [valorantGuard]
      }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
