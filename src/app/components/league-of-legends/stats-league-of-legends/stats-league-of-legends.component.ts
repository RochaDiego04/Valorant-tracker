import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LeagueOfLegendsService } from 'src/app/services/league-of-legends.service';

@Component({
  selector: 'app-stats-league-of-legends',
  templateUrl: './stats-league-of-legends.component.html',
  styleUrls: ['./stats-league-of-legends.component.css']
})
export class StatsLeagueOfLegendsComponent implements OnInit {
  user$!: Observable<any>;
  accountInfo!: Observable<any>;
  accountName!: string;

  constructor(
    private lolService: LeagueOfLegendsService,
    private authSvc: AuthService,
    private router: Router){
  }

  ngOnInit(): void {
    this.user$ = this.authSvc.userState$;
    this.user$.pipe(
      take(1)
    ).subscribe({
      next: async (user) => {
        if (user) {
          const userId = user.uid;
          const accountName = await this.lolService.getAccountName(userId);
          if(accountName)
            this.accountInfo = this.lolService.getAccountInfoAPI(accountName);
        }
      }
    });
  }
  
  ngOnDestroy(): void {
    
  }

  logout(): void {
    this.user$.pipe(
      take(1)
    ).subscribe({
      next: async (user) => {
        if (user) {
          const userId = user.uid;
          await this.lolService.deleteAccountName(userId);
          this.lolService.loggedIn.next(false);
          console.log('User logged out successfully');
          this.router.navigate(['/games/league-of-legends/login']);
        }
      }
    });
  }


}
