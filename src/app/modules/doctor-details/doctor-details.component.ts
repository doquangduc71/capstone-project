import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Doctor } from 'src/app/model/doctor';
import { DialogService } from 'src/app/services/dialog.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  expireDate:string;
  loading$ = this.loader.loading$;
  doctor: Doctor;
  status = [
    { id: 0, value: 'Active' },
    { id: 1, value: 'Ban' },
    { id: 2, value: 'UnBan' },
  ]

  constructor(public loader: LoadingService,private route: ActivatedRoute, private doctorService: UserService, private router: Router, private dialog: DialogService) { }

  ngOnInit(): void {
    const doctorId = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getDoctorById(doctorId).subscribe((data: Doctor) => {
      this.doctor = data;


    },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
        this.router.navigateByUrl("/home/doctor-list");

      });

  }
  changeStatus() {
    this.dialog.confirmDialog({
      title: 'Thay đổi trạng thái',
      message: 'Bạn muốn thực hiện hành động này chứ?',
      confirmCaption: 'Xác nhận',
      cancelCaption: 'Hủy',
      type:"confirm"
    }).subscribe((confirmed) => {
      if (confirmed){
        this.expireDate= (<HTMLInputElement>document.getElementById("expireDate")).value;
          if(this.expireDate==""){
            this.openAlertDialog();
            
            return;
          }
        if (this.doctor.isActive == 0) {
         
          this.updateStatusDoctor(1, this.doctor.id);
    
        } else if (this.doctor.isActive == 1) {
          
          
          
          this.updateStatusDoctor(2, this.doctor.id);
    
        } else if (this.doctor.isActive == 2) {
          this.updateStatusDoctor(1, this.doctor.id);
    
        }
      }
    });
    
  }
  updateStatusDoctor(isActive: number, id: number,) {
    this.doctorService.updateStatus(isActive, id,this.expireDate).subscribe((data: any) => {
      
      this.doctor.isActive = isActive;

    },
      (error: HttpErrorResponse) => {
        alert(error.error.message);


      });

  }
  openAlertDialog(){
    this.dialog.confirmDialog({
      title: 'Thông báo',
      message: 'Cần thiết lập ngày hết hạn chứng chỉ',
      confirmCaption: 'OK',
      cancelCaption: 'Hủy',
      type:"alert"
    }).subscribe((ok)=>{
      return;
    });
  }

}
