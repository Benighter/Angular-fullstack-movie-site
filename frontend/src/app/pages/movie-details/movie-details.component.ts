import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieDetails } from '../../models/movie.model';
import { NavigationComponent } from '../../components/navigation/navigation.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie?: MovieDetails;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    public movieService: MovieService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.movieService.getMovieDetails(id).subscribe({
        next: (movie) => this.movie = movie,
        error: (error) => {
          console.error('Error fetching movie details:', error);
          this.error = 'Failed to load movie details';
        }
      });
    }
  }
}
