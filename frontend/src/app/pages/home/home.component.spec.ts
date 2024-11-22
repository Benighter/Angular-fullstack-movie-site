import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getPopularMovies']);
    spy.getPopularMovies.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: MovieService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    expect(movieService.getPopularMovies).toHaveBeenCalledWith(1);
  });

  it('should load more movies when loadMore is called', () => {
    component.loadMore();
    expect(movieService.getPopularMovies).toHaveBeenCalledWith(2);
  });
});