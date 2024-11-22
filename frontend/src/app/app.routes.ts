import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { PopularMoviesComponent } from './pages/popular-movies/popular-movies.component';
import { UpcomingMoviesComponent } from './pages/upcoming-movies/upcoming-movies.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'popular', component: PopularMoviesComponent },
  { path: 'upcoming', component: UpcomingMoviesComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: '**', redirectTo: '' }
];
