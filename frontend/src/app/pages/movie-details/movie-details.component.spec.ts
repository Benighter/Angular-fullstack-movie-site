import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MovieDetailsComponent } from './movie-details.component';
import { MovieService } from '../../services/movie.service';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getMovieDetails', 'getImageUrl']);
    spy.getMovieDetails.and.returnValue(of({
      id: 1,
      title: 'Test Movie',
      overview: 'Test Overview',
      release_date: '2023-01-01',
      poster_path: '/test.jpg',
      backdrop_path: '/test-backdrop.jpg',
      vote_average: 8.5,
      runtime: 120,
      genres: [{ id: 1, name: 'Action' }],
      credits: { cast: [] }
    }));
    spy.getImageUrl.and.returnValue('test-url');

    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        { provide: MovieService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movie details on init', () => {
    expect(movieService.getMovieDetails).toHaveBeenCalledWith(1);
  });
});