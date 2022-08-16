import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  
  searchText:string="";
  indexPagination: number = 1;
  totalPagination: number;
  numbersPage:Array<number>;

  appointments: Appointment[] = [];
  numberOfAppoinment:number;
  constructor(private appointmentService: UserService,private router :Router,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentList(0,this.searchText).subscribe((data: Appointment[]) => {
      this.appointments = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error?.message);
    });
   
    this.appointmentService.getNumberOfAppointment(this.searchText).subscribe((data: number) => {
      this.numberOfAppoinment = data;
      if ((this.numberOfAppoinment % 10) != 0) {
        this.totalPagination = (Math.floor(this.numberOfAppoinment / 10)) + 1;
        this.numbersPage = Array(this.totalPagination).fill(1).map((x, i) => i + 1);
      }else{
        this.totalPagination = (Math.floor(this.numberOfAppoinment / 10));
        this.numbersPage = Array(this.totalPagination).fill(1).map((x, i) => i + 1);
      }
      
     
      
    },
    (error:HttpErrorResponse)=>{
      console.log(error?.message);
    });
  }
  indexPaginationChage(value: number) {
    this.indexPagination = value;
    this.appointmentService.getAppointmentList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Appointment[]) => {
      this.appointments = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    })
  }

  firstPage() {
    if(this.totalPagination==0){
      return;
    }
    this.indexPagination = 1;
    this.appointmentService.getAppointmentList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Appointment[]) => {
      this.appointments = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    })
  }

  nextPage() {
    if(this.totalPagination==0){
      return;
    }
    this.indexPagination = this.indexPagination + 1;
    
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    
    this.appointmentService.getAppointmentList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Appointment[]) => {
      this.appointments = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    })
  }

  prviousPage() {
    if(this.totalPagination==0){
      return;
    }
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
      this.ngOnInit();
    } else {
      this.appointmentService.getAppointmentList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Appointment[]) => {
        this.appointments = data;
      }),
      (error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    }
  }

  lastPage() {
    if(this.totalPagination==0){
      return;
    }
    this.indexPagination = this.totalPagination;
    this.appointmentService.getAppointmentList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Appointment[]) => {
      this.appointments = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    })
  }
  navigateToPatientProfile(id:number){
    this.router.navigate(['/home/patient-list/'+id],{relativeTo:this.activatedRoute});

  }
  navigateToDoctorProfile(id:number){
    this.router.navigate(['/home/doctor-list/'+id],{relativeTo:this.activatedRoute});

  }
  search(){
    this.indexPagination=1;
    this.searchText=(<HTMLInputElement>document.getElementById("searchText")).value;
    
    this.ngOnInit();
  }
  navigateToDetails(id:number){
    this.router.navigate(['./'+id],{relativeTo:this.activatedRoute});
  }

}
