import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessRoleGuard implements CanActivate {
  constructor(private router: Router,private dialog: DialogService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('role')==="BUSINESS ADMIN"){
        return true;
  
      }
      
      this.openAlertDialog("Không được phép truy cập")
      this.router.navigateByUrl("/home");
      return false;
  }
  openAlertDialog(message: string) {
    this.dialog.confirmDialog({
      title: 'Thông báo',
      message: message,
      confirmCaption: 'OK',
      cancelCaption: 'Hủy',
      reason: '',
      type: "alert"
    }).subscribe((ok) => {
      return;
    });
  }
  
}
