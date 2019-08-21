import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { LayoutComponent } from './page/layout/layout.component';
import { AuthGuard } from 'src/shared/guard';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { SplashScreenComponent } from './page/splash-screen/splash-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { MatDialogModule } from '@angular/material/dialog';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material';
import { from } from 'rxjs';
import { UtilService } from 'src/shared/util/util.service';
import { DataProvider } from 'src/shared/data/data';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UploadImageService } from 'src/shared/save/upload-service';
import { ChartModule } from 'angular2-chartjs';
import { DialogwaitcloseComponent } from './components/dialogwaitclose/dialogwaitclose.component';




export const firebaseConfig = {
  apiKey: "AIzaSyCFxr7zV-iI9x2ZypERTOdTZSUv1xJxSyk",
  authDomain: "stockchudi.firebaseapp.com",
  databaseURL: "https://stockchudi.firebaseio.com",
  projectId: "stockchudi",
  storageBucket: "gs://stockchudi.appspot.com/",
  messagingSenderId: "524009469745",
  appId: "1:524009469745:web:e28c528ef34f4738"
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingScreenComponent,
    SplashScreenComponent,
    AlertMessageComponent,
    DialogwaitcloseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    ChartModule,
    NgbModule,
    MatDatepickerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule, FormsModule, ReactiveFormsModule
  ],
  providers: [AuthGuard,AngularFireDatabase,UtilService,DataProvider,UploadImageService],
  entryComponents:[SplashScreenComponent,AlertMessageComponent,LoadingScreenComponent,DialogwaitcloseComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
