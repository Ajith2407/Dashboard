import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

interface CustomerData {
  date: string;
  time: string;
  uniqueId?: string;
  customerId?: string;
  verification1?: number;
  captchaReturn?: string;
  digit?: string;
  verification2?: string;
}

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  Math = Math;

  constructor() { }

  customerData: CustomerData[] = [
    // --- Original Data ---
    { date: '2025-07-01', time: '10:00:00', uniqueId: '100001', customerId: '200001', verification1: 65.2, captchaReturn: 'CAP123', digit: 'Match', verification2: 'OK' },
    { date: '2025-07-01', time: '11:15:00', uniqueId: '100002', customerId: '200002', verification1: 78.5 },
    { date: '2025-07-02', time: '09:30:00', captchaReturn: 'CAP321', digit: 'Not Match' },
    { date: '2025-07-02', time: '13:45:00', uniqueId: '100003', customerId: '200003', verification1: 50.3, captchaReturn: 'CAP789', digit: 'Match', verification2: 'Fail' },
    { date: '2025-07-03', time: '15:00:00', uniqueId: '100004', customerId: '200004', verification1: 42.0, captchaReturn: 'CAP456', digit: 'Not Match', verification2: 'OK' },
    { date: '2025-07-03', time: '16:20:00', uniqueId: '100005', customerId: '200005', verification1: 88.1 },
    { date: '2025-07-04', time: '08:10:00', captchaReturn: 'CAP999', digit: 'Match' },
    { date: '2025-07-04', time: '10:25:00', uniqueId: '100006', customerId: '200006', verification1: 49.5, captchaReturn: 'CAP111', digit: 'Match', verification2: 'Fail' },
    { date: '2025-07-05', time: '14:30:00', uniqueId: '100007', customerId: '200007', verification1: 76.0 },
    { date: '2025-07-05', time: '17:40:00', captchaReturn: 'CAP222', digit: 'Not Match' },
    { date: '2025-07-06', time: '12:00:00', uniqueId: '100008', customerId: '200008', verification1: 60.6, captchaReturn: 'CAP333', digit: 'Match', verification2: 'OK' },
    { date: '2025-07-06', time: '13:10:00', uniqueId: '100009', customerId: '200009', verification1: 85.4 },
    { date: '2025-07-07', time: '09:00:00', captchaReturn: 'CAP777', digit: 'Match' },
    { date: '2025-07-07', time: '11:25:00', uniqueId: '100010', customerId: '200010', verification1: 44.8, captchaReturn: 'CAP888', digit: 'Not Match', verification2: 'Fail' },
    { date: '2025-07-08', time: '16:45:00', uniqueId: '100011', customerId: '200011', verification1: 90.0 },

    // --- Extra Dummy Data (20+ entries added) ---
    { date: '2025-07-09', time: '09:15:00', uniqueId: '100012', customerId: '200012', verification1: 55.4, captchaReturn: 'CAP555', digit: 'Match', verification2: 'OK' },
    { date: '2025-07-09', time: '10:50:00', uniqueId: '100013', customerId: '200013', verification1: 61.2 },
    { date: '2025-07-10', time: '11:30:00', uniqueId: '100014', customerId: '200014', verification1: 72.1, captchaReturn: 'CAP101', digit: 'Not Match', verification2: 'Fail' },
    { date: '2025-07-10', time: '14:00:00', captchaReturn: 'CAP102', digit: 'Match' },
    { date: '2025-07-11', time: '15:20:00', uniqueId: '100015', customerId: '200015', verification1: 81.0, captchaReturn: 'CAP103', digit: 'Not Match', verification2: 'OK' },
    { date: '2025-07-11', time: '17:40:00', uniqueId: '100016', customerId: '200016', verification1: 63.5 },
    { date: '2025-07-12', time: '08:00:00', uniqueId: '100017', customerId: '200017', verification1: 92.5, captchaReturn: 'CAP104', digit: 'Match' },
    { date: '2025-07-12', time: '09:45:00', captchaReturn: 'CAP105', digit: 'Not Match' },
    { date: '2025-07-13', time: '12:30:00', uniqueId: '100018', customerId: '200018', verification1: 47.8, captchaReturn: 'CAP106', digit: 'Match', verification2: 'Fail' },
    { date: '2025-07-13', time: '14:15:00', uniqueId: '100019', customerId: '200019', verification1: 88.3, captchaReturn: 'CAP107', digit: 'Match', verification2: 'OK' },
    { date: '2025-07-14', time: '16:00:00', uniqueId: '100020', customerId: '200020', verification1: 59.6 },
    { date: '2025-07-14', time: '18:25:00', captchaReturn: 'CAP108', digit: 'Not Match' },
    { date: '2025-07-15', time: '07:40:00', uniqueId: '100021', customerId: '200021', verification1: 73.9, captchaReturn: 'CAP109', digit: 'Match' },
    { date: '2025-07-15', time: '09:55:00', uniqueId: '100022', customerId: '200022', verification1: 67.1, captchaReturn: 'CAP110', digit: 'Not Match', verification2: 'Fail' },
    { date: '2025-07-16', time: '11:10:00', uniqueId: '100023', customerId: '200023', verification1: 84.2 },
    { date: '2025-07-16', time: '13:35:00', uniqueId: '100024', customerId: '200024', verification1: 58.0, captchaReturn: 'CAP111', digit: 'Match' },
    { date: '2025-07-17', time: '15:50:00', captchaReturn: 'CAP112', digit: 'Not Match' },
    { date: '2025-07-17', time: '17:15:00', uniqueId: '100025', customerId: '200025', verification1: 91.5, captchaReturn: 'CAP113', digit: 'Match', verification2: 'OK' },
    { date: '2025-07-18', time: '19:30:00', uniqueId: '100026', customerId: '200026', verification1: 66.9 }
  ];

  filteredData: CustomerData[] = [];
  pagedData: CustomerData[] = [];

  // Filters
  startDate = '';
  endDate = '';
  minVerification1: number | null = null;
  maxVerification1: number | null = null;
  customerIdSearch = '';
  digitFilter = '';

  // Pagination
  currentPage = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20, 50];

  ngOnInit() {
    this.filteredData = [...this.customerData];
    this.updatePagedData();
  }

  applyFilters(): void {
    this.filteredData = this.customerData.filter(entry => {
      const dateMatch = (!this.startDate || entry.date >= this.startDate) &&
                        (!this.endDate || entry.date <= this.endDate);

      const verificationMatch = (!this.minVerification1 || (entry.verification1 ?? 0) >= this.minVerification1) &&
                                (!this.maxVerification1 || (entry.verification1 ?? 0) <= this.maxVerification1);

      const customerIdMatch = this.customerIdSearch === '' ||
                              (entry.customerId?.includes(this.customerIdSearch));

      const digitMatch = this.digitFilter === '' || entry.digit === this.digitFilter;

      return dateMatch && verificationMatch && customerIdMatch && digitMatch;
    });

    this.currentPage = 1;
    this.updatePagedData();
  }

  clearFilters(): void {
    this.startDate = '';
    this.endDate = '';
    this.minVerification1 = null;
    this.maxVerification1 = null;
    this.customerIdSearch = '';
    this.digitFilter = '';
    this.filteredData = [...this.customerData];
    this.currentPage = 1;
    this.updatePagedData();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagedData();
  }

  updatePagedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.filteredData.slice(start, end);
  }

  changePageSize(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 1;
    this.updatePagedData();
  }

  exportToCSV(): void {
    const headers = ['Date', 'Time', 'Unique ID', 'Customer ID', 'Verification1', 'Captcha Return', 'Digit', 'Verification2'];
    const rows = this.filteredData.map(entry => [
      entry.date,
      entry.time,
      entry.uniqueId ?? '',
      entry.customerId ?? '',
      entry.verification1 ?? '',
      entry.captchaReturn ?? '',
      entry.digit ?? '',
      entry.verification2 ?? ''
    ]);

    let csvContent = headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'customer_data.csv');
  }
}
