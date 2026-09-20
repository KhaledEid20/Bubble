import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterationStatusService } from '../../core/auth/Services/registeration-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent 
{
  StatusService = inject(RegisterationStatusService)

  SuccessFlag: boolean =false;
  FailedFlag: boolean =false;

  status$ = this.StatusService.status$;
  statusSub! : Subscription
  ngOnInit() {
    this.statusSub = this.status$.subscribe((status)=>{
      this.SuccessFlag = status.success
      this.FailedFlag = status.failed

      if(status.success || status.failed){
        setTimeout(()=>this.StatusService.reset(),3000)
      }
    })
  }
}

