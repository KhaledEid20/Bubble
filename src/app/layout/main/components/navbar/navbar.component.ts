import { Component, DestroyRef, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../../../core/auth/Services/auth.service';
import { AsideTogglerService } from '../../../../core/Services/aside-toggler.service';
import { NotificationTogglerService } from '../../../../core/Services/notification-toggler.service';
import { User } from '../../../../core/models/user-data.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  UserData: User | null = null;
  profileClicked: boolean = false;

  readonly fallbackAvatar =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239ca3af"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>';

  private authService = inject(AuthService);
  private togglerService = inject(AsideTogglerService);
  private notificationService = inject(NotificationTogglerService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  @ViewChild('userDropdownContainer')
  userDropdownContainer?: ElementRef<HTMLElement>;

  @ViewChild('profilePhoto')
  profilePhoto!: ElementRef<HTMLImageElement>;

  ngOnInit(): void {
    this.UserData = this.parseUserData();
    this.listenToRouteChanges();
  }

  /**
   * Automatically close dropdown menu on any route navigation
   * and refresh user data if updated in localStorage
   */
  private listenToRouteChanges(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.closeDropdown();
        this.UserData = this.parseUserData();
      });
  }

  /**
   * Close dropdown on clicks outside the profile menu
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    if (this.profileClicked && !this.userDropdownContainer?.nativeElement.contains(target)) {
      this.closeDropdown();
    }
  }

  /**
   * Close dropdown when pressing Escape key
   */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeDropdown();
  }

  private parseUserData(): User | null {
    const raw = localStorage.getItem('userData');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch (err) {
      console.error('Error parsing user data from localStorage:', err);
      return null;
    }
  }

  toggleProfileDropdown(event?: MouseEvent): void {
    event?.stopPropagation();
    this.profileClicked = !this.profileClicked;
  }

  /**
   * Kept for backwards compatibility
   */
  profileInfo(): void {
    this.profileClicked = !this.profileClicked;
  }

  closeDropdown(): void {
    this.profileClicked = false;
  }

  onPhotoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== this.fallbackAvatar) {
      img.src = this.fallbackAvatar;
    }
  }

  signOut(event?: Event): void {
    event?.preventDefault();
    this.closeDropdown();
    this.authService.signOut();
  }

  toggleSidebar(event?: MouseEvent): void {
    event?.stopPropagation();
    const currentState = this.togglerService.getTogelerValue();
    this.togglerService.setTogelerValue(!currentState);
  }

  toggleNotifications(event?: MouseEvent): void {
    event?.stopPropagation();
    this.closeDropdown();
    this.notificationService.toggle();
  }
}
