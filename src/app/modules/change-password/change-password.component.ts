import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public changePasswordForm: FormGroup;
  loading$: Observable<Boolean>
  constructor(private userService: UserService, private formBuider: FormBuilder, private router: Router,public loader: LoadingService) { }
  changePasswordFail: boolean = false;
  changePasswordSuccess:boolean = false;
  error_message: string
  ngOnInit(): void {
    this.loading$ = this.loader.loading$;
    
    this.changePasswordForm = this.formBuider.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required]]
    })
    
  }
  validateSubmit(){
    if(this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value){
      return true;
    }
    else return false;
  }
  
  onChangePassword() {
    
    const oldPassword = this.changePasswordForm.controls['oldPassword'].value;
    const password = this.changePasswordForm.controls['newPassword'].value;
     const id = (Number)(sessionStorage.getItem('userId'));
    this.userService.changePassword(id,oldPassword,password).subscribe((data:any)=>{
      this.changePasswordSuccess=true;
      this.changePasswordFail=false;
      this.error_message=data.message
    },
    (error: HttpErrorResponse) => {
           this.changePasswordFail = true;
           this.changePasswordSuccess=false;
           this.error_message = "Mật khẩu ban đầu không đúng";
         }
    )
    console.log('old:' +oldPassword);
    console.log('new:' +password);

  
    
  }


}
