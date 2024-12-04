import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  identifier: string = ''; 
  password: string = ''; 
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  private isValidInput(input: string): boolean {
    return Boolean(input) && input.trim().length > 0;
  }

  onLogin(): void {
    // Trim the inputs to remove any leading/trailing spaces
    const trimmedIdentifier = this.identifier.trim();
    const trimmedPassword = this.password.trim();
    
    if (!this.isValidInput(trimmedIdentifier) || !this.isValidInput(trimmedPassword)) {
      this.message = 'Email/Username and password cannot be empty or contain only spaces.';
      return;
    }

    console.log('Login attempt with:', { identifier: trimmedIdentifier, password: trimmedPassword });
    
    this.authService.login(trimmedIdentifier, trimmedPassword).subscribe({
      next: (res) => {
        console.log('Login response:', res);
        this.authService.saveToken(res.token);
        localStorage.setItem('user', JSON.stringify(res));
        this.message = 'Login successful!';
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.message = err.error?.message || 'Login failed. Please try again.';
      },
    });
  }
}