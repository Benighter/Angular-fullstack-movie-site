import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [RouterModule, SearchBarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) { }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/']);
  }
}
