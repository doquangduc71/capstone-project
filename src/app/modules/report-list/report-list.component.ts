import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from 'src/app/model/report';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  defaultStatus = "";
  status=[
    
    {id:1,name:'Chưa Xử Lý',value:'In-Active'},
    {id:2,name:'Đã Xử Lý',value:'Active'},

  ]
  searchText:string="";
  indexPagination: number = 1;
  totalPagination: number;
  numbersPage:Array<number>;

  reports: Report[] = [];
  numberOfReport:number;
  constructor(private reportService: UserService,private router :Router,private activatedRoute : ActivatedRoute,private dialog: DialogService,private confirmDialog: MatDialog) { }

  ngOnInit(): void {
    this.reportService.getReportList(0,this.searchText).subscribe((data: Report[]) => {
      this.reports = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    });
   
    this.reportService.getNumberOfReport(this.searchText).subscribe((data: number) => {
      this.numberOfReport = data;
      if ((this.numberOfReport % 10) != 0) {
        this.totalPagination = (Math.floor(this.numberOfReport / 10)) + 1;
        this.numbersPage = Array(this.totalPagination).fill(1).map((x, i) => i + 1);
      }else{
        this.totalPagination = (Math.floor(this.numberOfReport / 10));
        this.numbersPage = Array(this.totalPagination).fill(1).map((x, i) => i + 1);
      }
      
     
      
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    });
  }
  indexPaginationChage(value: number) {
    this.indexPagination = value;
    this.reportService.getReportList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Report[]) => {
      this.reports = data;
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
    this.reportService.getReportList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Report[]) => {
      this.reports = data;
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
    
    this.reportService.getReportList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Report[]) => {
      this.reports = data;
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
      this.reportService.getReportList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Report[]) => {
        this.reports = data;
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
    this.reportService.getReportList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Report[]) => {
      this.reports = data;
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
  navigateToAppointmentDetails(id:number){
    this.router.navigate(['/home/appointment-list/'+id],{relativeTo:this.activatedRoute});

  }
  search(){
    this.indexPagination=1;
    this.searchText=(<HTMLInputElement>document.getElementById("searchText")).value;
    
    this.ngOnInit();
  }
  openAlertDialog(message: string) {
    this.dialog.confirmDialog({
      title: 'Nội Dung Mô Tả',
      message: message,
      confirmCaption: 'OK',
      cancelCaption: 'Hủy',
      reason: '',
      type: "alert",
      
    }).subscribe((ok) => {
      return;
    });
  }
  changeStatus(reportId:number,statusId:number){
    this.dialog.confirmDialog({
      title: 'Thay đổi trạng thái',
      message: 'Bạn muốn thực hiện hành động này chứ?',
      confirmCaption: 'Xác nhận',
      cancelCaption: 'Hủy',
      reason: '',
      type: "confirm"
    }).subscribe((confirmed) => {
      if (confirmed) {
        if(statusId==1){
          statusId=2;
        }else{
          statusId=1;
        }
        this.reportService.updateStatusForReport(reportId,statusId).subscribe((data: any) => {
      
          
          this.ngOnInit();
          this.openAlertDialog(data.message);
          
        },
          (error: HttpErrorResponse) => {
            console.log(error?.error.message);
    
    
          });
      }
    });

  }

}
