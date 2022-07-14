import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Medicine } from 'src/app/model/medicine';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
  indexPagination: number = 1;
  totalPagination: number;
  searchText:string="";

  medicines: Medicine[] = [];
  numberOfMedicine:number;
  constructor(private medicineService: UserService) { }

  ngOnInit(): void {
    this.medicineService.getMedicineList(0,this.searchText).subscribe((data: Medicine[]) => {
      this.medicines = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    });
    
    this.medicineService.getNumberOfMedicine(this.searchText).subscribe((data: number) => {
      this.numberOfMedicine = data;
      if ((this.numberOfMedicine % 50) != 0 || this.numberOfMedicine==0) {
        this.totalPagination = (Math.floor(this.numberOfMedicine / 50)) + 1;
       
      }
      
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    });
    
  }
  indexPaginationChange(value: number) {
    this.indexPagination = value;
    this.medicineService.getMedicineList((this.indexPagination * 50) - 50,this.searchText).subscribe((data: Medicine[]) => {
      this.medicines = data;
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
    this.medicineService.getMedicineList((this.indexPagination * 50) - 50,this.searchText).subscribe((data: Medicine[]) => {
      this.medicines = data;
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
    console.log(this.indexPagination);
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    
    this.medicineService.getMedicineList((this.indexPagination * 50) - 50,this.searchText).subscribe((data: Medicine[]) => {
      this.medicines = data;
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
      this.medicineService.getMedicineList((this.indexPagination * 50) - 50,this.searchText).subscribe((data: Medicine[]) => {
        this.medicines = data;
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
    this.medicineService.getMedicineList((this.indexPagination * 50) - 50,this.searchText).subscribe((data: Medicine[]) => {
      this.medicines = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    })
  }
  search(){
    this.indexPagination=1;
    this.searchText=(<HTMLInputElement>document.getElementById("searchText")).value;
    
    this.ngOnInit();
  }

}
