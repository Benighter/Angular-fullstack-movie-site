import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message = '';
  constructor(private authService: AuthService, private router: Router) {} // Inject AuthService
  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token); // Store token in local storage
        this.message = 'Login successful!';
        this.router.navigate(['/home']); // Redirect to home page
      },
      error: (err) => {
        this.message = err.error.message || 'Login failed. Register here';
      },
    });
  }

}
