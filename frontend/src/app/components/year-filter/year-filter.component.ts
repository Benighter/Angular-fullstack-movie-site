import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-year-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="year-filter">
      <label for="yearFilter">Filter by Year:</label>
      <select id="yearFilter" (change)="onYearChange($event)" class="year-select">
        <option value="">All Years</option>
        <option *ngFor="let year of years; trackBy: trackYear">{{ year }}</option>
      </select>
    </div>
  `,
  styles: [`
    .year-filter {
      margin: 20px 0;
    }
    .year-select {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      margin-left: 10px;
    }
  `]
})
export class YearFilterComponent {
  @Output() yearSelected = new EventEmitter<string>();
  
  years: number[] = [];
  
  constructor() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  trackYear(index: number, year: number): number {
    return year;
  }

  onYearChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.yearSelected.emit(select.value);
  }
}
