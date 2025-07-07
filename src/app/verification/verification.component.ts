import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  startDate: string = '';
  endDate: string = '';
  fullData: any[] = [];
  filteredData: any[] = [];

  statuses = ['Success', 'Not Sufficient Voice Data'];

  ngOnInit(): void {
    this.generateRandomData();
    this.filteredData = [...this.fullData];
  }

  generateRandomData(): void {
    for (let i = 0; i < 9; i++) {
      const date = new Date(2024, 5 + Math.floor(Math.random() * 2), 10 + i % 10, 10, 30 + i * 2);
      this.fullData.push({
        id: i + 1,
        date: date,
        customerId: this.generateRandomNumber(6),
        uniqueId: this.generateRandomNumber(15),
        status: this.statuses[Math.floor(Math.random() * this.statuses.length)]
      });
    }
  }

  generateRandomNumber(length: number): string {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  }

  filterByDate(): void {
    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;

    this.filteredData = this.fullData.filter(item => {
      const itemDate = new Date(item.date);
      if (start && itemDate < start) return false;
      if (end && itemDate > end) return false;
      return true;
    });
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData.map((item, index) => ({
      "S.No": index + 1,
      "Date with Time": new Date(item.date).toLocaleString(),
      "Customer ID": item.customerId,
      "Unique ID": item.uniqueId,
      "Status": item.status
    })));

    const workbook: XLSX.WorkBook = {
      Sheets: { 'FilteredData': worksheet },
      SheetNames: ['FilteredData']
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const data: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream'
    });

    FileSaver.saveAs(data, 'VoiceVerification_Report.xlsx');
  }

  exportToCSV(): void {
    const header = 'S.No,Date with Time,Customer ID,Unique ID,Status';
    const rows = this.filteredData.map((item, index) =>
      `${index + 1},${new Date(item.date).toLocaleString()},${item.customerId},${item.uniqueId},${item.status}`
    );

    const csvContent = header + '\n' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    FileSaver.saveAs(blob, 'VoiceVerification_Report.csv');
  }
}
