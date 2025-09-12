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

  // Status values
  statuses = ['Success', 'Not Sufficient Voice Data'];

  // Pagination + Rows per page
  pageSizeOptions = [5, 10, 20, 50];  
  pageSize = 5;  
  currentPage = 1;  
  totalPages = 1;

  ngOnInit(): void {
    this.generateRandomData();
    this.filteredData = [...this.fullData];
  }

  // Generate dummy data
  generateRandomData(): void {
    for (let i = 0; i < 50; i++) {
      const date = new Date(
        2024,
        5 + Math.floor(Math.random() * 2),
        10 + i % 10,
        10,
        30 + i * 2
      );
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

  // Date filter
  filterByDate(): void {
    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;

    this.filteredData = this.fullData.filter(item => {
      const itemDate = new Date(item.date);
      if (start && itemDate < start) return false;
      if (end && itemDate > end) return false;
      return true;
    });

    this.onPageChange(1); // reset to first page after filtering
  }

  // Pagination logic
  paginatedData() {
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  totalPagesArray() {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  // Export to Excel
  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.filteredData.map((item, index) => ({
        "S.No": index + 1,
        "Date with Time": new Date(item.date).toLocaleString(),
        "Customer ID": item.customerId,
        "Unique ID": item.uniqueId,
        "Status": item.status
      }))
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { 'FilteredData': worksheet },
      SheetNames: ['FilteredData']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    FileSaver.saveAs(data, 'VoiceVerification_Report.xlsx');
  }

  // Export to CSV
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
