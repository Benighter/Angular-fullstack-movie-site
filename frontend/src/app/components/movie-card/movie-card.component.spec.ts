import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieCardComponent } from './movie-card.component';
import { MovieService } from '../../services/movie.service';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getImageUrl']);
    spy.getImageUrl.and.returnValue('test-url');

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MovieCardComponent],
      providers: [{ provide: MovieService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;

    component.movie = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test Overview',
      release_date: '2023-01-01',
      poster_path: '/test.jpg',
      vote_average: 8.5,
      genre_ids: [1, 2],
      backdrop_path: '/test-backdrop.jpg'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Test Movie');
  });

  it('should display movie rating', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.rating')?.textContent).toContain('8.5');
  });
});