import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(this.getToken() !== null);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http:HttpClient) { }

  login(identifier: string, password: string) : Observable<any> {
    console.log('Auth service sending login request:', { identifier, password: '***' });
    console.log('Identifier before sending to backend:', identifier);
    return this.http.post<any>(`${this.apiUrl}/login`, { identifier, password }).pipe(
      tap(response => {
        console.log('Auth service received response:', response);
        if (response.token) {
          this.saveToken(response.token);
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  register(username: string, email: string, password: string) : Observable<any> {
    console.log('Auth service sending register request:', { username, email, password: '***' });
    return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password }).pipe(
      tap(response => {
        console.log('Auth service received response:', response);
        if (response.token) {
          this.saveToken(response.token);
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  saveToken(token: string) :void {
    localStorage.setItem('token', token);
    this.loggedInSubject.next(true);
  }

  getToken() : string | null {
    return localStorage.getItem('token');
  }

  removeToken() : void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }

  isLoggedIn() : boolean {
    return this.getToken() !== null;
  }
}
