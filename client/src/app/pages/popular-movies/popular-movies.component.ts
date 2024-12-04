import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-popular-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})
export class PopularMoviesComponent {
  movies: Movie[] = [];
  currentPage = 1;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getPopularMovies(this.currentPage).subscribe(
      movies => this.movies = [...this.movies, ...movies]
    );
  }

  loadMore() {
    this.currentPage++;
    this.loadMovies();
  }
}