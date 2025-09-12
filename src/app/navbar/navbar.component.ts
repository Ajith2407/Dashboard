import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedInUser: string | null = null;
  greeting: string = '';
  showUser: boolean = true;

  ngOnInit(): void {
    // Fetch username from localStorage
    this.loggedInUser = localStorage.getItem('loggedInUser');

    // Decide greeting based on time
    const hours = new Date().getHours();
    if (hours < 12) {
      this.greeting = 'Good Morning';
    } else if (hours < 17) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }

    // After 10 sec remove username
    setTimeout(() => {
      this.showUser = false;
    }, 10000);
  }

  onLogout(): void {
    localStorage.removeItem('loggedInUser');
  }
}
