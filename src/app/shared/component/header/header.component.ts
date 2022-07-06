import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router:Router,private dialog: DialogService) { }

  ngOnInit(): void {
    
  }
  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }
  logout(){
    this.dialog.confirmDialog({
      title: 'Đăng xuất',
      message: 'Bạn muốn thực hiện hành động này chứ?',
      confirmCaption: 'Xác nhận',
      cancelCaption: 'Hủy',
    }).subscribe((confirmed) => {
      if (confirmed){
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        this.router.navigateByUrl('/login');
      }
    });
   
  }
}
