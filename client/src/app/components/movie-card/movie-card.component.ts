import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { TopupbuttonComponent } from '../topupbutton/topupbutton.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent,TopupbuttonComponent],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  constructor(public movieService: MovieService) {}

  addToWatchlist(): void {
    console.log("added to watchlist")
  }
}
