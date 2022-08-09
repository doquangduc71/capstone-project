import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { DialogService } from 'src/app/services/dialog.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  
  loading$ = this.loader.loading$;
  patient: Patient;
  reason: string;
  status = [
    { id: 0, value: 'Active' ,name:'Kích Hoạt'},
    { id: 1, value: 'Ban' ,name: 'Cấm'},
    { id: 2, value: 'UnBan' ,name: 'Bỏ Cấm'},
  ]

  constructor(public loader: LoadingService, private route: ActivatedRoute, private doctorService: UserService, private router: Router, private dialog: DialogService, private banDialog: MatDialog) { }

  ngOnInit(): void {
    const patientId = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getPatientById(patientId).subscribe((data: Patient) => {
      this.patient = data;


    },
      (error: HttpErrorResponse) => {
        
        this.router.navigateByUrl("/home/patient-list");

      });

  }
  changeStatus() {
    
    if (this.patient.isActive == 1) {
     
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
          
          
          this.openAlertDialog('Cần nhập lý do cấm tài khoản');
          
        } else if (result != false) {
          
          
          this.updateStatusPatient(2, this.patient.id,result.trim());
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

          if (this.patient.isActive == 0) {

            this.updateStatusPatient(1, this.patient.id,"");

          } else if (this.patient.isActive == 1) {



            this.updateStatusPatient(2, this.patient.id,"");

          } else if (this.patient.isActive == 2) {
            this.updateStatusPatient(1, this.patient.id,"");

          }
        }
      });
    }
    

    
  }
  
  sendNotification(){
    let dialogRef = this.banDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Gửi thông báo đến bệnh nhân',
        message: 'Nội dung thông báo',
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
        
        
        this.openAlertDialog('Cần nhập nội dung thông báo');
        
      } else if (result != false) {

        this.doctorService.sendNotificationFromAdmin(this.patient.id,result).subscribe((data:any)=>{
          this.openAlertDialog(data.message);
        })
        
      }
      
        

    });
  }
  updateStatusPatient(isActive: number, id: number,reason:string) {
    this.doctorService.updateStatusForPatient(isActive, id,reason).subscribe((data: any) => {
      
      this.patient.isActive = isActive;
      this.ngOnInit();
      this.openAlertDialog(data.message);
      
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
