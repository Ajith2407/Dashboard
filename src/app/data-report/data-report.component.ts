// src/app/data-report/data-report.component.ts
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-data-report',
  templateUrl: './data-report.component.html',
  styleUrls: ['./data-report.component.css'],

})
export class DataReportComponent implements OnInit {
  data: any;
  options: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color') || '#495057';
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color') || '#6c757d';
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color') || '#dee2e6';

      this.data = {
        labels: ['Enrollment Total', 'Enrollment Success', 'Enrollment Failure', 'Total Enroll attempt', 'Direct Success', 'Direct Failure', 'Digit Total ', 'Digit Success','Digit Failure'],
         backgroundColor: "transparent", 
   
    animationEnabled: true,
        datasets: [
          {
            label: 'Previous Data ',
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500') || '#00bcd4',
            borderColor: documentStyle.getPropertyValue('--p-cyan-500') || '#00bcd4',
            data: [150, 59, 80, 81, 56, 55, 40, 20, 15, 5]
          },
          {
            label: 'Today Data',
            backgroundColor: documentStyle.getPropertyValue('--p-gray-500') || '#9e9e9e',
            borderColor: documentStyle.getPropertyValue('--p-gray-500') || '#9e9e9e',
            data: [ 120, 28, 48, 40, 19, 86, 27, 90, 7, 6, 1]
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500
              }
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };

      this.cd.markForCheck();
    }
  }
}
