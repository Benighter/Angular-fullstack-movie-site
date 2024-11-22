import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpcomingMoviesComponent } from './upcoming-movies.component';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';

describe('UpcomingMoviesComponent', () => {
  let component: UpcomingMoviesComponent;
  let fixture: ComponentFixture<UpcomingMoviesComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getUpcomingMovies']);
    spy.getUpcomingMovies.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [UpcomingMoviesComponent],
      providers: [{ provide: MovieService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingMoviesComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load upcoming movies on init', () => {
    expect(movieService.getUpcomingMovies).toHaveBeenCalledWith(1);
  });
});