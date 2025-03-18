import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [RouterModule, SearchBarComponent, CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isMenuOpen = false;
  isScrolled = false;
  scrollDistance = 0; // Keep this for backward compatibility but we won't use it for sizing

  constructor(private authService: AuthService, private router: Router) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 50;
    // We keep this variable but don't use it for dynamic sizing anymore
    this.scrollDistance = Math.min(scrollTop / 2, 30);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Add a class to the body to prevent scrolling when menu is open on mobile
    if (this.isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/']);
  }
}
