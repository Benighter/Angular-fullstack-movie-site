import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { PopularMoviesComponent } from './pages/popular-movies/popular-movies.component';
import { UpcomingMoviesComponent } from './pages/upcoming-movies/upcoming-movies.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movies', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'popular', component: PopularMoviesComponent },
  { path: 'upcoming', component: UpcomingMoviesComponent },
  { path: 'search', component: SearchResultsComponent },
  // Default route
  // { path: 'dashboard', component: DashboardComponent }, // Protected route
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
