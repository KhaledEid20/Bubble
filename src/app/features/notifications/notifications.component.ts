import { Component, HostListener, inject, OnInit } from '@angular/core';
import { NotificationTogglerService } from '../../core/Services/notification-toggler.service';
import { NotificationService } from './Services/notification.service';
import { NotificationDataResponse } from './Models/notification.response';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit{

  readonly notificationService = inject(NotificationTogglerService);
  readonly notification = inject(NotificationService)
  notificationData! : NotificationDataResponse[];
  limit:number = 10;

  ngOnInit(): void {
    this.getAllNotifications();
  }

  close(): void {
    this.notificationService.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.notificationService.isOpen()) {
      this.close();
    }
  }

  getAllNotifications(){
    this.notification.getAllNotification(false , 1 , this.limit).subscribe({
      next:(res)=>{
        this.notificationData = res.data.notifications
        console.log("The Notification Data",this.notificationData)
      }
    })
  }
}
