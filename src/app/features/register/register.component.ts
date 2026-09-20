import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class RegisterComponent {

  router = inject(Router)
  Auth = inject(AuthService)
  registrationStatus = inject(RegisterationStatusService)


  successFlag:boolean = false
  failedFlag : boolean = false
  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required , Validators.minLength(8)]),
    username: new FormControl('' , [Validators.maxLength(8)]),
    email : new FormControl('', [Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    dateOfBirth : new FormControl('' , [Validators.required , Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)]),
    gender : new FormControl('' , [Validators.required]),
    password : new FormControl('' , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/)]),
    rePassword : new FormControl('' , [Validators.required])
  });

  goToLogin(): void{
    this.router.navigate(['/auth/login']);
  }

  submit() : void {
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
    }
    else{
      this.Auth.register(this.registerForm.value).subscribe({
        next : ()=> {
          console.log('registration Data Sent Successfully')
          this.registrationStatus.setStatus({ success: true, failed: false });
          this.router.navigate(['/auth/login']);
        },
        error: (err)=>{
          console.log('Data can not be sent' , err);
          this.registrationStatus.setStatus({ success: false, failed: true });
        }
      })
    }
  }
}