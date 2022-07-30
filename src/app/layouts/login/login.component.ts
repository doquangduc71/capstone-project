import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  loading$: Observable<Boolean>
  constructor(private userService: UserService, private formBuider: FormBuilder, private router: Router,public loader: LoadingService) { }
  isLoginError: boolean = false;
  error_message: string
  ngOnInit(): void {
    this.loading$ = this.loader.loading$;
    this.loginForm = this.formBuider.group({
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    
    if (localStorage.getItem('userToken') != null) {
      this.router.navigateByUrl('/home');
    }
  }
  onSubmit() {
    
    
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
