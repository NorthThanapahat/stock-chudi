import { UploadImage } from './../../app/modal/uploadimage';
import { AlertMessageComponent } from './../../app/components/alert-message/alert-message.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from '../data/data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SplashScreenComponent } from 'src/app/page/splash-screen/splash-screen.component';
import { LoadingScreenComponent } from 'src/app/components/loading-screen/loading-screen.component';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
    private basePath:string = '/Products';
   
  constructor(private db: AngularFireDatabase) { }

  pushUploadImage(upload:UploadImage){
      let storageRef = firebase.storage().ref();
      return storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

  }


}
