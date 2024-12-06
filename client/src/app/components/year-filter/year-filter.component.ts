import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-year-filter',
    imports: [CommonModule, FormsModule],
    templateUrl: './year-filter.component.html',
    styleUrls: ['./year-filter.component.css']
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

  onYearChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.yearSelected.emit(select.value);
  }
}
