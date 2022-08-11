import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { DialogService } from 'src/app/services/dialog.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  loading$ = this.loader.loading$;
  appointment: Appointment;
  reason: string;
  status = [
    { id: 0, value: 'Active' ,name:'Kích Hoạt'},
    { id: 1, value: 'Ban' ,name: 'Cấm'},
    { id: 2, value: 'UnBan' ,name: 'Bỏ Cấm'},
  ]

  constructor(public loader: LoadingService, private route: ActivatedRoute, private appointmentService: UserService, private router: Router, private dialog: DialogService, private banDialog: MatDialog) { }

  ngOnInit(): void {
    const appointmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.appointmentService.getAppointmentDetails(appointmentId).subscribe((data: Appointment) => {
      this.appointment = data;
      this.appointment.listSharedMedicalRecord = this.appointment.listSharedMedicalRecord.sort((a,b)=>a.appointmentId-b.appointmentId);
      this.appointment.listSharedPrescription = this.appointment.listSharedPrescription.sort((a,b)=>a.appointmentId-b.appointmentId);
      var i = 0;
      this.appointment.listSharedMedicalRecord.forEach((mr)=>{
        mr.prescriptionSharedUrl=this.appointment.listSharedPrescription[i].url;
        i++;
      })

    },
      (error: HttpErrorResponse) => {
        
        this.router.navigateByUrl("/home/appointment-list");

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
