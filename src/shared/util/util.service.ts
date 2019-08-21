import { AlertMessageComponent } from './../../app/components/alert-message/alert-message.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataProvider } from '../data/data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SplashScreenComponent } from 'src/app/page/splash-screen/splash-screen.component';
import { LoadingScreenComponent } from 'src/app/components/loading-screen/loading-screen.component';
import { DialogwaitcloseComponent } from 'src/app/components/dialogwaitclose/dialogwaitclose.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  loading: any;

  constructor(private router: Router, private data: DataProvider, private dialog: MatDialog) { }


  ShowLoading() {
    this.loading = this.dialog.open(LoadingScreenComponent, {
      width: "100%",
      height: "100%",
      panelClass: "my-modal",
      disableClose: true,
    });
  }
  HideLoading() {
    this.loading.close();
  }

  AlertMessage(title: string, content: string, data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = "popup-modal"
    dialogConfig.data = { title: title, body: content, data };

    this.dialog.open(AlertMessageComponent, dialogConfig);
  }
  AlertMessageWaitClose(title: string, content: string, data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.panelClass = "popup-modal"
    dialogConfig.data = { title: title, body: content , data };

    const disalogRef = this.dialog.open(DialogwaitcloseComponent, dialogConfig);

    return disalogRef;
  }

  MessageError() {

    this.AlertMessage('เกิดข้อผิดพลาด', 'ไม่สามารถดำเนินการได้ กรุณาตรวจสอบอีกครั้ง', {});

  }
}
