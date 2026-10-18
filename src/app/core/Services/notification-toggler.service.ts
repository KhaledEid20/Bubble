import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationTogglerService {
  private readonly _isOpen = signal<boolean>(false);

  readonly isOpen = this._isOpen.asReadonly();

  open(): void {
    this._isOpen.set(true);
  }

  close(): void {
    this._isOpen.set(false);
  }

  toggle(): void {
    this._isOpen.update((current) => !current);
  }

  getIsOpen(): boolean {
    return this._isOpen();
  }
}
