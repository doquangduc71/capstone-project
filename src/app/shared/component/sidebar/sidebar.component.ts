import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/model/admin';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  admin:Admin;
  constructor(private adminService:UserService) { }
  role:string;
  ngOnInit(): void {
    const adminId = Number(sessionStorage.getItem('userId'));
    this.role = String(sessionStorage.getItem('role'));
    
    this.adminService.getAdminInfor(adminId).subscribe((data: Admin) => {
      this.admin = data;
      
    
    },
    (error:HttpErrorResponse)=>{
      console.log(error.message); 
     

    });
  }

}
