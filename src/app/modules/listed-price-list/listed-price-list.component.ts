import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListedPrice } from 'src/app/model/listed-price';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listed-price-list',
  templateUrl: './listed-price-list.component.html',
  styleUrls: ['./listed-price-list.component.css']
})
export class ListedPriceListComponent implements OnInit {

  defaultStatus = "";
  status=[
    {id:0,name:'Giá Hiện Hành',value:'Active'},
    {id:1,name:'Giá Cũ',value:'Ban'},
    

  ]
  searchText:string="";
  indexPagination: number = 1;
  totalPagination: number;
  numbersPage:Array<number>;

  doctors: ListedPrice[] = [];
  numberOfDoctor:number;
  constructor(private userService: UserService,private router :Router,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getListedPriceList(0,this.searchText).subscribe((data: ListedPrice[]) => {
      this.doctors = data;
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    });
   
    this.userService.getNumberOfListedPrice(this.searchText).subscribe((data: number) => {
      this.numberOfDoctor = data;
      if ((this.numberOfDoctor % 10) != 0) {
        this.totalPagination = (Math.floor(this.numberOfDoctor / 10)) + 1;
        this.numbersPage = Array(this.totalPagination).fill(1).map((x, i) => i + 1);
      }else{
        this.totalPagination = (Math.floor(this.numberOfDoctor / 10));
        this.numbersPage = Array(this.totalPagination).fill(1).map((x, i) => i + 1);
      }
      
     
      
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message);
    });
  }
  indexPaginationChage(value: number) {
    this.indexPagination = value;
    this.userService.getListedPriceList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: ListedPrice[]) => {
      this.doctors = data;
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
    this.userService.getListedPriceList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: ListedPrice[]) => {
      this.doctors = data;
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
    
    this.userService.getListedPriceList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: ListedPrice[]) => {
      this.doctors = data;
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
      this.userService.getListedPriceList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: ListedPrice[]) => {
        this.doctors = data;
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
    this.userService.getListedPriceList((this.indexPagination * 10) - 10,this.searchText).subscribe((data: ListedPrice[]) => {
      this.doctors = data;
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
    this.searchText=(<HTMLInputElement>document.getElementById("searchText")).value;
    
    this.ngOnInit();
  }

}
