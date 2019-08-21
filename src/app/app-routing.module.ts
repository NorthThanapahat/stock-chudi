import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { AuthGuard } from 'src/shared/guard';
import { SplashScreenComponent } from './page/splash-screen/splash-screen.component';

const routes: Routes = [
  { path: '', loadChildren: './page/layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
  { path: 'splash-screen', component: SplashScreenComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
