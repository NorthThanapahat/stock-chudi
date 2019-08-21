import { NavbarComponent } from './../../components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngb-modal';
import { LayoutRoutingModule } from './layout-routing.module';
import { ChartModule } from 'angular2-chartjs';
@NgModule({
  declarations: [HomeComponent,LayoutComponent,NavbarComponent],
  imports: [
    LayoutRoutingModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    ModalModule,
    MatNativeDateModule,
    NgbPaginationModule,
    MatInputModule,
    MatFormFieldModule,MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    NgbAlertModule,
    MatCheckboxModule,
    NgbPaginationModule,
    MatRadioModule,
    MatSelectModule,
    NgbAlertModule,
    ReactiveFormsModule
  ], providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
})
export class LayoutModule { }
