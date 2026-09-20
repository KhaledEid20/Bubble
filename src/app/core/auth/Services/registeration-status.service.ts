import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegStatus } from '../../models/reg-status.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterationStatusService {
  private statusSubject = new BehaviorSubject<RegStatus>({
    success : false,
    failed : false
  });
  status$ = this.statusSubject.asObservable()

  setStatus(status : RegStatus) : void{
    this.statusSubject.next(status)
  }

  reset():void{
    this.statusSubject.next({
    success : false,
    failed : false
  })
  }
}
