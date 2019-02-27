import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

// to implement all the security
import { map, take, tap } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from './../enums/alert-type.enum';
import { AuthService } from '../services/auth.service';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    //we retrieve using the pipe where we do a series of actions and combine it to obtain a desired output
    return this.auth.currentUser.pipe(
      take(1),
      map((currentUser) => !!currentUser),  //!!currentuser casts to boolean, so if it's null it's false, else true
      tap((loggedIn) => { 
        if (!loggedIn) { //if not logged we show the alert warning the status and redirect to login
          this.alertService.alerts.next(new Alert('You must be logged in to access that page.', AlertType.Danger));
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
      })
    )
  }
}