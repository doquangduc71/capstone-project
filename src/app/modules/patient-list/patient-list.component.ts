import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  defaultStatus = "";
  status=[
    {id:0,value:'In-Active'},
    {id:1,value:'Active'},
    {id:2,value:'Ban'},

  ]
  searchText:string="";
  indexPagination: number = 1;
  totalPagination: number;
  numbersPage:Array<number>;

  patients: Patient[] = [];
  numberOfPatient:number;
  constructor(private patientService: UserService,private router :Router,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.patientService.getPatientList(0,this.searchText).subscribe((data: Patient[]) => {
      this.patients = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    });
   
    this.patientService.getNumberOfPatient(this.searchText).subscribe((data: number) => {
      this.numberOfPatient = data;
      if ((this.numberOfPatient % 10) != 0) {
        this.totalPagination = (Math.floor(this.numberOfPatient / 10)) + 1;
        this.numbersPage = Array(this.totalPagination).fill(1).map((x, i) => i + 1);
      }else{
        this.totalPagination = (Math.floor(this.numberOfPatient / 10));
        this.numbersPage = Array(this.totalPagination).fill(1).map((x, i) => i + 1);
      }
      
     
      
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    });
  }
  indexPaginationChage(value: number) {
    this.indexPagination = value;
    this.patientService.getPatientList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Patient[]) => {
      this.patients = data;
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
    this.patientService.getPatientList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Patient[]) => {
      this.patients = data;
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
    
    this.patientService.getPatientList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Patient[]) => {
      this.patients = data;
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
      this.patientService.getPatientList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Patient[]) => {
        this.patients = data;
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
    this.patientService.getPatientList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Patient[]) => {
      this.patients = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    })
  }
  navigateToProfile(id:number){
    this.router.navigate(['./'+id],{relativeTo:this.activatedRoute});

  }
  search(){
    this.searchText=(<HTMLInputElement>document.getElementById("searchText")).value;
    
    this.ngOnInit();
  }

}
