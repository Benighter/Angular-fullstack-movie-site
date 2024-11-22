import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularMoviesComponent } from './popular-movies.component';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';

describe('PopularMoviesComponent', () => {
  let component: PopularMoviesComponent;
  let fixture: ComponentFixture<PopularMoviesComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getPopularMovies']);
    spy.getPopularMovies.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [PopularMoviesComponent],
      providers: [{ provide: MovieService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(PopularMoviesComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load popular movies on init', () => {
    expect(movieService.getPopularMovies).toHaveBeenCalledWith(1);
  });
});