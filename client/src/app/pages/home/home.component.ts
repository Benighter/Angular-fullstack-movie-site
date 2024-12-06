import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { YearFilterComponent } from '../../components/year-filter/year-filter.component';

@Component({
    selector: 'app-home',
    imports: [CommonModule, MovieCardComponent, FormsModule, YearFilterComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  currentPage = 1;
  selectedYear = '';
  loading = false;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    if (this.loading) return;
    
    this.loading = true;
    this.movieService.getLatestMovies(this.currentPage).subscribe({
      next: (movies) => {
        let filteredMovies = movies;
        if (this.selectedYear) {
          filteredMovies = movies.filter(movie => {
            const movieYear = new Date(movie.release_date).getFullYear().toString();
            return movieYear === this.selectedYear;
          });
        }

        if (this.currentPage === 1) {
          this.movies = filteredMovies;
        } else {
          this.movies = [...this.movies, ...filteredMovies];
        }
        this.loading = false;

        // If we didn't get enough movies after filtering, load more
        if (filteredMovies.length < 5 && this.selectedYear) {
          this.currentPage++;
          this.loadMovies();
        }
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.loading = false;
      }
    });
  }

  onYearChange(year: string) {
    this.selectedYear = year;
    this.currentPage = 1;
    this.movies = [];
    this.loadMovies();
  }

  loadMore() {
    this.currentPage++;
    this.loadMovies();
  }
}
