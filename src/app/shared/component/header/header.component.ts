import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { SendNotiDialogComponent } from '../send-noti-dialog/send-noti-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private dialog: DialogService, private notiDialog: MatDialog) { }
  
  ngOnInit(): void {

  }
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }
  logout() {
    this.dialog.confirmDialog({
      title: 'Đăng xuất',
      message: 'Bạn muốn thực hiện hành động này chứ?',
      confirmCaption: 'Xác nhận',
      cancelCaption: 'Hủy',
      reason: '',
      type: "confirm"
    }).subscribe((confirmed) => {
      if (confirmed) {
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    });

  }
  changePassword() {
    this.router.navigateByUrl('/home/change-password');
  }
  sendNotification() {
    let dialogRef = this.notiDialog.open(SendNotiDialogComponent, {
      data: {
        title: 'Thông báo đến người dùng',
        messagePrice: 'Nhập số tiền thay đổi',
        messageReason: 'Nội dung',
        confirmCaption: 'Xác nhận',
        cancelCaption: 'Hủy',

        type: "confirmBan"
      },
      width: '400px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == false) {
        return;
      } else if (result.price === undefined || result.price === "") {

        this.openAlertDialog('Cần nhập số tiền');

      } else if (result.reason === undefined || result.reason === "") {


        this.openAlertDialog('Cần nhập nội dung');

      } else if (result != false) {
      
        console.log("noi dung: " + result.reason);
        console.log("gia tien: " + result.price);

      }



    });
  }
  openAlertDialog(message: string) {
    this.dialog.confirmDialog({
      title: 'Thông báo',
      message: message,
      confirmCaption: 'OK',
      cancelCaption: 'Hủy',
      reason: '',
      type: "alert"
    }).subscribe((ok) => {
      return;
    });
  }
}
