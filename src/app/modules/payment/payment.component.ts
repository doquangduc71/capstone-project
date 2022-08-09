import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/model/payment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  defaultStatus = "";
  status=[
   
    {id:0,name:'Chưa Thanh Toán',value:'In-Active'},
    {id:1,name:'Đã Thanh Toán',value:'Active'},

  ]
  searchText:string="";
  indexPagination: number = 1;
  totalPagination: number;
  numbersPage:Array<number>;

  payments: Payment[] = [];
  numberOfPayment:number;
  constructor(private paymentService: UserService,private router :Router,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.paymentService.getPaymentList(0,this.searchText).subscribe((data: Payment[]) => {
      this.payments = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    });
   
    this.paymentService.getNumberOfPayment(this.searchText).subscribe((data: number) => {
      this.numberOfPayment = data;
      if ((this.numberOfPayment % 10) != 0) {
        this.totalPagination = (Math.floor(this.numberOfPayment / 10)) + 1;
        this.numbersPage = Array(this.totalPagination).fill(1).map((x, i) => i + 1);
      }else{
        this.totalPagination = (Math.floor(this.numberOfPayment / 10));
        this.numbersPage = Array(this.totalPagination).fill(1).map((x, i) => i + 1);
      }
      
     
      
    },
    (error:HttpErrorResponse)=>{
      console.log(error.error.message);
    });
  }
  indexPaginationChage(value: number) {
    this.indexPagination = value;
    this.paymentService.getPaymentList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Payment[]) => {
      this.payments = data;
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
    this.paymentService.getPaymentList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Payment[]) => {
      this.payments = data;
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
    
    this.paymentService.getPaymentList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Payment[]) => {
      this.payments = data;
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
      this.paymentService.getPaymentList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Payment[]) => {
        this.payments = data;
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
    this.paymentService.getPaymentList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: Payment[]) => {
      this.payments = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    })
  }
  navigateToProfile(id:number){
    this.router.navigate(['./'+id],{relativeTo:this.activatedRoute});

  }
  search(){
     
    this.indexPagination=1;
    this.searchText=(<HTMLInputElement>document.getElementById("searchText")).value.trim();
    
    this.ngOnInit();
  }


}
