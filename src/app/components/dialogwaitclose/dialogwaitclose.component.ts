import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogwaitclose',
  templateUrl: './dialogwaitclose.component.html',
  styleUrls: ['./dialogwaitclose.component.css']
})
export class DialogwaitcloseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogwaitcloseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ok(){
    this.dialogRef.close('OK');
  }
}
