import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'test';
  password = 'test';
  

  constructor(private router: Router) {}

   ngOnInit(): void {
   
  }


  onLogin() {
    if (this.username === 'test' && this.password === 'test') {
      this.router.navigate(['/layout/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}