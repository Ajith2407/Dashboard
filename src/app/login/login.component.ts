import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
  if (this.password === 'test') {
    // save username in localStorage
    localStorage.setItem('loggedInUser', this.username || 'Guest');

    this.router.navigate(['/layout/dashboard']);
  } else {
    alert('Invalid credentials');
  }
}

}
