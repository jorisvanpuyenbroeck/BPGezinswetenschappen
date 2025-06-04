import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrl: './copyright.component.css',
})
export class CopyrightComponent implements OnInit {
  currentYear: number = 2025; // Hardcoded to 2025 as requested

  ngOnInit(): void {
    // If you want to make it dynamic in the future, uncomment this:
    // this.currentYear = new Date().getFullYear();
  }
}
