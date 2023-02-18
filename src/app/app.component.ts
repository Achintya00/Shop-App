import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isScrolled = false;
  isDark?: boolean;
  title = 'shop-app';
  Idark?: boolean;
  ngOnInit(): void {
    this.mode();
    window.addEventListener('scroll', () => {
      this.isScrolled = window.pageYOffset !== 0;
    });
  }
  darkMode(event: any) {
    console.log(event);
    if (event.checked) {
      this.isDark = true;
    } else if (!event.checked) {
      this.isDark = false;
    }

    localStorage.setItem('dark', JSON.stringify(this.isDark));
    this.mode();
  }
  private mode() {
    this.Idark = this.getMode();
  }
  getMode() {
    return JSON.parse(localStorage.getItem('dark')!) || this.isDark;
  }
  scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
