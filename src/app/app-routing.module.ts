import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './app.routes';

import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: ROUTES.REGISTER, component: RegisterComponent },
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
