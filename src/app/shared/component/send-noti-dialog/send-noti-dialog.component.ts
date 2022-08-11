import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NotiDialogData } from 'src/app/model/noti-dialog-data';

@Component({
  selector: 'app-send-noti-dialog',
  templateUrl: './send-noti-dialog.component.html',
  styleUrls: ['./send-noti-dialog.component.css']
})
export class SendNotiDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: NotiDialogData,public dialogRef: MatDialogRef<SendNotiDialogComponent>) {}
  

  ngOnInit(): void {
  }

}
