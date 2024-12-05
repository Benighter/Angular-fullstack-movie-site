import { RouterModule, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { TopupbuttonComponent } from './components/topupbutton/topupbutton.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavigationComponent, CommonModule, TopupbuttonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
