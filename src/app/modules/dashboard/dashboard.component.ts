import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/model/dashboard';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService:UserService) { }
  dashboard:Dashboard;
  
  ngOnInit(): void {
    
    this.dashboardService.getDashBoardData().subscribe((data:Dashboard)=>{
      this.dashboard=data;
      sessionStorage.setItem('dashboard',JSON.stringify(this.dashboard));
    });

  }

}
