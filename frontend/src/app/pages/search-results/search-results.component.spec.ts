import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SearchResultsComponent } from './search-results.component';
import { MovieService } from '../../services/movie.service';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['searchMovies']);
    spy.searchMovies.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [SearchResultsComponent],
      providers: [
        { provide: MovieService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ query: 'test' }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search movies when query param changes', () => {
    expect(movieService.searchMovies).toHaveBeenCalledWith('test');
  });
});