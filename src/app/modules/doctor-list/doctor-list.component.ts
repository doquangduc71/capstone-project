import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Doctor } from 'src/app/model/doctor';
import { UserService } from 'src/app/services/user.service';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
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

  doctors: Doctor[] = [];
  numberOfDoctor:number;
  constructor(private doctorService: UserService,private router :Router,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.doctorService.getDoctorList(0,this.searchText).subscribe((data: Doctor[]) => {
      this.doctors = data;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    });
   
    this.doctorService.getNumberOfDoctor(this.searchText).subscribe((data: number) => {
      this.numberOfDoctor = data;
      if ((this.numberOfDoctor % 5) != 0) {
        this.totalPagination = (Math.floor(this.numberOfDoctor / 5)) + 1;
        this.numbersPage = Array(this.totalPagination).fill(1).map((x, i) => i + 1);
      }
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    });
  }
  indexPaginationChage(value: number) {
    this.indexPagination = value;
    this.doctorService.getDoctorList((this.indexPagination * 5) - 5,this.searchText).subscribe((data: Doctor[]) => {
      this.doctors = data;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    })
  }

  firstPage() {
    this.indexPagination = 1;
    this.doctorService.getDoctorList((this.indexPagination * 5) - 5,this.searchText).subscribe((data: Doctor[]) => {
      this.doctors = data;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    })
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    console.log(this.indexPagination);
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    
    this.doctorService.getDoctorList((this.indexPagination * 5) - 5,this.searchText).subscribe((data: Doctor[]) => {
      this.doctors = data;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    })
  }

  prviousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
      this.ngOnInit();
    } else {
      this.doctorService.getDoctorList((this.indexPagination * 5) - 5,this.searchText).subscribe((data: Doctor[]) => {
        this.doctors = data;
      }),
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination;
    this.doctorService.getDoctorList((this.indexPagination * 5) - 5,this.searchText).subscribe((data: Doctor[]) => {
      this.doctors = data;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    })
  }
  navigateToProfile(id:number){
    this.router.navigate(['./'+id],{relativeTo:this.activatedRoute});

  }
  search(){
    this.searchText=(<HTMLInputElement>document.getElementById("searchText")).value;
    console.log(this.searchText);
    this.ngOnInit();
  }

  
}

