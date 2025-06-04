import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatIconModule],
  template: `
    <div class="theme-toggle">
      <mat-icon>light_mode</mat-icon>
      <mat-slide-toggle
        color="primary"
        [checked]="isDarkTheme"
        (change)="toggleTheme($event.checked)"
      >
      </mat-slide-toggle>
      <mat-icon>dark_mode</mat-icon>
    </div>
  `,
  styles: [
    `
      .theme-toggle {
        display: flex;
        align-items: center;
        margin: 0 16px;
      }

      mat-icon {
        margin: 0 8px;
      }
    `,
  ],
})
export class ThemeToggleComponent implements OnInit {
  isDarkTheme = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Check if user has a preference saved
    const savedTheme = localStorage.getItem('anthraciteTheme');

    if (savedTheme === 'dark') {
      this.isDarkTheme = true;
      this.renderer.addClass(document.body, 'dark-theme');
    }
  }

  toggleTheme(checked: boolean): void {
    this.isDarkTheme = checked;

    if (checked) {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('anthraciteTheme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('anthraciteTheme', 'light');
    }
  }
}
