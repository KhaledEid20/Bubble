import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../../models/user-data.interface';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpclient = inject(HttpClient);
  router = inject(Router);

  register(data : object) : Observable<UserData> {
    return this.httpclient.post<UserData>(environment.baseurl +"/users/signup" , data)
  }
  login(data : object){
    return this.httpclient.post<UserData>(environment.baseurl +"/users/signin" , data)
  }
  signOut():void{
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    this.router.navigate(['/auth','/login']);
  }
}
