import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-appointment-list-details',
  templateUrl: './appointment-list-details.component.html',
  styleUrls: ['./appointment-list-details.component.css']
})
export class AppointmentListDetailsComponent implements OnInit {

  searchText:string="";
  indexPagination: number = 1;
  totalPagination: number;
  numbersPage:Array<number>;
  status=[
   
    {id:1,name:'Chưa xác nhận',value:'In-Active'},
    {id:2,name:'Đã xác nhận',value:'Active'},
    {id:3,name:'Hoàn thành',value:'Done'},
    {id:4,name:'Huỷ',value:'Cancel'},

  ]
  appointments: Appointment[] = [];
  numberOfAppoinment:number;
  constructor(private appointmentService: UserService,private router :Router,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentListDetails(0,this.searchText).subscribe((data: Appointment[]) => {
      this.appointments = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    });
   
    this.appointmentService.getNumberOfAppointmentDetails(this.searchText).subscribe((data: number) => {
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
      console.log(error.message);
    });
  }
  indexPaginationChage(value: number) {
    this.indexPagination = value;
    this.appointmentService.getAppointmentListDetails((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Appointment[]) => {
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
    this.appointmentService.getAppointmentListDetails((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Appointment[]) => {
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
    
    this.appointmentService.getAppointmentListDetails((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Appointment[]) => {
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
      this.appointmentService.getAppointmentListDetails((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Appointment[]) => {
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
    this.appointmentService.getAppointmentListDetails((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Appointment[]) => {
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
    this.router.navigate(['/home/appointment-list/'+id],{relativeTo:this.activatedRoute});
  }

}
