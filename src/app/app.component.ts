import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isDark?: boolean;
  title = 'shop-app';
  Idark?: boolean;
  ngOnInit(): void {
    this.mode();
  }
  darkMode(event: any) {
    console.log(event);
    if (event.checked) {
      this.isDark = true;
    } else if (!event.checked) {
      this.isDark = false;
    }
    console.log(this.isDark);
    localStorage.setItem('dark', JSON.stringify(this.isDark));
    this.mode();
  }
  private mode() {
    this.Idark = this.getMode();
  }
  getMode() {
    return JSON.parse(localStorage.getItem('dark')!) || this.isDark;
  }
}
