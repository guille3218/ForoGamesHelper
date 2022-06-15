import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  hide = true;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly apiService: ApiService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly auth: AuthService,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
        .subscribe((data) => {
          console.log(data);
          if (data.status === 200) {
            this.cookieService.set("currentUser", JSON.stringify(data.body));
            this.auth.loginStatus$.next(true);
            this._router.navigate(['./']);
          } else {

          }
        },
          error => {
            this._dialog.open(DialogComponent, {
              data: {
                title: 'DIALOG.TITLE_ERROR',
                message: error.error,
                success: false
              },
              width: '25%',
            });
          }
        )
    }

  }

}
