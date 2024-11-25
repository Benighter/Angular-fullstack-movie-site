import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fixed typo: `styleUrl` -> `styleUrls`
})
export class LoginComponent {
  email: string = ''; // Two-way data binding with the email input field
  password: string = ''; // Two-way data binding with the password input field
  message: string = ''; // To display messages (success or error)

  constructor(private authService: AuthService, private router: Router) {} // Inject AuthService and Router

  onLogin(): void {
    if (this.email && this.password) {
      // Call login method in AuthService
      this.authService.login(this.email, this.password).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token); // Save token in local storage or a service
          this.message = 'Login successful!';
          this.router.navigate(['/home']); // Navigate to the home page
        },
        error: (err) => {
          // Handle errors gracefully
          this.message =
            err.error?.message || 'Login failed. Please try again.';
        },
      });
    } else {
      this.message = 'Email and password are required.';
    }
  }
}
