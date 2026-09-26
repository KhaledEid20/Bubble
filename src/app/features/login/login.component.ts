import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  auth = inject(AuthService)
  router = inject(Router)
  private readonly fb = inject(FormBuilder)
  LoginGroup!:FormGroup
  loginSub$:Subscription = new Subscription()  // The object created to be cancelled with the first request
  
  ngOnInit(): void {
    this.loginFormBuilder();
  }

  loginFormBuilder(){
    this.LoginGroup = this.fb.group({
      email : ['' , [Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password : ['' , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)]]
    })
  };
  
  goToRegister(){
    this.router.navigate(['/auth/register']);
  }

  submit():void{
    if(this.LoginGroup.invalid){
      this.LoginGroup.markAllAsTouched()
    }
    else{
      this.loginSub$ = this.auth.login(this.LoginGroup.value).subscribe(
        {
          next:(res)=>{
            console.log('User logged in Successfully')
            this.loginSub$.unsubscribe()
            this.LoginGroup.reset()
            localStorage.setItem('token' , res.data.token)
            localStorage.setItem('userData' , JSON.stringify(res.data.user))
            this.router.navigate(['/main/feed'])
        },
          error:()=>{
            console.log('there is an error')
            
          }
        }
      )
    }
  }
}
