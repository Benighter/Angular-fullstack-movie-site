import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  standalone: true,
    selector: 'app-search-results',
    imports: [CommonModule, MovieCardComponent],
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  movies: Movie[] = [];
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      if (this.searchQuery) {
        this.searchMovies();
      }
    });
  }

  searchMovies() {
    this.movieService.searchMovies(this.searchQuery).subscribe(
      movies => this.movies = movies
    );
  }
}
