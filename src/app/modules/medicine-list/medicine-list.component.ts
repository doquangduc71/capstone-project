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
  
  public searchVaccine: FormGroup;
  medicines: Medicine[] = [];
  numberOfMedicine:number;
  constructor(private medicineService: UserService) { }

  ngOnInit(): void {
    this.medicineService.getMedicineList(0).subscribe((data: Medicine[]) => {
      this.medicines = data;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    });
    this.searchVaccine = new FormGroup({
      nameVaccine: new FormControl(''),
      typeVaccine: new FormControl(''),
      originVaccine: new FormControl(''),
      statusVaccine: new FormControl('')
    });
    this.medicineService.getNumberOfMedicine().subscribe((data: number) => {
      this.numberOfMedicine = data;
      if ((this.numberOfMedicine % 50) != 0) {
        this.totalPagination = (Math.floor(this.numberOfMedicine / 50)) + 1;
       
      }
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    });
    
  }
  indexPaginationChange(value: number) {
    this.indexPagination = value;
    this.medicineService.getMedicineList((this.indexPagination * 50) - 50).subscribe((data: Medicine[]) => {
      this.medicines = data;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    })
  }

  firstPage() {
    this.indexPagination = 1;
    this.medicineService.getMedicineList((this.indexPagination * 50) - 50).subscribe((data: Medicine[]) => {
      this.medicines = data;
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
    
    this.medicineService.getMedicineList((this.indexPagination * 50) - 50).subscribe((data: Medicine[]) => {
      this.medicines = data;
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
      this.medicineService.getMedicineList((this.indexPagination * 50) - 50).subscribe((data: Medicine[]) => {
        this.medicines = data;
      }),
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination;
    this.medicineService.getMedicineList((this.indexPagination * 50) - 50).subscribe((data: Medicine[]) => {
      this.medicines = data;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    })
  }

}
