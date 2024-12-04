import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../movie_interface/movie.interface';

@Component({
  selector: 'app-upcoming-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent {
  movies: Movie[] = [];
  currentPage = 1;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getUpcomingMovies(this.currentPage).subscribe(movies => {
      const today = new Date();
      const futureMovies = movies.filter(movie => {
        const releaseDate = new Date(movie.release_date);
        return releaseDate > today;
      });
      this.movies = [...this.movies, ...futureMovies];
    });
  }

  loadMore() {
    this.currentPage++;
    this.loadMovies();
  }
}