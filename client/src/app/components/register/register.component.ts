import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
    selector: 'app-register',
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  private isValidInput(input: string): boolean {
    return Boolean(input) && !input.includes(' ');
  }

  removeSpaces(event: any, field: 'username' | 'email' | 'password'): void {
    const value = event.target.value.replace(/\s/g, '');
    this[field] = value;
  }

  onRegister(): void {
    if (!this.isValidInput(this.username) || 
        !this.isValidInput(this.email) || 
        !this.isValidInput(this.password)) {
      this.message = 'All fields are required and cannot contain spaces.';
      return;
    }

    this.authService
      .register(this.username, this.email, this.password)
      .subscribe({
        next: (res) => {
          this.authService.login(this.username, this.password).subscribe({
            next: (res) => {
              this.authService.saveToken(res.token);
              localStorage.setItem('user', JSON.stringify(res));
              this.router.navigate(['/movies']);
            },
            error: (err) => {
              this.message = err.error.message || 'Login failed.';
            },
          });
        },
        error: (err) => {
          this.message = err.error.message || 'Registration failed.';
        },
      });
  }
}
