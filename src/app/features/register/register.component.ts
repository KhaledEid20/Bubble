import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/Services/auth.service';
import { RegisterationStatusService } from '../../core/auth/Services/registeration-status.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit{

  router = inject(Router)
  Auth = inject(AuthService)
  registrationStatus = inject(RegisterationStatusService)
  registerForm!:FormGroup;

  private readonly fb = inject(FormBuilder)

  successFlag:boolean = false
  failedFlag : boolean = false

    ngOnInit(): void {
    this.registerFormBuilder();
  }

  registerFormBuilder(){
    this.registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(8)]],
    username: ['', [Validators.maxLength(8)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    dateOfBirth: ['', [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)]],
    gender: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)]],
    rePassword: ['', [Validators.required]]
  }, { validators: this.confirmPassword });
  }

  confirmPassword(group : AbstractControl) {
    const password = group.get("password")?.value
    const repassword = group.get("rePassword")?.value
    if(password != repassword && repassword!=''){
      group.get("rePassword")?.setErrors({mismatch : true});
      return {mismatch : true};
    }
    else{
      return null;
    }
  }

  goToLogin(): void{
    this.router.navigate(['/auth/login']);
  }

  submit() : void {
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
    }
    else{
      this.Auth.register(this.registerForm.value).subscribe({
        next : (res)=> {
          console.log('registration Data Sent Successfully')
          this.registrationStatus.setStatus({ success: true, failed: false });
          localStorage.setItem('token' , res.data.token)
          localStorage.setItem('userData' , JSON.stringify(res.data.user))
          this.router.navigate(['/main/feed'])
        },
        error: (err)=>{
          console.log('Data can not be sent' , err);
          this.registrationStatus.setStatus({ success: false, failed: true });
        }
      })
    }
  }
}