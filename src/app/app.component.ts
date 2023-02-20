import { filter } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //global variables
  isScrolled = false;
  isDark?: boolean;
  title = 'shop-app';
  Idark?: boolean;
  load: boolean = false;
  end: any;

  constructor(private route: Router) {}
  ngOnInit(): void {
    //loading functionality
    this.route.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((data) => {
        this.load = true;
        console.log(data);
      });
    this.route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data) => {
        setTimeout(() => {
          this.load = false;
          console.log(data);
        }, 2000);
      });

    this.mode();

    window.addEventListener('scroll', () => {
      this.isScrolled = window.pageYOffset !== 0;
    });
  }
  //dark mode functionality added
  darkMode(event: any) {
    console.log(event);
    if (event.checked) {
      this.isDark = true;
    } else if (!event.checked) {
      this.isDark = false;
    }
    //storing the mode in local storage
    localStorage.setItem('dark', JSON.stringify(this.isDark));
    this.mode();
  }
  //setting the mode if it is dark or not
  private mode() {
    this.Idark = this.getMode();
  }
  getMode() {
    return JSON.parse(localStorage.getItem('dark')!) || this.isDark;
  }
  //scrolltotop functionality
  scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
