import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  
  constructor(private userService: UserService, private formBuider: FormBuilder, private router: Router) { }
  isLoginError: boolean = false;
  error_message: string
  ngOnInit(): void {
    this.loginForm = this.formBuider.group({
      phone: ['', Validators.required],
      password: ['', Validators.required]
    })

    
    if (localStorage.getItem('userToken') != null) {
      this.router.navigateByUrl('/home');
    }
  }
  onSubmit() {
    if(!this.loginForm.valid){
      this.isLoginError = true;
      this.error_message = "Không để trống trường số điện thoại và mật khẩu";
      return;
    }
    this.userService.login(this.loginForm.value).subscribe(
      (data: any) => {
        localStorage.setItem('userToken', data.access_token);
        localStorage.setItem('userId', data.user_id);
        
         
        
        this.router.navigateByUrl('/home');

      },
      (error: HttpErrorResponse) => {
        this.isLoginError = true;
        this.error_message = "Số điện thoại hoặc mật khẩu không chính xác";
      }
    )
  }

}
