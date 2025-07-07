import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() collapseChange = new EventEmitter<boolean>();

  isCollapsed = false;

  ngOnInit(): void {
    this.autoCollapse(window.innerWidth);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapseChange.emit(this.isCollapsed);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.autoCollapse(event.target.innerWidth);
  }

  autoCollapse(width: number): void {
    const shouldCollapse = width < 768;
    if (shouldCollapse !== this.isCollapsed) {
      this.isCollapsed = shouldCollapse;
      this.collapseChange.emit(this.isCollapsed);
    }
  }
}
