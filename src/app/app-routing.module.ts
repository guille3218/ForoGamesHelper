import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './app.routes';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthService } from './core/auth/auth.service';
import { AdminComponent } from './views/admin/admin.component';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: ROUTES.REGISTER, component: RegisterComponent },
    { path: ROUTES.LOGIN, component: LoginComponent },
    { path: ROUTES.ADMIN, component: AdminComponent, canActivate: [AuthGuard] }
]


@NgModule({
    imports: [RouterModule.forRoot(routes, {
        relativeLinkResolution: 'corrected',
        scrollPositionRestoration: 'enabled'
    })],
    providers: [AuthService, AuthGuard],
    exports: [RouterModule]
})
export class AppRoutingModule { }
