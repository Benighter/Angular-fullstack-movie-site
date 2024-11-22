import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, MovieDetails } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '8d595551f86c5ed63a30f17469f09f1a';
  private baseUrl = 'https://api.themoviedb.org/3';
  private imageBaseUrl = 'https://image.tmdb.org/t/p';

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1): Observable<Movie[]> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`
    ).pipe(
      map(response => response.results)
    );
  }

  getUpcomingMovies(page: number = 1): Observable<Movie[]> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}&page=${page}`
    ).pipe(
      map(response => response.results)
    );
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&append_to_response=credits`
    );
  }

  searchMovies(query: string): Observable<Movie[]> {
    return this.http.get<any>(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`
    ).pipe(
      map(response => response.results)
    );
  }

  getImageUrl(path: string, size: string = 'w500'): string {
    if (!path) return '/assets/images/no-poster.jpg';
    return `${this.imageBaseUrl}/${size}${path}`;
  }
}
