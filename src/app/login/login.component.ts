import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  shake = false;  // flag for shake animation

  constructor(private router: Router) {}

  onLogin(form: NgForm) {
    if (form.invalid) return;

    if (this.password === 'test') {
      localStorage.setItem('loggedInUser', this.username || 'Guest');
      this.router.navigate(['/layout/dashboard']);
    } else {
      this.shake = true;

      // remove shake class after animation ends
      setTimeout(() => this.shake = false, 500);

      console.log('Invalid credentials');
    }
  }
}
