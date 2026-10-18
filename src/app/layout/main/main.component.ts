import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AsideComponent } from '../../layout/main/components/aside/aside.component';
import { AsideTogglerService } from '../../core/Services/aside-toggler.service';
import { NotificationsComponent } from '../../features/notifications/notifications.component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NavbarComponent, AsideComponent, NotificationsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})



export class MainComponent {
  togglerService = inject(AsideTogglerService);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    // Ignore clicks inside the aside or on the hamburger toggle button
    if (target.closest('app-aside') || target.closest('[data-aside-toggle]')) {
      return;
    }

    if (this.displayAside()) {
      this.togglerService.setTogelerValue(false);
    }
  }

  displayAside(): boolean {
    return this.togglerService.getTogelerValue();
  }
}
