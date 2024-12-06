import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { WatchlistService } from '../../services/watchlist.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { TopupbuttonComponent } from '../topupbutton/topupbutton.component';

@Component({
    selector: 'app-movie-card',
    imports: [CommonModule, RouterModule, NavigationComponent, TopupbuttonComponent],
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  constructor(
    public movieService: MovieService,
    private watchlistService: WatchlistService
  ) {}

  addToWatchlist(event: Event): void {
    event.stopPropagation();
    if (this.watchlistService.isInWatchlist(this.movie.id)) {
      this.watchlistService.removeFromWatchlist(this.movie.id);
    } else {
      this.watchlistService.addToWatchlist(this.movie);
    }
  }

  isInWatchlist(): boolean {
    return this.watchlistService.isInWatchlist(this.movie.id);
  }
}
