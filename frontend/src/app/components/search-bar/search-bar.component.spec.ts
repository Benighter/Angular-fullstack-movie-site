import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchBarComponent } from './search-bar.component';
import { MovieService } from '../../services/movie.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let router: jasmine.SpyObj<Router>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['searchMovies']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, SearchBarComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: MovieService, useValue: movieServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to search results when search is performed', () => {
    component.searchQuery = 'test movie';
    component.search();
    expect(router.navigate).toHaveBeenCalledWith(
      ['/search'],
      { queryParams: { query: 'test movie' } }
    );
  });

  it('should not navigate if search query is empty', () => {
    component.searchQuery = '   ';
    component.search();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});