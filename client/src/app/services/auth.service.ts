import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/auth'
  constructor(private http:HttpClient) { }

  login(identifier: string, password: string) : Observable<any> {
    console.log('Auth service sending login request:', { identifier, password: '***' });
    console.log('Identifier before sending to backend:', identifier);
    return this.http.post<any>(`${this.apiUrl}/login`, { identifier, password }).pipe(
      tap(response => console.log('Auth service received response:', response))
    );
  }

  register(username: string, email: string, password: string) : Observable<any> {
    console.log('Auth service sending register request:', { username, email, password: '***' });
    return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password }).pipe(
      tap(response => console.log('Auth service received response:', response))
    );
  }

  saveToken(token: string) :void {
    localStorage.setItem('token', token);
  }

  getToken() : string | null {
    return localStorage.getItem('token');
  }

  removeToken() : void {
    localStorage.removeItem('token');
  }

  isLoggedIn() : boolean {
    return this.getToken() !== null;
  }
}

