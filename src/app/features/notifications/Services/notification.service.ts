import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { NotificationResponse } from '../Models/notification.response';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private httpClient = inject(HttpClient)

  getAllNotification(unread:boolean,page:number,limit:number):Observable<NotificationResponse>{
  const params = new HttpParams()
    .set('unread', unread)
    .set('page', page)
    .set('limit', limit);

  return this.httpClient.get<NotificationResponse>(
    `${environment.baseurl}/notifications`,
    { params }
  );
  }
}
