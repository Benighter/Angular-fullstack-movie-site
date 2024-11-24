import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  message: string = '';
  constructor(private authService: AuthService) {}
  onRegister(): void {
    this.authService
      .register(this.username, this.email, this.password)
      .subscribe({
        next: (res) => {
          this.message = 'Registration successful! Please log in.';
        },
        error: (err) => {
          this.message = err.error.message || 'Registration failed.';
        },
      });
  }
}
