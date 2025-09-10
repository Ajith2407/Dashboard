import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  stats = [
    { label: 'Enrollment Success Total', value: 250, color: 'success' },
    { label: 'Enrollment Failure Total', value: 127, color: 'danger' },
    { label: 'Verification Success Total', value: 458, color: 'success' },
    { label: 'Verification Failure Total', value: 120, color: 'danger' },

    { label: 'Enrollment Success Today', value: 40, color: 'success' },
    { label: 'Enrollment Failure Today', value: 10, color: 'danger' },
    { label: 'Verification Success Today', value: 35, color: 'success' },
    { label: 'Verification Failure Today', value: 5, color: 'danger' },
  ];

  animatedValues: number[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.stats.forEach((stat, index) => {
      this.animateNumber(index, stat.value, 2000);
    });
  }

  animateNumber(index: number, endValue: number, duration: number) {
    let current = 0;
    const increment = endValue / (duration / 16.67); // ~60fps
    const step = () => {
      current += increment;
      if (current < endValue) {
        this.animatedValues[index] = Math.floor(current);
        requestAnimationFrame(step);
      } else {
        this.animatedValues[index] = endValue;
      }
    };
    step();
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
