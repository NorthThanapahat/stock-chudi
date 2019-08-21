import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
      path: '',
      component:LayoutComponent,
      children: [
          {path:'',redirectTo:'home',pathMatch:'prefix'},
          {path:'home',component:HomeComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
