import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlistKey = 'movieWatchlist';
  private watchlistSubject = new BehaviorSubject<Movie[]>([]);
  watchlist$ = this.watchlistSubject.asObservable();

  constructor() {
    this.loadWatchlist();
  }

  private loadWatchlist(): void {
    const savedWatchlist = localStorage.getItem(this.watchlistKey);
    if (savedWatchlist) {
      this.watchlistSubject.next(JSON.parse(savedWatchlist));
    }
  }

  private saveWatchlist(movies: Movie[]): void {
    localStorage.setItem(this.watchlistKey, JSON.stringify(movies));
    this.watchlistSubject.next(movies);
  }

  addToWatchlist(movie: Movie): void {
    const currentWatchlist = this.watchlistSubject.value;
    if (!currentWatchlist.some(m => m.id === movie.id)) {
      this.saveWatchlist([...currentWatchlist, movie]);
    }
  }

  removeFromWatchlist(movieId: number): void {
    const currentWatchlist = this.watchlistSubject.value;
    this.saveWatchlist(currentWatchlist.filter(movie => movie.id !== movieId));
  }

  isInWatchlist(movieId: number): boolean {
    return this.watchlistSubject.value.some(movie => movie.id === movieId);
  }

  getWatchlist(): Observable<Movie[]> {
    return this.watchlist$;
  }
}
