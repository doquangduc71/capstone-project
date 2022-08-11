import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { NotiDialogData } from '../model/noti-dialog-data';

import { SendNotiDialogComponent } from '../shared/component/send-noti-dialog/send-noti-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotiDialogService {

  constructor(private dialog: MatDialog) {}
  
  confirmDialog(data: NotiDialogData): Observable<boolean> {
    
    return this.dialog
      .open(SendNotiDialogComponent, {
        data,
        width: '400px',
        disableClose: true,
        
        
      })
      .afterClosed();
  }
}
