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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {
    // TODO call the auth service
    this.loadingService.isLoading.next(true);
    if (this.loginForm.valid) {

      const { email, password } = this.loginForm.value;

      this.subscriptions.push(
        this.auth.login(email, password).subscribe(success => {
          if (success) {
            this.router.navigateByUrl(this.returnUrl);
          }
          this.loadingService.isLoading.next(false);
        })
      );


    } else {
      //setTimeout(() => {
      const failedLoginAlert = new Alert('Correo o password incorrecto.', AlertType.Danger);

      this.loadingService.isLoading.next(false);
      this.alertService.alerts.next(failedLoginAlert);
      //}, 2000);

    }
  }






}
