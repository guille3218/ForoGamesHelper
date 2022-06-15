import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { UserResponse } from "src/app/model/user-data";

export interface CommonResponse {
  ErrorCode: number,
  message: String,
  data: Object
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endPoint: string = 'http://localhost:8080/'

  loginStatus$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {

  }

  /**
     * 
     * @param formData as the login form data
     */
  login(params: any): Observable<HttpResponse<UserResponse>> {
    return this.http.get<UserResponse>(this.endPoint + "login", { params, observe: 'response' })
      .pipe(
        tap((resp: HttpResponse<UserResponse>) => {
          if (resp.headers.get('x-auth')) {
            this.cookieService.set("currentUser", resp.headers.get('x-auth'));
            this.loginStatus$.next(true);
          }
          return resp;
        }),
        catchError(this.handleError)
      );
  }

  /**
     * 
     * @param error error 
     */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  logout() {
    this.cookieService.deleteAll();
    this.loginStatus$.next(false);
    this.router.navigate(['/login']);
  }

  /**
     *
     * @returns {Observable<T>}
     */
  isLoggedIn(): Observable<boolean> {
    return this.loginStatus$.asObservable();
  }
  /**
      * if we have token the user is loggedIn
      * @returns {boolean}
      */
  private hasToken(): boolean {
    return this.cookieService.check('currentUser');
  }
}