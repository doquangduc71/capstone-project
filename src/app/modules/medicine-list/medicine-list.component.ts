import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Medicine } from 'src/app/model/medicine';
import { DialogService } from 'src/app/services/dialog.service';
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
  status=[
    {id:0,name:'Lưu Hành',value:'Active'},
    {id:1,name:'Ngưng Lưu Hành',value:'Ban'},
    

  ]
  medicines: Medicine[] = [];
  numberOfMedicine:number;
  constructor(private medicineService: UserService,private dialog: DialogService) { }

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
  changeStatus(id:number,statusId:number){
    this.dialog.confirmDialog({
      title: 'Thay đổi trạng thái',
      message: 'Bạn muốn thực hiện hành động này chứ?',
      confirmCaption: 'Xác nhận',
      cancelCaption: 'Hủy',
      reason: '',
      type: "confirm"
    }).subscribe((confirmed) => {
      if (confirmed) {
        if(statusId==0){
          statusId=1;
        }else if(statusId==1){
          statusId=0;
        }
        this.medicineService.updateStatusMedicine(id,statusId).subscribe((data: any) => {
      
          
          this.ngOnInit();
          this.openAlertDialog(data.message);
          
        },
          (error: HttpErrorResponse) => {
            console.log(error?.error.message);
    
    
          });
      }
    });

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

}
