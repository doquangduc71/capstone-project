import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { Doctor } from 'src/app/model/doctor';
import { DialogService } from 'src/app/services/dialog.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  expireDate: string;
  loading$ = this.loader.loading$;
  doctor: Doctor;
  reason: string;
  status = [
    { id: 0, value: 'Active' },
    { id: 1, value: 'Ban' },
    { id: 2, value: 'UnBan' },
  ]

  constructor(public loader: LoadingService, private route: ActivatedRoute, private doctorService: UserService, private router: Router, private dialog: DialogService, private banDialog: MatDialog) { }

  ngOnInit(): void {
    const doctorId = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getDoctorById(doctorId).subscribe((data: Doctor) => {
      this.doctor = data;


    },
      (error: HttpErrorResponse) => {
        
        this.router.navigateByUrl("/home/doctor-list");

      });

  }
  changeStatus() {
    this.expireDate = (<HTMLInputElement>document.getElementById("expireDate")).value;
    if (this.expireDate == "") {
      this.openAlertDialog('Cần thiết lập ngày hết hạn chứng chỉ');

      return;
    }
    if (this.doctor.isActive == 1) {
     
      let dialogRef = this.banDialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Thay đổi trạng thái',
          message: 'Lý do ban tài khoản',
          confirmCaption: 'Xác nhận',
          cancelCaption: 'Hủy',
          reason: this.reason,
          type: "confirmBan"
        },
        width: '400px',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {

        if (result == undefined || result==="") {
          
          
          this.openAlertDialog('Cần nhập lý do ban tài khoản');
          
        } else if (result != false) {
          
          
          this.updateStatusDoctor(2, this.doctor.id,result.trim());
        }
        
          

      });
    } else {
      this.dialog.confirmDialog({
        title: 'Thay đổi trạng thái',
        message: 'Bạn muốn thực hiện hành động này chứ?',
        confirmCaption: 'Xác nhận',
        cancelCaption: 'Hủy',
        reason: '',
        type: "confirm"
      }).subscribe((confirmed) => {
        if (confirmed) {

          if (this.doctor.isActive == 0) {

            this.updateStatusDoctor(1, this.doctor.id,"");

          } else if (this.doctor.isActive == 1) {



            this.updateStatusDoctor(2, this.doctor.id,"");

          } else if (this.doctor.isActive == 2) {
            this.updateStatusDoctor(1, this.doctor.id,"");

          }
        }
      });
    }
    

    
  }
  updateStatusDoctor(isActive: number, id: number,reason:string) {
    this.doctorService.updateStatus(isActive, id, this.expireDate,reason).subscribe((data: any) => {
      
      this.doctor.isActive = isActive;
      this.ngOnInit();
      
    },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);


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
