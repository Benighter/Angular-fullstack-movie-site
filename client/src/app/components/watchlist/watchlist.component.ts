import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { WatchlistService } from '../../services/watchlist.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
    selector: 'app-watchlist',
    standalone: true,
    imports: [CommonModule, RouterModule, MovieCardComponent, NavigationComponent],
    templateUrl: './watchlist.component.html',
    styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlistMovies: Movie[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.watchlistService.getWatchlist().subscribe(movies => {
      this.watchlistMovies = movies;
    });
  }
}
