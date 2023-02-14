import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isDark: boolean = false;
  title = 'shop-app';
  darkMode(event: any) {
    console.log(event);
    if (event.checked) {
      this.isDark = true;
    } else if (!event.checked) {
      this.isDark = false;
    }
    console.log(this.isDark);
  }
}
