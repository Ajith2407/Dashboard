import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  startDate: string = '';
  endDate: string = '';
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];
  totalPages = 1;

  // ✅ Fake Data (will be shown in table + PDF)
  filteredData = [
    { date: new Date(), customerId: 'C001', uniqueId: 'U001', status: 'Success' },
    { date: new Date(), customerId: 'C002', uniqueId: 'U002', status: 'Not Sufficient Voice Data' },
    { date: new Date(), customerId: 'C003', uniqueId: 'U003', status: 'Success' },
    { date: new Date(), customerId: 'C004', uniqueId: 'U004', status: 'Not Sufficient Voice Data' },
    { date: new Date(), customerId: 'C005', uniqueId: 'U005', status: 'Success' },
    { date: new Date(), customerId: 'C006', uniqueId: 'U006', status: 'Success' },
    { date: new Date(), customerId: 'C007', uniqueId: 'U007', status: 'Not Sufficient Voice Data' },
    { date: new Date(), customerId: 'C008', uniqueId: 'U008', status: 'Success' },
    { date: new Date(), customerId: 'C009', uniqueId: 'U009', status: 'Not Sufficient Voice Data' },
    { date: new Date(), customerId: 'C010', uniqueId: 'U010', status: 'Success' },
  ];

  // Pagination Logic
  paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(start, start + this.pageSize);
  }

  totalPagesArray() {
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Existing Functions
  filterByDate() {
    console.log('Filter data from', this.startDate, 'to', this.endDate);
  }

  exportToExcel() {
    console.log('Excel export triggered');
  }

  exportToCSV() {
    console.log('CSV export triggered');
  }

  // ✅ New Function: Export to PDF
  // ✅ Updated Function — Adds logo and heading
exportToPDF() {
  const doc = new jsPDF();

  // Add image logo (adjust the path as needed)
  const img = new Image();
  img.src = 'assets/login-illustration.jpg'; // ✅ make sure kvb.jpg is in your Angular assets folder

  img.onload = () => {
    // Add logo on top-left corner
    doc.addImage(img, 'JPEG', 14, 10, 25, 25);

    // Add heading next to logo or centered
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('KVB Voice Enrollment Report', 70, 25, { align: 'center' });

    // Small line separator
    doc.setDrawColor(100);
    doc.line(14, 35, 195, 35);

    // Table Headers
    const head = [['S.No', 'Date with Time', 'Customer ID', 'Unique ID', 'Status']];

    // Table Data (fake data)
    const data = this.filteredData.map((item, index) => [
      index + 1,
      new Date(item.date).toLocaleString(),
      item.customerId,
      item.uniqueId,
      item.status
    ]);

    // AutoTable
    autoTable(doc, {
      startY: 40,
      head: head,
      body: data,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [33, 37, 41] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // Footer (timestamp)
    const date = new Date().toLocaleString();
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text(`Generated on: ${date}`, 14, pageHeight - 10);

    // Save file
    doc.save('Voice_Enrollment_Report.pdf');
  };
}

}
