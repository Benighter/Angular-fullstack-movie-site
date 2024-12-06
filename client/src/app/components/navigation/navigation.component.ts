import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
    selector: 'app-navigation',
    imports: [RouterModule, SearchBarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/']);
  }
}
