import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, action: string = 'Close'): void {
    this.showNotification(message, action, 3000);
  }

  error(message: string, action: string = 'Close'): void {
    this.showNotification(message, action, 5000);
  }

  private showNotification(
    message: string,
    action: string,
    duration: number
  ): void {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
