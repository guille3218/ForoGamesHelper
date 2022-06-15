import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserResponse } from 'src/app/model/user-data';

@Component({
  selector: 'menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {

  public href: string = "";

  user: UserResponse;

  constructor(
    private cookieService: CookieService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.loginStatus$.subscribe(() => {
      if (this.cookieService.get("currentUser")) {
        this.user = JSON.parse(this.cookieService.get("currentUser"));
      } else {
        this.user = null;
      }
    })


  }

  logOut() {
    this.auth.logout();
  }
}
