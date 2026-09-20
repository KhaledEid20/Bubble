import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  auth = inject(AuthService)
  router = inject(Router)


  loginForm = new FormGroup({
    email : new FormControl('' , [Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]) ,
    password : new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)])
  })

  goToRegister(){
    this.router.navigate(['/auth/register']);
  }

  submit():void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
    }
    else{
      this.auth.login(this.loginForm.value).subscribe(
        {
          next:()=>{
            console.log('User logged in Successfully')
            
          },
          error:()=>{
            console.log('there is an error')
            
          }
        }
      )
    }
  }
}
