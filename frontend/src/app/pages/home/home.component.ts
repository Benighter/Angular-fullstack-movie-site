import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  currentPage = 1;
  selectedYear = '';
  years: number[] = [];
  loading = false;

  constructor(private movieService: MovieService) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

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

  onYearChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedYear = select.value;
    this.currentPage = 1;
    this.movies = [];
    this.loadMovies();
  }

  loadMore() {
    this.currentPage++;
    this.loadMovies();
  }
}
