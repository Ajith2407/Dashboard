import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
 
})
export class BarchartComponent implements OnInit {

  chartOptions = {
     backgroundColor: "transparent", 
   
    animationEnabled: true,
    data: [{
  type: "column",
  dataPoints: [
    { label: "Enroll Success", y: 240 },
    { label: "Enroll failure", y: 127 },
    { label: "Verify Success", y: 458 },
    { label: "Verify Faoilure", y: 120 },
    { label: "Failed Acceptance", y: 95 },
   
  ]
}]

  }	

  constructor() { }

  ngOnInit(): void {
  }

}
