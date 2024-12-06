import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-topupbutton',
    templateUrl: './topupbutton.component.html',
    styleUrls: ['./topupbutton.component.css'],
    imports: [CommonModule]
})
export class TopupbuttonComponent implements OnInit {
  isButtonVisible = false; 

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isButtonVisible = window.scrollY > 30; 
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
