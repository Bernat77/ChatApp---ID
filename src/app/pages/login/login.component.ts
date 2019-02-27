import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { Alert } from 'src/app/classes/alert';
import { AlertService } from 'src/app/services/alert.service';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { LoadingService } from 'src/app/services/loading.service';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  //public class variables: The form, the suscriptions it'll push and the return url.
  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;


  constructor(private fb: FormBuilder,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.createForm();

  }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';

  }

  //once the component is destroyed, it will unsuscribe the component from each subscription in the array.
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


//TThe login form will set the validators.

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {
    // TODO call the auth service
    this.loadingService.isLoading.next(true); //this starts the loading service.
    if (this.loginForm.valid) {

      const { email, password } = this.loginForm.value; //thos validates the form inputs

      this.subscriptions.push(
        this.auth.login(email, password).subscribe(success => { 
          if (success) { //if the login its successful
            this.router.navigateByUrl(this.returnUrl); //go to the returnurl (chat)
          } else {
            this.displayFailedLogin(); //if not it shows the failed login.
          }
          this.loadingService.isLoading.next(false); // independent from what happens the loading is canceled
        })
      );
    } else {

      this.displayFailedLogin();
      this.loadingService.isLoading.next(false);
    }
  }

  //this will display the failed alert by creating a new alert and using .next to fire that alert to the subject subscribed on appcomponent
  private displayFailedLogin(): void {
    const failedLoginAlert = new Alert('Invalid email/password combination, try again.', AlertType.Danger);
    this.alertService.alerts.next(failedLoginAlert);
  }







}
